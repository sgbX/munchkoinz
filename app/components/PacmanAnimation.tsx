'use client'

import { useState, useEffect } from 'react'
import { CryptoToken } from './CryptoToken'
import { Ghost } from './Ghost'

type PacmanAnimationProps = {
  onGameOver: () => void
}

export const PacmanAnimation = ({ onGameOver }: PacmanAnimationProps) => {
  const [pacmanPosition, setPacmanPosition] = useState(0)
  const [redGhostPosition, setRedGhostPosition] = useState(-20)
  const [blueGhostPosition, setBlueGhostPosition] = useState(-40)
  const [yellowGhostPosition, setYellowGhostPosition] = useState(-60)
  const [tokens, setTokens] = useState([
    { type: 'bitcoin', position: 25 },
    { type: 'eth', position: 50 },
    { type: 'bnb', position: 75 },
    { type: 'sol', position: 100 },
  ])
  const [mouthOpen, setMouthOpen] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const mouthInterval = setInterval(() => {
      setMouthOpen(prev => !prev)
    }, 200)

    return () => clearInterval(mouthInterval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPacmanPosition((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGameOver(true);
          return 100;
        }
        return prev + 1;
      });
    
      setRedGhostPosition(prev => {
        const targetPos = Math.max(pacmanPosition - 20, -20);
        return prev + (targetPos - prev) * 0.2;
      });

      setBlueGhostPosition(prev => {
        const targetPos = Math.max(pacmanPosition - 40, -40);
        return prev + (targetPos - prev) * 0.1;
      });

      setYellowGhostPosition(prev => {
        const targetPos = Math.max(pacmanPosition - 60, -60);
        return prev + (targetPos - prev) * 0.15;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [pacmanPosition]);

  useEffect(() => {
    if (isGameOver) {
      onGameOver()
    }
  }, [isGameOver, onGameOver])

  useEffect(() => {
    setTokens((prevTokens) => 
      prevTokens.filter((token) => token.position > pacmanPosition)
    )
  }, [pacmanPosition])

  return (
    <div className="w-full h-48 relative overflow-hidden bg-black">
      <div className="absolute bottom-0 left-0 w-full h-4 bg-[#ACFF00]" />
      <div className="absolute bottom-4 left-0 w-full h-1 bg-[#88CC00]" />
      
      {tokens.map((token, index) => (
        <div
          key={index}
          className="absolute bottom-8"
          style={{ left: `${token.position}%` }}
        >
          <CryptoToken type={token.type} />
        </div>
      ))}

      <Ghost color="#FF0000" position={redGhostPosition} />
      <Ghost color="#00FFFF" position={blueGhostPosition} />
      <Ghost color="#FFFF00" position={yellowGhostPosition} />

      <div
        className="absolute bottom-8 w-8 h-8"
        style={{ left: `${pacmanPosition}%` }}
      >
        <div
          className="w-full h-full bg-[#ACFF00] rounded-full"
          style={{
            clipPath: mouthOpen 
              ? 'polygon(100% 50%, 50% 50%, 50% 0, 0 0, 0 100%, 50% 100%, 50% 50%)' 
              : 'circle(50% at 50% 50%)'
          }}
        />
      </div>
    </div>
  )
}