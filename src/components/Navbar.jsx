import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/students', label: 'Students' },
  { to: '/courses', label: 'Courses' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">GSFC</span>
        <span className="navbar__title">Course &amp; Student MS</span>
      </div>
      <nav className="navbar__links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'navbar__link is-active' : 'navbar__link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
