import { Link } from 'react-router-dom'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Category', path: '/category' },
    { name: 'Contact', path: '/contact' },
  ]

  const resources = [
    { name: 'Safety Features', path: '/category#safety' },
    { name: 'ADAS', path: '/category#adas' },
    { name: 'Connected Cars', path: '/category#connected' },
    { name: 'Electric Vehicles', path: '/category#ev' },
  ]

  const socialIcons = [
    { name: 'LinkedIn', icon: '🔗', url: '#' },
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
  ]

  return (
    <footer className="bg-dark-900 text-gray-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚗</span>
              <span className="text-xl font-bold text-white">Vaahan International</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Helping Indian car buyers understand vehicle technology, safety systems, and automotive innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link to={resource.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={social.name}
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">contact@vaahan-international.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© 2026 Vaahan International. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer