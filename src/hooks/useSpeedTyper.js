import { useState, useRef, useEffect } from 'react'

export default function useSpeedTyper (duration = 10) {
  const TIME_REMAINING = duration
  const [wordCount, setWordCount] = useState(0)
  const [gameIsRunning, setGameisRunning] = useState(false)
  const [textAreaContent, setTextAreaContent] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING)
  const textAreaRef = useRef(null)

  const countWords = (str) => {
    const count = str ? str.match(/(\w+)/g).length : 0
    setWordCount(count)
  }

  const startGame = () => {
    setTimeRemaining(TIME_REMAINING)
    setTextAreaContent('')
    setWordCount(0)
    setGameisRunning(true)
    console.log('textAreaRef', textAreaRef)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  const endGame = () => {
    setGameisRunning(false)
    countWords(textAreaContent)
  }

  useEffect(() => {
    if (timeRemaining > 0 && gameIsRunning) {
      const timerId = setTimeout(() => {
        const newTimeRemaining = timeRemaining - 1
        setTimeRemaining(newTimeRemaining)
      }, 1000)
      return () => {
        clearTimeout(timerId)
      }
    } else if (timeRemaining === 0){
      endGame()
    }
  }, [timeRemaining, gameIsRunning])

  return { textAreaRef, gameIsRunning, textAreaContent, setTextAreaContent, timeRemaining, startGame, wordCount}
}