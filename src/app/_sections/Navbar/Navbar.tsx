'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

import { siteConfig } from '@/config/site'

const navItems = [
  { name: 'Pricing', href: siteConfig.rapid_plans_url, target: '_blank' },
  { name: 'Features', href: '#features', target: '_self' },
  {
    name: 'Documentation',
    href: siteConfig.documentation_url,
    target: '_blank'
  }
]

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [backgroundStyles, setBackgroundStyles] = useState({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hoveredIndex !== null && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const buttonRect =
        navRef.current.children[hoveredIndex].getBoundingClientRect()

      setBackgroundStyles({
        width: buttonRect.width,
        left: buttonRect.left - navRect.left,
        top: 0,
        height: navRect.height
      })
    }
  }, [hoveredIndex])

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white bg-opacity-70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden flex-1 justify-center md:flex">
            <div ref={navRef} className="relative flex items-center">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  className="mx-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                  href={item.href}
                  target={item.target}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </Link>
              ))}
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.span
                    animate={{ ...backgroundStyles, opacity: 1 }}
                    className="absolute -z-10 rounded-md bg-gray-200"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-200 hover:text-gray-900 focus:outline-none md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Try For Free button - Desktop */}
          <Link
            className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            href={siteConfig.rapid_playground_url}
            target="_blank"
          >
            Try For Free
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            animate={{ opacity: 0.7, height: 'auto' }}
            className="overflow-hidden md:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-1 px-4 pb-3 pt-2 backdrop-blur-xl">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-200 hover:text-gray-900"
                  href={item.href}
                  target={item.target}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
