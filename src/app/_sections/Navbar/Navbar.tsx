import React from 'react'
import {
  Button,
  Link,
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'

export default function Navbar() {
  return (
    <NavbarUI shouldHideOnScroll>
      <NavbarBrand>
        <div>gym</div>
        <p className="font-bold text-inherit">FIT</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Calculator
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Documentation
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  )
}
