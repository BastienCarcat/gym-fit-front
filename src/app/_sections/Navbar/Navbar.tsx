// import React from 'react'
// import {
//   Button,
//   Link,
//   Navbar as NavbarUI,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem
// } from '@nextui-org/react'
// import { siteConfig } from '@/config/site'
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
// import Image from 'next/image'

// export default function Navbar() {
//   return (
//     <NavbarUI shouldHideOnScroll>
//       <NavbarBrand>
//         <Image
//           className="rounded-full"
//           src="/logo.png"
//           alt="gymfit-logo"
//           width={40}
//           height={40}
//         ></Image>
//       </NavbarBrand>
//       <NavbarContent className="hidden gap-4 sm:flex" justify="center">
//         <NavbarItem>
//           <Link isBlock color="foreground" href="#search">
//             Search exercise
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link
//             isBlock
//             color="foreground"
//             href={siteConfig.documentation_url}
//             target="_blank"
//           >
//             Documentation
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link isBlock color="foreground" href="#pricing">
//             Pricing
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link isBlock color="foreground" href="#faq">
//             FAQ
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem>
//           <Button
//             as={Link}
//             color="primary"
//             href={siteConfig.rapid_playground_url}
//             target="_blank"
//             variant="flat"
//           >
//             Try API
//           </Button>
//         </NavbarItem>
//         <NavbarItem>
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </NavbarItem>
//       </NavbarContent>
//     </NavbarUI>
//   )
// }
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const navItems = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Features', href: '/features' },
  { name: 'Documentation', href: '/docs' }
]

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [backgroundStyles, setBackgroundStyles] = useState({})
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
        <div className="flex h-16 items-center justify-center">
          <div className="relative flex items-center" ref={navRef}>
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="mx-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.name}
              </Link>
            ))}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.span
                  className="absolute -z-10 rounded-md bg-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ ...backgroundStyles, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}
