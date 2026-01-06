const fs = require('fs');
const path = require('path');
const https = require('https');
const { pipeline } = require('stream');
const { promisify } = require('util');

const streamPipeline = promisify(pipeline);
// Adjusted paths for being in .github/scripts/
const ADDONS_FILE = path.join(__dirname, '../../src/assets/addons.json');
const DOWNLOAD_DIR = path.join(__dirname, '../../temp_addons_scan');

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const makeRequest = (currentUrl) => {
            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            };
            
            https.get(currentUrl, options, (response) => {
                // Handle redirects
                if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                    if (response.headers.location) {
                        makeRequest(response.headers.location);
                        return;
                    }
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download ${currentUrl}: ${response.statusCode}`));
                    return;
                }
                
                const file = fs.createWriteStream(dest);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(dest, () => {});
                reject(err);
            });
        };

        makeRequest(url);
    });
}

async function main() {
    if (!fs.existsSync(ADDONS_FILE)) {
        console.error('addons.json not found!');
        process.exit(1);
    }

    if (!fs.existsSync(DOWNLOAD_DIR)) {
        fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
    }

    const addons = JSON.parse(fs.readFileSync(ADDONS_FILE, 'utf8'));
    console.log(`Found ${addons.length} addons in database.`);

    let downloadCount = 0;
    let errorCount = 0;

    // Limit concurrency to avoid timeouts or rate limits
    const BATCH_SIZE = 10; 
    
    // Collect all URLs first
    const tasks = [];
    for (const addon of addons) {
        if (!addon.downloads) continue;
        
        for (const [exp, url] of Object.entries(addon.downloads)) {
            if (url && url.endsWith('.zip')) {
                const fileName = `${addon.title.replace(/[^a-zA-Z0-9]/g, '_')}_${exp}.zip`;
                const destPath = path.join(DOWNLOAD_DIR, fileName);
                tasks.push({ url, destPath, name: addon.title });
            }
        }
    }

    console.log(`Found ${tasks.length} zip files to download.`);

    for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
        const batch = tasks.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (task) => {
            try {
                // console.log(`Downloading: ${task.name}...`);
                await downloadFile(task.url, task.destPath);
                process.stdout.write('.');
                downloadCount++;
            } catch (err) {
                console.error(`\nError downloading ${task.name}: ${err.message}`);
                errorCount++;
            }
        }));
    }

    console.log(`\nDownload complete.`);
}

main().catch(console.error);
