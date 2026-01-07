import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styles from './Dashboard.module.css';
import { games } from '../../config/games';
import ipcRenderer from '../../utils/ipc';
import { Users } from 'lucide-react';
import titleImage from '../../assets/logo-new-white.png';
import discordIcon from '../../assets/discord.png';

const Dashboard = ({ games, onGameSelect, settings }) => {
  const { t } = useTranslation();
  const enableGlows = settings?.enableGlowEffects !== false; // Default to true if undefined
  const glowClass = enableGlows ? '' : styles.disableGlow;

  // Helper: Retrieve game icon from configuration
  const getGameIcon = (id) => {
    const game = games.find(g => g.id === id);
    return game ? game.clientIcon : null;
  };

  const handleJoinCommunity = () => {
    ipcRenderer.send('open-external', 'https://discord.gg/ttnHHMnru2');
  };

  const classicIcon = getGameIcon('classic');
  const tbcIcon = getGameIcon('tbc');
  const wotlkIcon = getGameIcon('wotlk');

  return (
    <div className={styles.dashboardView}>
      <div className={styles.heroSection}>
        <img src={titleImage} alt="Relictum Logo" className={styles.titleImage} />
        <p className={styles.heroDescription}>
          <Trans i18nKey="dashboard.hero_description">
            A modern, secure launcher built for gaming. <br/>
            Manage multiple expansions, addons, and settings in one unified hub.
          </Trans>
        </p>

        <div 
          className={`${styles.discordIconContainer} ${glowClass}`} 
          onClick={handleJoinCommunity}
          title={t('dashboard.join_community')}
        >
          <div className={styles.iconGlow} style={{ width: '100px', height: '100px' }}>
            <img 
              src={discordIcon} 
              alt="Join Discord" 
              className={styles.gameIcon} 
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className={styles.supportedGamesPreview}>
          <div 
            className={`${styles.gameIconCard} ${glowClass}`} 
            onClick={() => onGameSelect && onGameSelect('classic')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconGlow} ${styles.iconGlowClassic}`}>
              <img 
                src={classicIcon} 
                alt="Classic" 
                className={`${styles.gameIcon} ${styles.gameIconClassic}`} 
              />
            </div>
            <span className={`${styles.versionLabel} ${styles.versionLabelClassic}`}>1.12</span>
          </div>

          <div 
            className={`${styles.gameIconCard} ${glowClass}`}
            onClick={() => onGameSelect && onGameSelect('tbc')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconGlow} ${styles.iconGlowTbc}`}>
              <img 
                src={tbcIcon} 
                alt="TBC" 
                className={`${styles.gameIcon} ${styles.gameIconTbc}`} 
              />
            </div>
            <span className={`${styles.versionLabel} ${styles.versionLabelTbc}`}>2.4.3</span>
          </div>

          <div 
            className={`${styles.gameIconCard} ${glowClass}`}
            onClick={() => onGameSelect && onGameSelect('wotlk')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconGlow} ${styles.iconGlowWotlk}`}>
              <img 
                src={wotlkIcon} 
                alt="WotLK" 
                className={`${styles.gameIcon} ${styles.gameIconWotlk}`} 
              />
            </div>
            <span className={`${styles.versionLabel} ${styles.versionLabelWotlk}`}>3.3.5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
