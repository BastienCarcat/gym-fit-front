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

export default function Navbar() {
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <div>gym</div>
        <p className="font-bold text-inherit">FIT</p>
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
      </NavbarContent>
    </NavbarUI>
  )
}
