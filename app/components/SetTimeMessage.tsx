'use client'
import { useEffect, useState } from 'react'

interface Props {
  message: string;
}

const textStyle: React.CSSProperties = {
  fontSize: '1rem',
  textAlign: 'center',
  color: '#00b300',
  marginTop: '10px',
}

const TimeoutMessage: React.FC<Props> = ({ message }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {visible && (
        <p style={textStyle}>
          {message}
        </p>
      )}
    </>
  )
}

export default TimeoutMessage
