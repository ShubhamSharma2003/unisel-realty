import { NavLinks } from '@/types/navlink'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Icon } from '@iconify/react'

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const itemLabelToPath = `/${item.label.toLowerCase().replace(/\s+/g, '-')}`
  const hasChildren = item.children && item.children.length > 0

  const isActive = item.href === path || path.startsWith(itemLabelToPath)

  const linkclasses = clsx(
    'py-3 text-3xl sm:text-5xl font-medium text-white/40 rounded-full group-hover:text-primary',
    {
      '!text-primary': isActive,
    }
  )

  const liststyle = clsx(
    'w-0 h-0.5 bg-primary transition-all duration-300',
    {
      '!block w-6 mr-4': isActive,
      'group-hover:block group-hover:w-6 group-hover:mr-4': true,
    }
  )

  if (hasChildren) {
    return (
      <li className='w-fit'>
        <div className='flex items-center group'>
          <div className={liststyle} />
          <button
            onClick={() => setOpen(!open)}
            className={clsx(linkclasses, 'flex items-center gap-2 cursor-pointer')}
          >
            {item.label}
            <Icon
              icon='ph:caret-down'
              width={20}
              className={clsx('transition-transform duration-200', { 'rotate-180': open })}
            />
          </button>
        </div>
        {open && (
          <ul className='ml-10 mt-1 flex flex-col gap-1'>
            {item.children!.map((child, idx) => (
              <li key={idx}>
                <Link
                  href={child.href}
                  onClick={onClick}
                  className={clsx(
                    'text-lg sm:text-xl font-medium text-white/30 hover:text-primary transition-colors duration-200',
                    { '!text-primary': child.href === path }
                  )}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li className='flex items-center group w-fit'>
      <div className={liststyle} />
      <Link href={item.href} className={linkclasses} onClick={onClick}>
        {item.label}
      </Link>
    </li>
  )
}

export default NavLink
