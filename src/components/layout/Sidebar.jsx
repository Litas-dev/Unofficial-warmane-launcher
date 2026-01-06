import React from 'react';
import { Home, Layers, Plus, Puzzle, Settings, Info, AlertTriangle, Music, Download, Globe } from 'lucide-react';
import { games } from '../../config/games';
import azerothLogo from '../../assets/logo-new-white.png';
import styles from './Sidebar.module.css';

const Sidebar = ({
    activeView,
    setActiveView,
    activeGameId,
    setActiveGameId,
    visibleGameIds,
    onManageClients,
    onOpenAddons,
    integrityStatus,
    isMusicPlaying,
    onToggleMusic,
    appVersion,
    updateInfo,
    customGameNames = {},
    onRenameGame
}) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                <div className={styles.sidebarLogoGlow}>
                    <img src={azerothLogo} alt="WoW Launcher" />
                </div>
            </div>

            <div className={styles.navMenu}>
                <div className={styles.navLabel}>MENU</div>
                <button 
                    className={`${styles.navItem} ${activeView === 'dashboard' ? styles.active : ''}`}
                    onClick={() => setActiveView('dashboard')}
                >
                    <Home size={18} /> Dashboard
                </button>
                
                <div className={styles.navLabel}>CLIENTS</div>
                {games.filter(g => visibleGameIds.includes(g.id)).map(game => (
                    <div 
                        key={game.id}
                        className={`${styles.navItem} ${activeView === 'game' && activeGameId === game.id ? styles.active : ''}`}
                        onClick={() => {
                            setActiveGameId(game.id);
                            setActiveView('game');
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <Layers size={18} /> 
                        <span className={styles.gameName}>
                            {customGameNames[game.id] || game.menuLabel || game.version || game.shortName}
                        </span>
                        <button 
                            className={styles.renameBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                onRenameGame(game.id, customGameNames[game.id] || game.menuLabel || game.version || game.shortName);
                            }}
                            title="Rename"
                        >
                            <Settings size={14} />
                        </button>
                    </div>
                ))}
                
                <button 
                    className={`${styles.navItem} ${styles.manageGamesBtn}`}
                    onClick={onManageClients}
                >
                    <Plus size={14} /> Manage Clients
                </button>

                <div className={styles.navLabel}>TOOLS</div>
                <button 
                    className={`${styles.navItem} ${activeView === 'addons' ? styles.active : ''}`}
                    onClick={onOpenAddons}
                >
                    <Puzzle size={18} /> Addons
                </button>
                <button 
                    className={`${styles.navItem} ${activeView === 'settings' ? styles.active : ''}`}
                    onClick={() => setActiveView('settings')}
                >
                    <Settings size={18} /> Settings
                </button>
                <button 
                    className={`${styles.navItem} ${activeView === 'about' ? styles.active : ''}`}
                    onClick={() => setActiveView('about')}
                >
                    <Info size={18} /> About
                    {integrityStatus === 'danger' && <AlertTriangle size={14} color="#ef4444" className={styles.dangerIcon} />}
                </button>
            </div>

            <div className={styles.sidebarFooter}>
                <button 
                    className={`${styles.musicToggle} ${isMusicPlaying ? styles.musicPlaying : ''}`} 
                    onClick={onToggleMusic} 
                    title="Toggle Music"
                >
                    <Music size={16} />
                </button>

                <a 
                    href="#" 
                    className={styles.websiteLink} 
                    onClick={(e) => {
                        e.preventDefault();
                        const { shell } = window.require('electron');
                        shell.openExternal('https://relictum.org/');
                    }}
                    title="Visit Website"
                >
                    <Globe size={16} />
                </a>

                <div className={styles.versionInfo}>
                    <span className={styles.versionText}>v{appVersion}</span>
                    {updateInfo && updateInfo.updateAvailable && (
                        <a href={updateInfo.url} target="_blank" rel="noreferrer" className={styles.updateBadge} title="Update Available">
                            <Download size={12} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
