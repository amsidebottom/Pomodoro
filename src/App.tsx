import { useState, useCallback, useEffect } from 'react'
import { Timer } from './components/Timer'
import { Controls } from './components/Controls'
import styles from './App.module.css'
import './App.css'

const WORK_TIME = 25 * 60 // 25 minutes in seconds
const REST_TIME = 5 * 60 // 5 minutes in seconds

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'rest'>('work')
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)

  const getCurrentTime = useCallback(() => {
    return mode === 'work' ? WORK_TIME : REST_TIME
  }, [mode])

  // Update title when timer changes
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    document.title = isRunning ? `${timeString} - Pomodoro` : 'Pomodoro Timer'

    return () => {
      document.title = 'Pomodoro Timer'
    }
  }, [timeLeft, isRunning])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(getCurrentTime())
  }

  const handleSkip = () => {
    setIsRunning(false)
    handleTimerComplete()
  }

  const handleModeToggle = () => {
    setIsRunning(false)
    setMode(prevMode => {
      const newMode = prevMode === 'work' ? 'rest' : 'work'
      setTimeLeft(newMode === 'work' ? WORK_TIME : REST_TIME)
      return newMode
    })
  }

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false)
  }, [])

  const handleTimerTick = useCallback((newTimeLeft: number) => {
    setTimeLeft(newTimeLeft)
  }, [])

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <div className={styles.modeIndicator}>
        Current Mode: {mode === 'work' ? 'Work (25min)' : 'Rest (5min)'}
      </div>
      <Timer
        initialTime={getCurrentTime()}
        currentTime={timeLeft}
        isRunning={isRunning}
        onTimerComplete={handleTimerComplete}
        onTick={handleTimerTick}
      />
      <Controls
        isRunning={isRunning}
        mode={mode}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
        onModeToggle={handleModeToggle}
      />
    </div>
  )
}

export default App
