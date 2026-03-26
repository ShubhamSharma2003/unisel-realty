import { NavLinks } from '@/types/navlink'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const itemLabelToPath = `/${item.label.toLowerCase().replace(/\s+/g, '-')}`
  const hasChildren = item.children && item.children.length > 0

  const isActive = item.href === path || path.startsWith(itemLabelToPath)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

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
      <li
        className='w-fit'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-center group'>
          <div className={liststyle} />
          <Link href={item.href} className={linkclasses} onClick={onClick}>
            {item.label}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className='p-2 cursor-pointer text-white/40 hover:text-primary transition-colors duration-200 lg:hidden'
            aria-label={`Toggle ${item.label} submenu`}
          >
            <Icon
              icon='ph:caret-down'
              width={20}
              className={clsx('transition-transform duration-200', { 'rotate-180': open })}
            />
          </button>
          <Icon
            icon='ph:caret-down'
            width={20}
            className={clsx(
              'hidden lg:block text-white/40 transition-transform duration-200 ml-1',
              { 'rotate-180': open }
            )}
          />
        </div>
        <div
          className={clsx(
            'grid transition-all duration-300 ease-in-out',
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <ul className='overflow-hidden ml-10 flex flex-col gap-1'>
            {item.children!.map((child, idx) => (
              <li
                key={idx}
                className='transition-all duration-300 ease-in-out'
                style={{
                  transitionDelay: open ? `${idx * 60}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-12px)',
                }}
              >
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
        </div>
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
