import { NavLinks } from '@/types/navlink'

export const navLinks: NavLinks[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Residential', href: '/residential',
    children: [
      { label: 'New Launch', href: '/residential/new-launch' },
      { label: 'Ready to Move', href: '/residential/ready-to-move' },
      { label: 'Under Construction', href: '/residential/under-construction' },
      { label: 'Near Possession', href: '/residential/near-possession' },
    ],
  },
  {
    label: 'Commercial', href: '/commercial',
    children: [
      { label: 'Pre-Leased', href: '/commercial/pre-leased' },
      { label: 'New Launch', href: '/commercial/new-launch' },
      { label: 'Under Construction', href: '/commercial/under-construction' },
      { label: 'Near Possession', href: '/commercial/near-possession' },
    ],
  },
  {
    label: 'Locations', href: '#',
    children: [
      { label: 'Golf Course Road', href: '/location/golf-course-road' },
      { label: 'Golf Course Extn Road', href: '/location/golf-course-extension-road' },
      { label: 'Dwarka Expressway', href: '/location/dwarka-expressway' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
