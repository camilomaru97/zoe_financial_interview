
interface Props {
  message: string
}

const LoadingSpinner = ({ message }: Props) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }

  const textStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    color: '#333',
    marginTop: '10px',
  }

  return (
    <div style={containerStyle}>
      <p style={textStyle}>{message}</p>
    </div>
  )
}

export default LoadingSpinner