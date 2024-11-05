'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { PacmanAnimation } from './components/PacmanAnimation'
import { PixelTransition } from './components/PixelTransition'
import { LandingPage } from './components/LandingPage'

export default function Home() {
  const [gameState, setGameState] = useState<'playing' | 'fading' | 'transition' | 'landingPage'>('playing')

  useEffect(() => {
    console.log('Current game state:', gameState);
  }, [gameState]);

  const handleGameOver = useCallback(() => {
    console.log('Game over, starting fade out');
    setGameState('fading');
  }, []);

  const handleFadeComplete = () => {
    console.log('Fade complete, starting pixel transition');
    setGameState('transition');
  };

  const handleTransitionComplete = () => {
    console.log('Transition complete, switching to landing page');
    setGameState('landingPage')
  }

  return (
    <div className="relative min-h-screen bg-black text-[#ACFF00] overflow-hidden">
      <AnimatePresence mode="sync">
        {(gameState === 'playing' || gameState === 'fading') && (
          <motion.div
            key="game"
            initial={{ opacity: 1 }}
            animate={{ opacity: gameState === 'fading' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            onAnimationComplete={() => {
              if (gameState === 'fading') {
                handleFadeComplete();
              }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PacmanAnimation onGameOver={handleGameOver} />
          </motion.div>
        )}
        <PixelTransition 
          isActive={gameState === 'transition'} 
          onComplete={handleTransitionComplete} 
        />
        {gameState === 'landingPage' && (
          <motion.div
            key="landingPage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LandingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}