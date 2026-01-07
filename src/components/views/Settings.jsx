import React, { useState } from 'react';
import { Trash2, ChevronDown, FolderOpen, X, Globe } from 'lucide-react';
import styles from './Settings.module.css';
import { themes } from '../../config/themes';

/**
 * Settings Component
 * Manages application preferences including launcher behavior, 
 * theming, and installation paths.
 */
const Settings = ({
  activeGame,
  autoCloseLauncher,
  toggleAutoClose,
  playMusicOnStartup,
  togglePlayMusicOnStartup,
  clearCacheOnLaunch,
  toggleClearCache,
  handleCleanCacheNow,
  currentTheme,
  setCurrentTheme,
  enableNotifications,
  toggleNotifications,
  enableSoundEffects,
  toggleSoundEffects,
  enableGlowEffects,
  toggleGlowEffects,
  defaultDownloadPath,
  handleSetDefaultPath,
  handleClearDefaultPath
}) => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  return (
    <div className={styles.settingsView}>
      <h2>Settings</h2>
      
      <div className={styles.settingsSection}>
        <h3>General</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Language</span>
            <span className={styles.toggleDesc}>Select application language (Work in Progress).</span>
          </div>
          <button 
            className={styles.cleanCacheBtn} 
            style={{ opacity: 0.5, cursor: 'not-allowed', width: 'auto', minWidth: '100px', justifyContent: 'center' }}
            title="Coming Soon"
          >
            <Globe size={14} /> English
          </button>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3>Launcher Behavior</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Auto-close Launcher</span>
            <span className={styles.toggleDesc}>Automatically close the launcher 2 seconds after launching the game.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={autoCloseLauncher}
              onChange={toggleAutoClose}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Play Music on Startup</span>
            <span className={styles.toggleDesc}>Automatically play theme music when the launcher starts.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={playMusicOnStartup}
              onChange={togglePlayMusicOnStartup}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
           <div className={styles.toggleLabel}>
               <span className={styles.toggleTitle}>Clear Cache on Launch</span>
               <span className={styles.toggleDesc}>Delete WDB folder before starting game (Fixes common item/creature bugs).</span>
           </div>
           <div className={styles.cacheControlRow}>
               <button 
                   className={styles.cleanCacheBtn} 
                   onClick={handleCleanCacheNow}
                   title={`Clear cache for ${activeGame ? activeGame.shortName : 'Game'}`}
                   disabled={!activeGame}
               >
                   <Trash2 size={14} /> Clean Now
               </button>
               <label className={styles.toggleSwitch}>
                   <input 
                       type="checkbox" 
                       checked={clearCacheOnLaunch}
                       onChange={toggleClearCache}
                   />
                   <span className={styles.slider}></span>
               </label>
           </div>
         </div>
      </div>

      <div className={styles.settingsSection}>
        <h3>Installation Paths</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Default Download Location</span>
            <span className={styles.toggleDesc}>Where new game clients will be downloaded.</span>
          </div>
          <div className={styles.pathControl}>
            <div className={styles.pathDisplay} title={defaultDownloadPath || "No default path set"}>
              {defaultDownloadPath || "No default path set"}
            </div>
            <div className={styles.pathButtons}>
              <button 
                className={styles.iconBtn}
                onClick={handleSetDefaultPath}
                title="Change Download Path"
              >
                <FolderOpen size={16} />
              </button>
              {defaultDownloadPath && (
                <button 
                  className={styles.iconBtn}
                  onClick={handleClearDefaultPath}
                  title="Clear Default Path"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3>Appearance</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Glow Effects</span>
            <span className={styles.toggleDesc}>Enable or disable the glow animation behind game icons.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={enableGlowEffects}
              onChange={toggleGlowEffects}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>App Theme</span>
            <span className={styles.toggleDesc}>Select the visual theme for the launcher.</span>
          </div>
          <div className={styles.themeSelectorContainer}>
            <div 
              className={styles.themeSelectorTrigger}
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            >
              <div className={styles.themeSelectorLabel}>
                <span className={styles.themeColorPreview} style={{background: themes[currentTheme]?.colors['--primary-gold']}}></span>
                {themes[currentTheme]?.name}
              </div>
              <ChevronDown size={16} style={{transform: isThemeDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}} />
            </div>
            
            {isThemeDropdownOpen && (
              <div className={styles.themeSelectorDropdown}>
                {Object.values(themes).map(theme => (
                  <div 
                    key={theme.id} 
                    className={`${styles.themeOption} ${currentTheme === theme.id ? styles.selected : ''}`}
                    onClick={() => {
                      setCurrentTheme(theme.id);
                      setIsThemeDropdownOpen(false);
                    }}
                  >
                    <span className={styles.themeColorPreview} style={{background: theme.colors['--primary-gold']}}></span>
                    {theme.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3>Notifications & Sound</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Desktop Notifications</span>
            <span className={styles.toggleDesc}>Show a Windows notification when downloads complete.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={enableNotifications}
              onChange={toggleNotifications}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Sound Effects</span>
            <span className={styles.toggleDesc}>Play a sound when a download finishes.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={enableSoundEffects}
              onChange={toggleSoundEffects}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>


    </div>
  );
};

export default Settings;
