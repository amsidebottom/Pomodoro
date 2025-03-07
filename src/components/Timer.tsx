import { useEffect } from 'react';
import styles from './Timer.module.css';

type TimerProps = {
  currentTime: number;
  isRunning: boolean;
  onTimerComplete: () => void;
  onTick: (newTimeLeft: number) => void;
};

export const Timer = ({ 
  currentTime,
  isRunning, 
  onTimerComplete,
  onTick 
}: TimerProps) => {
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        const newTime = currentTime - 1;
        onTick(newTime);
        
        if (newTime <= 0) {
          clearInterval(interval);
          onTimerComplete();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentTime, onTimerComplete, onTick]);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  return (
    <div className={styles.timer}>
      <span className={styles.time}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}; 