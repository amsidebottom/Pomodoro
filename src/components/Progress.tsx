import styles from './Progress.module.css';

type ProgressProps = {
  currentSession: number;
  totalSessions: number;
  timerType: 'work' | 'shortBreak' | 'longBreak';
};

export const Progress = ({ currentSession, totalSessions, timerType }: ProgressProps) => {
  const getTimerLabel = () => {
    switch (timerType) {
      case 'work':
        return 'Work Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return '';
    }
  };

  return (
    <div className={styles.progress}>
      <div className={styles.session}>
        Session {currentSession} of {totalSessions}
      </div>
      <div className={styles.type}>{getTimerLabel()}</div>
    </div>
  );
}; 