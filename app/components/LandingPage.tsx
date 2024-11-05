'use client'

import { useEffect, useState, useRef } from 'react'
import Link from "next/link"
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUp, ChevronUp, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const GlitchText = ({ children }: { children: string }) => {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="relative inline-block glitch-container">
      <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter mb-4 text-[#ACFF00] glitch-base">
        {children}
      </h1>
      {glitch && (
        <>
          <h1 className="absolute top-0 left-0 text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter mb-4 text-[#FF00FF] glitch glitch-1" aria-hidden="true">
            {children}
          </h1>
          <h1 className="absolute top-0 left-0 text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter mb-4 text-[#00FFFF] glitch glitch-2" aria-hidden="true">
            {children}
          </h1>
          <h1 className="absolute top-0 left-0 text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter mb-4 text-[#FFFFFF] glitch glitch-3" aria-hidden="true">
            {children}
          </h1>
        </>
      )}
    </div>
  )
}

const TradingViewChart = () => (
  <div className="w-full h-full bg-black p-4">
    <div className="w-full h-full border border-[#ACFF00] rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#ACFF00]">BTC/USD Live Chart</h2>
      <div className="w-full h-[calc(100vh-200px)]">
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76d87&symbol=BINANCE%3ABTCUSDT&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&hideideas=1&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=BINANCE%3ABTCUSDT"
          style={{width: '100%', height: '100%'}}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
)

export const LandingPage = () => {
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showTrading, setShowTrading] = useState(false)
  const tradingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasAnimated) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2 }
      }))
      setHasAnimated(true)
    }

    const handleScroll = () => {
      if (tradingRef.current) {
        const rect = tradingRef.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.75) {
          setShowTrading(true)
        } else {
          setShowTrading(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [controls, hasAnimated])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative bg-black text-[#ACFF00]">
      {/* Corner Arrows */}
      <div className="fixed top-4 left-4 text-[#ACFF00]">
        <ArrowDown className="w-6 h-6" />
      </div>
      <div className="fixed top-4 right-4 text-[#ACFF00]">
        <ArrowDown className="w-6 h-6" />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={0}
        >
          <GlitchText>CRYPTOGOONS™</GlitchText>
          <motion.p
            className="text-xl md:text-2xl mt-4 mb-4 text-[#ACFF00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Built by Grishma Singh
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-[#ACFF00] text-black hover:bg-[#8BFF00] hover:text-black transition-colors duration-200"
              asChild
            >
              <Link href="https://github.com/sgbX" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Source Code
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {!showTrading && (
            <motion.div 
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm tracking-wider uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="#" className="hover:text-white transition-colors duration-200 uppercase text-sm">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200 uppercase text-sm">Discord</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200 uppercase text-sm">Facebook</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200 uppercase text-sm">Medium</Link>
        </motion.div>
      </div>

      <div ref={tradingRef} className="min-h-screen flex items-center justify-center relative">
        <AnimatePresence>
          {showTrading && (
            <motion.div
              key="trading"
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <TradingViewChart />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showTrading && (
            <motion.button
              className="absolute top-4 right-4 bg-[#ACFF00] text-black p-2 rounded-full hover:bg-white transition-colors duration-200"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Corner Arrows */}
      <div className="fixed bottom-4 left-4 text-[#ACFF00]">
        <ArrowUp className="w-6 h-6" />
      </div>
      <div className="fixed bottom-4 right-4 text-[#ACFF00]">
        <ArrowUp className="w-6 h-6" />
      </div>
    </div>
  )
}