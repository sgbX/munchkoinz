'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"

type PixelTransitionProps = {
  isActive: boolean
  onComplete: () => void
}

export const PixelTransition = ({ isActive, onComplete }: PixelTransitionProps) => {
  const [shuffledIndexes, setShuffledIndexes] = useState<number[][]>([])

  useEffect(() => {
    const { innerWidth, innerHeight } = window
    const blockSize = innerWidth * 0.05
    const nbOfBlocks = Math.ceil(innerHeight / blockSize)
    const columns = 20

    const shuffle = (a: number[]) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }

    const newShuffledIndexes = [...Array(columns)].map(() => 
      shuffle([...Array(nbOfBlocks)].map((_, i) => i))
    )

    setShuffledIndexes(newShuffledIndexes)
  }, [])

  const anim = {
    initial: { opacity: 0 },
    open: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.04 * delay }
    }),
    closed: (delay: number) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.04 * delay }
    })
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {shuffledIndexes.map((column, columnIndex) => (
        <div key={columnIndex} className="absolute top-0 bottom-0" style={{ left:  `${columnIndex * 5}%`, width: '5%' }}>
          {column.map((randomIndex, index) => (
            <motion.div
              key={index}
              className="absolute w-full"
              style={{ 
                height: `${100 / column.length}%`,
                top: `${(index * 100) / column.length}%`,
                backgroundColor: '#ACFF00'
              }}
              variants={anim}
              initial="initial"
              animate={isActive ? "open" : "closed"}
              custom={columnIndex + randomIndex}
              onAnimationComplete={() => {
                if (columnIndex === shuffledIndexes.length - 1 && index === column.length - 1 && isActive) {
                  onComplete()
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}