import React from 'react';
import { Shield, ExternalLink, Users, Edit, Globe, Puzzle, Trash2, Palette, Music, RefreshCw, CheckCircle } from 'lucide-react';
import styles from './About.module.css';

const About = ({ appVersion, integrityStatus, integrityHash }) => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.aboutView}>
      <div className={styles.header}>
        <h2>Relictum Launcher <span className={styles.versionTag}>v{appVersion || '3.0.1'}</span></h2>
      </div>

      <div className={`${styles.securityCard} ${styles[integrityStatus] || styles.secure}`}>
        <div className={styles.securityHeader}>
          <Shield size={40} className={styles.shieldIcon} />
          <div className={styles.securityInfo}>
            <h3 className={styles.securityTitle}>
              {integrityStatus === 'secure' ? 'Secure & Verified' : 
               integrityStatus === 'warning' ? 'Security Warning' : 
               'Security Risk'}
            </h3>
            <span className={styles.securitySubtitle}>
              {integrityStatus === 'secure' ? 'Protected by Developer' : 
               integrityStatus === 'warning' ? 'Hash Mismatch Detected' : 
               'Integrity Compromised'}
            </span>
          </div>
        </div>
        
        <div className={styles.hashSection}>
          <label className={styles.hashLabel}>Local Hash:</label>
          <code className={styles.hashCode}>
            {integrityHash || 'e7c9b5a628a7007f5a9635cc83f593461757dcff7580fa0dbd67a5f02e9ea6be'}
          </code>
        </div>
        
        <button className={styles.verifyLink} onClick={() => openLink('https://github.com/Litas-dev/Relictum-Launcher')}>
          <ExternalLink size={12} style={{marginRight: '5px'}}/> Verify Official Hash on GitHub
        </button>
      </div>

      <div className={styles.clientList}>
        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Users size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Manage Clients</h4>
            <span>Show or hide expansions in the sidebar.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Edit size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Rename Clients</h4>
            <span>Give each client a custom display name.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Globe size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Realmlist Editor</h4>
            <span>Edit and save server addresses with quick history.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Puzzle size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Addons Manager</h4>
            <span>Browse and install curated addons per expansion.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Trash2 size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Cache Cleanup</h4>
            <span>Clear cache safely to fix UI glitches and lag.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Palette size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Theme Selector</h4>
            <span>Switch visual themes with one click.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><Music size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Ambient Music</h4>
            <span>Play or pause background themes while browsing.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><CheckCircle size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Integrity Check</h4>
            <span>Verify build hashes to detect tampering.</span>
          </div>
        </div>

        <div className={styles.clientItem}>
          <div className={styles.clientIconWrapper}><RefreshCw size={24} color="#fbbf24" /></div>
          <div className={styles.clientInfo}>
            <h4>Update Awareness</h4>
            <span>Detect launcher updates and version status.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
