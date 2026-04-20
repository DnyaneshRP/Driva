import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/data'

// ─── Sparkle particle component ───────────────────────────────────────────────
const Sparkle = ({ x, y, size, delay, color }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      bottom: y,
      width: size,
      height: size,
      pointerEvents: 'none',
      zIndex: 10,
    }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 0.9, 0],
      rotate: [0, 45, 90, 135],
      y: [0, -18 - Math.random() * 20],
    }}
    transition={{
      duration: 1.4,
      delay,
      repeat: Infinity,
      repeatDelay: 1.8 + Math.random() * 1.2,
      ease: 'easeOut',
    }}
  >
    {/* 4-point star shape */}
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  </motion.div>
)

// ─── Floating dust/shimmer dot ─────────────────────────────────────────────────
const ShimmerDot = ({ x, y, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      bottom: y,
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(200,220,255,0.4) 100%)',
      pointerEvents: 'none',
      zIndex: 10,
    }}
    initial={{ opacity: 0, y: 0 }}
    animate={{
      opacity: [0, 0.9, 0.6, 0],
      y: [0, -25 - Math.random() * 20],
      x: [0, (Math.random() - 0.5) * 20],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 0.8 + Math.random() * 1.5,
      ease: 'easeOut',
    }}
  />
)

// ─── Ice/frost ring ────────────────────────────────────────────────────────────
const FrostRing = ({ cx, cy, size, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: cx - size / 2,
      bottom: cy - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      border: '1.5px solid rgba(200,230,255,0.55)',
      pointerEvents: 'none',
      zIndex: 9,
    }}
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{
      opacity: [0, 0.7, 0.4, 0],
      scale: [0.4, 1, 1.6, 2.2],
    }}
    transition={{
      duration: 2.2,
      delay,
      repeat: Infinity,
      repeatDelay: 1.4,
      ease: 'easeOut',
    }}
  />
)

