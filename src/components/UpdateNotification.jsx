import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, X, Check, AlertTriangle } from 'lucide-react';
import ipcRenderer from '../utils/ipc';
import './UpdateNotification.css'; // We'll create this CSS

const UpdateNotification = () => {
  const [status, setStatus] = useState('idle'); // idle, checking, available, downloading, downloaded, error
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Soft notification sound using Web Audio API
  const playSoftNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  useEffect(() => {
    const handleMessage = (event, { text, type, data }) => {
      console.log('Updater:', type, text, data);
      
      switch (type) {
        case 'checking':
          // Optional: Show checking status if desired, or keep hidden
          // setStatus('checking');
          break;
        case 'available':
          setStatus('available');
          setUpdateInfo(data);
          setMessage(`New version ${data?.version} available!`);
          setIsVisible(true);
          playSoftNotificationSound();
          break;
        case 'not-available':
          setStatus('idle');
          setMessage('No updates found (Checked Mirror).');
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 5000);
          break;
        case 'progress':
          setStatus('downloading');
          setProgress(data?.percent || 0);
          setIsVisible(true);
          break;
        case 'downloaded':
          setStatus('downloaded');
          setMessage('Update downloaded. Ready to install.');
          setIsVisible(true);
          break;
        case 'error':
          setStatus('error');
          setMessage('Update error: ' + text);
          setIsVisible(true);
          break;
        default:
          break;
      }
    };

    ipcRenderer.on('updater-message', handleMessage);

    // Initial check result from App.jsx might be separate, 
    // but main.js also runs checkForUpdatesAndNotify on launch.

    return () => {
      ipcRenderer.removeListener('updater-message', handleMessage);
    };
  }, []);

  const handleDownload = () => {
    ipcRenderer.send('download-update');
    setStatus('downloading');
  };

  const handleInstall = () => {
    ipcRenderer.send('install-update');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible && status === 'idle') return null;

  return (
    <div className={`update-notification ${isVisible ? 'visible' : ''} ${status}`}>
      <div className="update-content">
        <div className="update-icon">
          {status === 'available' && <Download size={20} />}
          {status === 'downloading' && <RefreshCw size={20} className="spin" />}
          {status === 'downloaded' && <Check size={20} />}
          {status === 'error' && <AlertTriangle size={20} />}
        </div>
        
        <div className="update-info">
          <div className="update-message">{message}</div>
          {status === 'downloading' && (
            <div className="update-progress-bar">
              <div 
                className="update-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <div className="update-actions">
          {status === 'available' && (
            <button onClick={handleDownload} className="update-btn primary">
              Download
            </button>
          )}
          
          {status === 'downloaded' && (
            <button onClick={handleInstall} className="update-btn success">
              Restart
            </button>
          )}
          
          <button onClick={handleClose} className="update-close">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
