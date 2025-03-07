import styles from './Controls.module.css';

type ControlsProps = {
  isRunning: boolean;
  mode: 'work' | 'rest';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onModeToggle: () => void;
};

export const Controls = ({ 
  isRunning, 
  mode,
  onStart, 
  onPause, 
  onReset, 
  onSkip,
  onModeToggle 
}: ControlsProps) => {
  return (
    <div className={styles.controls}>
      {!isRunning ? (
        <button onClick={onStart} className={styles.button}>
          Start
        </button>
      ) : (
        <button onClick={onPause} className={styles.button}>
          Pause
        </button>
      )}
      <button onClick={onReset} className={styles.button}>
        Reset
      </button>
      <button onClick={onSkip} className={styles.button}>
        Skip
      </button>
      <button 
        onClick={onModeToggle} 
        className={`${styles.button} ${styles.modeButton}`}
      >
        {mode === 'work' ? 'Switch to Rest' : 'Switch to Work'}
      </button>
    </div>
  );
}; 