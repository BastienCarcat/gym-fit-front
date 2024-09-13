import React from 'react'
import {
  Button,
  Link,
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { siteConfig } from '@/config/site'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Navbar() {
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <Image
          className="rounded-full"
          src="/logo.png"
          alt="gymfit-logo"
          width={40}
          height={40}
        ></Image>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link isBlock color="foreground" href="#search">
            Search exercise
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            isBlock
            color="foreground"
            href={siteConfig.documentation_url}
            target="_blank"
          >
            Documentation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isBlock color="foreground" href="#pricing">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isBlock color="foreground" href="#faq">
            FAQ
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href={siteConfig.rapid_playground_url}
            target="_blank"
            variant="flat"
          >
            Try API
          </Button>
        </NavbarItem>
        <NavbarItem>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  )
}