// ─── Speed line ────────────────────────────────────────────────────────────────
const SpeedLines = ({ visible, direction }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {[28, 44, 58, 70].map((y, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              bottom: y,
              height: 1.5,
              background:
                direction === 'right'
                  ? 'linear-gradient(to left, transparent, rgba(255,255,255,0.35))'
                  : 'linear-gradient(to right, transparent, rgba(255,255,255,0.35))',
              borderRadius: 2,
              width: 55 + i * 10,
              ...(direction === 'right' ? { right: 0 } : { left: 0 }),
            }}
            animate={{ scaleX: [0.6, 1.1, 0.6] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
)

// ─── Main Banner ───────────────────────────────────────────────────────────────
const Banner = () => {
  const navigate = useNavigate()
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const [isLevitating, setIsLevitating] = useState(false)
  const [driving, setDriving] = useState(false)
  const [drivingDir, setDrivingDir] = useState('right')
  const [started, setStarted] = useState(false)

  // Sparkle positions for levitation phase (white/silver/ice-blue palette for white car)
  const sparkles = [
    { x: '12%', y: 80,  size: 14, delay: 0,    color: '#ffffff' },
    { x: '28%', y: 95,  size: 10, delay: 0.5,  color: '#c8e6ff' },
    { x: '45%', y: 70,  size: 16, delay: 0.9,  color: '#e8f4ff' },
    { x: '60%', y: 100, size: 10, delay: 1.3,  color: '#ffffff' },
    { x: '75%', y: 85,  size: 12, delay: 0.3,  color: '#b0d4ff' },
    { x: '20%', y: 120, size: 8,  delay: 1.6,  color: '#ddf0ff' },
    { x: '55%', y: 55,  size: 9,  delay: 0.7,  color: '#ffffff' },
    { x: '38%', y: 130, size: 11, delay: 2.0,  color: '#c0dcff' },
  ]

  const shimmerDots = [
    { x: '8%',  y: 60,  delay: 0.2  },
    { x: '22%', y: 75,  delay: 0.8  },
    { x: '40%', y: 50,  delay: 1.2  },
    { x: '58%', y: 80,  delay: 0.4  },
    { x: '70%', y: 65,  delay: 1.7  },
    { x: '82%', y: 90,  delay: 0.6  },
    { x: '15%', y: 110, delay: 2.1  },
    { x: '65%', y: 105, delay: 1.0  },
    { x: '48%', y: 95,  delay: 2.4  },
    { x: '33%', y: 60,  delay: 1.5  },
  ]

  const frostRings = [
    { cx: '18%', cy: 30, size: 60, delay: 0.1  },
    { cx: '50%', cy: 25, size: 80, delay: 0.9  },
    { cx: '78%', cy: 35, size: 50, delay: 1.8  },
    { cx: '35%', cy: 40, size: 70, delay: 2.5  },
  ]

  // Convert percentage-based cx to actual pixel reference for ring (handled by CSS left)
  // We'll pass them as inline styles instead

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          runSequence()
        }
      },
      { threshold: 0.4 } // fires when 40% of the banner is visible
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [started])

  const runSequence = async () => {
    // 1. Slide in from left
    setDriving(true)
    setDrivingDir('right')
    await controls.start({
      x: 0,
      scaleX: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    })

    // 2. Drive to right end
    await controls.start({
      x: 'calc(55vw - 340px)',
      transition: { duration: 1.7, ease: [0.4, 0, 0.2, 1] },
    })
    setDriving(false)

    // Small pause at right end
    await new Promise((r) => setTimeout(r, 200))

    // 3. Flip to face left
    await controls.start({
      scaleX: -1,
      transition: { duration: 0.35, ease: 'easeInOut' },
    })
    setDrivingDir('left')
    setDriving(true)

    // 4. Drive back left
    await controls.start({
      x: 0,
      transition: { duration: 1.7, ease: [0.4, 0, 0.2, 1] },
    })
    setDriving(false)

    // 5. Flip back to face right
    await controls.start({
      scaleX: 1,
      transition: { duration: 0.35, ease: 'easeInOut' },
    })

    await new Promise((r) => setTimeout(r, 200))

    // 6. Begin levitation
    setIsLevitating(true)
    controls.start({
      y: [0, -13, 0],
      transition: {
        duration: 2.4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    })
  }

  return (
    <section ref={sectionRef} className="max-padd-container py-10 pt-22">
      <div className="max-padd-container bg-solid rounded-3xl xl:max-h-72">
        <div className="flex flex-col md:flex-row">

          {/* ── Left: Car ── */}
          <div className="flex-5 relative lg:bottom-12 xl:bottom-20 overflow-hidden">

            {/* Speed lines */}
            <SpeedLines visible={driving} direction={drivingDir} />

            {/* Levitation effects — only shown when levitating */}
            <AnimatePresence>
              {isLevitating && (
                <>
                  {/* Soft white glow under car */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.3 }}
                    animate={{
                      opacity: [0.5, 0.85, 0.5],
                      scaleX: [0.85, 1.05, 0.85],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '5%',
                      width: '70%',
                      height: 22,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(ellipse, rgba(230,245,255,0.7) 0%, rgba(180,220,255,0.3) 50%, transparent 70%)',
                      filter: 'blur(5px)',
                      pointerEvents: 'none',
                      zIndex: 8,
                    }}
                  />

                  {/* Silver shimmer ground reflection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.55, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '3%',
                      width: '72%',
                      height: 10,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)',
                      filter: 'blur(3px)',
                      pointerEvents: 'none',
                      zIndex: 8,
                    }}
                  />

                  {/* Sparkle stars */}
                  {sparkles.map((s, i) => (
                    <Sparkle key={`sp-${i}`} {...s} />
                  ))}

                  {/* Floating shimmer dots */}
                  {shimmerDots.map((d, i) => (
                    <ShimmerDot key={`sd-${i}`} {...d} />
                  ))}

                  {/* Frost / ice rings */}
                  {frostRings.map((r, i) => (
                    <FrostRing
                      key={`fr-${i}`}
                      cx={r.cx}
                      cy={r.cy}
                      size={r.size}
                      delay={r.delay}
                    />
                  ))}

                  {/* Tiny pixel sparks (warm-white) */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`px-${i}`}
                      style={{
                        position: 'absolute',
                        left: `${12 + i * 13}%`,
                        bottom: 40 + (i % 3) * 18,
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: '#f0f8ff',
                        pointerEvents: 'none',
                        zIndex: 11,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        y: [0, -12, -24],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.28,
                        repeat: Infinity,
                        repeatDelay: 1.5 + i * 0.2,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* The car itself */}
            <motion.img
              src={assets.banner}
              alt="Range Rover"
              initial={{ x: '-110%', scaleX: 1, y: 0 }}
              animate={controls}
              style={{
                position: 'relative',
                transformOrigin: 'center center',
                zIndex: 12,
              }}
            />
          </div>

          {/* ── Right: Text ── */}
          <div className="flex-4 text-white">
            <div className="flex flex-col gap-4 p-4">
              <h3 className="capitalize xl:pt-6">Buy with confidence, rent without worry</h3>
              <p className="text-white/70">
                Find your next ride or earn from your vehicle in minutes. We handle insurance,
                driver verification and secure payments.
              </p>
              <button onClick={() => navigate('/listing')} className="btn-white w-36">
                Explore cars
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner