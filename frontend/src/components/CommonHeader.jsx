// src/components/CommonHeader.jsx - Fixed category hover colors

import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

const CommonHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [activeMobileCategory, setActiveMobileCategory] = useState(null)
  const location = useLocation()
  const { isDark } = useTheme()

  const brandColor = isDark ? '#0f172a' : '#CFB32B'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const textHoverColor = isDark ? 'hover:text-yellow-400' : 'hover:text-gray-700'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setIsCategoriesOpen(false)
    setActiveMobileCategory(null)
  }, [location])

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
  ]

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen)
    if (!isCategoriesOpen) {
      setActiveMobileCategory(null)
    }
  }

  const toggleMobileSubCategory = (categoryName) => {
    setActiveMobileCategory(activeMobileCategory === categoryName ? null : categoryName)
  }

  const mobileCategories = [
    {
      name: "Compare Cars",
      path: "/compare-cars",
      isDirect: true
    },
    {
      name: "Feature Reviews",
      articles: [
        { title: "AWD vs FWD: The ₹2 Lakh Question", slug: "awd-vs-fwd" },
        { title: "ADAS Lane Keep Assist Review", slug: "adas-lane-keep-assist" },
        { title: "FWD Car in Spiti Winter", slug: "fwd-car-spiti-winter" },
        { title: "Best Tyres for Highway Drives", slug: "best-highway-tyres" }
      ]
    },
    {
      name: "New Launches",
      articles: [
        { title: "2026 Hyundai Creta Launch", slug: "hyundai-creta-2026-launch" },
        { title: "New Kia Seltos 2026", slug: "kia-seltos-2026" }
      ]
    },
    {
      name: "Tech Insights",
      articles: [
        { title: "What is ADAS? Complete Guide", slug: "what-is-adas" },
        { title: "What is ABS? How It Works", slug: "what-is-abs" },
        { title: "What is EBD? Explained", slug: "what-is-ebd" },
        { title: "What is ESC? Stability Control", slug: "what-is-esc" }
      ]
    }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-xl' : 'py-2 md:py-3'
      }`}
      style={{
        backgroundColor: brandColor,
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="/Vaahan_International_Logo1.jpg"
              alt="Vaahan International"
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => {
                  let activeClass = ''
                  if (isActive) {
                    activeClass = isDark 
                      ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1'
                      : 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  }
                  return `font-semibold text-sm xl:text-[16px] tracking-wide transition-all duration-300 ${
                    isActive ? activeClass : `${textColor} ${textHoverColor}`
                  }`
                }}
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Categories Dropdown - Desktop with fixed hover color */}
            <CategoriesDropdown />
            
            <Link
              to="/contact"
              className="
                bg-[#0B1F3A]
                hover:bg-[#08172C]
                text-white
                font-semibold
                py-1.5 px-3 xl:py-2 xl:px-4 2xl:py-2.5 2xl:px-6
                rounded-lg xl:rounded-xl
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                text-xs xl:text-sm 2xl:text-base
              "
            >
              Get Started
            </Link>

            {/* ThemeToggle - Moved to extreme right after Get Started */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none flex-shrink-0 p-1 ml-2"
            aria-label="Toggle Menu"
          >
            <div className="w-5 sm:w-6 h-4 sm:h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="pt-3 pb-4 space-y-1.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => {
                      let activeClass = ''
                      if (isActive) {
                        activeClass = isDark 
                          ? 'text-yellow-400' 
                          : 'text-gray-900 font-bold'
                      }
                      return `block py-2 font-medium text-base sm:text-lg ${
                        isActive ? activeClass : `${textColor} ${textHoverColor}`
                      }`
                    }}
                    onClick={() => {
                      setIsOpen(false)
                      setIsCategoriesOpen(false)
                      setActiveMobileCategory(null)
                    }}
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Categories with Nested Dropdown - Mobile */}
                <div className="py-1">
                  <button
                    onClick={toggleCategories}
                    className={`w-full flex items-center justify-between py-2 font-medium text-base sm:text-lg ${textColor} ${textHoverColor}`}
                  >
                    <span>Categories</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCategoriesOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-2 sm:ml-4 space-y-1 pt-1 pb-2">
                          {mobileCategories.map((item, idx) => {
                            if (item.isDirect) {
                              return (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  className={`block py-2 text-sm sm:text-base ${textColor} ${textHoverColor} transition-colors pl-2 border-l-2 border-transparent hover:border-gray-400`}
                                  onClick={() => {
                                    setIsOpen(false)
                                    setIsCategoriesOpen(false)
                                    setActiveMobileCategory(null)
                                  }}
                                >
                                  {item.name}
                                </Link>
                              )
                            }
                            
                            const isActive = activeMobileCategory === item.name
                            return (
                              <div key={idx} className="space-y-1">
                                <button
                                  onClick={() => toggleMobileSubCategory(item.name)}
                                  className={`w-full flex items-center justify-between py-2 text-sm sm:text-base ${textColor} ${textHoverColor} transition-colors pl-2 border-l-2 border-transparent hover:border-gray-400`}
                                >
                                  <span>{item.name}</span>
                                  <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${
                                      isActive ? 'rotate-90' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                                
                                <AnimatePresence>
                                  {isActive && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="ml-4 sm:ml-6 space-y-1 pb-1">
                                        {item.articles.map((article, articleIdx) => (
                                          <Link
                                            key={articleIdx}
                                            to={`/article/${article.slug}`}
                                            className={`block py-1.5 text-xs sm:text-sm ${textColor} ${textHoverColor} transition-colors pl-2 border-l-2 border-transparent hover:border-gray-400`}
                                            onClick={() => {
                                              setIsOpen(false)
                                              setIsCategoriesOpen(false)
                                              setActiveMobileCategory(null)
                                            }}
                                          >
                                            {article.title}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Theme Toggle - Mobile */}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-200 dark:border-dark-700">
                  {/* <span className={`text-sm ${textColor}`}>Theme</span> */}
                  <ThemeToggle />
                </div>
                
                {/* Get Started Button */}
                <Link
                  to="/contact"
                  className="
                    block
                    text-center
                    bg-[#0B1F3A]
                    hover:bg-[#08172C]
                    text-white
                    font-semibold
                    py-2.5
                    rounded-xl
                    transition-all
                    duration-300
                    text-base
                    mt-2
                  "
                  onClick={() => {
                    setIsOpen(false)
                    setIsCategoriesOpen(false)
                    setActiveMobileCategory(null)
                  }}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

// CategoriesDropdown component for desktop with fixed hover color
const CategoriesDropdown = () => {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const timeoutRef = useRef(null)
  const dropdownRef = useRef(null)

  const categories = [
    {
      name: "Feature Reviews",
      articles: [
        { title: "AWD vs FWD: The ₹2 Lakh Question", slug: "awd-vs-fwd" },
        { title: "ADAS Lane Keep Assist Review", slug: "adas-lane-keep-assist" },
        { title: "FWD Car in Spiti Winter", slug: "fwd-car-spiti-winter" },
        { title: "Best Tyres for Highway Drives", slug: "best-highway-tyres" }
      ]
    },
    {
      name: "New Launches",
      articles: [
        { title: "2026 Hyundai Creta Launch", slug: "hyundai-creta-2026-launch" },
        { title: "New Kia Seltos 2026", slug: "kia-seltos-2026" }
      ]
    },
    {
      name: "Tech Insights",
      articles: [
        { title: "What is ADAS? Complete Guide", slug: "what-is-adas" },
        { title: "What is ABS? How It Works", slug: "what-is-abs" },
        { title: "What is EBD? Explained", slug: "what-is-ebd" },
        { title: "What is ESC? Stability Control", slug: "what-is-esc" }
      ]
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setActiveCategory(null)
    }, 200)
  }

  const handleCategoryMouseEnter = (categoryName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(categoryName)
  }

  const handleCategoryMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 200)
  }

  const handleSubmenuMouseEnter = (categoryName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(categoryName)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Theme-aware colors - Fixed hover for light mode
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const subTextColor = isDark ? 'text-gray-400' : 'text-gray-500'
  const hoverBg = isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-100'
  const subHoverBg = isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-100'
  const borderColor = isDark ? 'border-dark-700' : 'border-gray-100'
  const bgColor = isDark ? 'bg-dark-800' : 'bg-white'
  const subBgColor = isDark ? 'bg-dark-800' : 'bg-white'
  const headerBg = isDark ? 'bg-dark-700' : 'bg-gray-50'
  const hoverTextColor = isDark ? 'hover:text-yellow-400' : 'hover:text-gray-700'

  return (
    <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={`flex items-center gap-1 font-semibold text-sm xl:text-[16px] tracking-wide ${textColor} ${hoverTextColor} transition-colors`}>
        Categories
        <svg className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 w-56 sm:w-64 md:w-72 rounded-lg shadow-xl border ${borderColor} z-50 ${bgColor}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Compare Cars - Direct Link */}
          <Link
            to="/compare-cars"
            className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 ${hoverBg} transition-colors border-b ${borderColor}`}
            onClick={() => setIsOpen(false)}
          >
            <div>
              <div className={`font-bold text-sm sm:text-base ${textColor}`}>Compare Cars</div>
              <div className={`text-[10px] sm:text-xs ${subTextColor}`}>Side by side comparison</div>
            </div>
            <span className="text-yellow-500 text-xs sm:text-sm">→</span>
          </Link>

          {categories.map((category, idx) => (
            <div
              key={idx}
              className={`relative border-b ${borderColor} last:border-0`}
              onMouseEnter={() => handleCategoryMouseEnter(category.name)}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 ${hoverBg} cursor-pointer transition-colors`}>
                <div>
                  <div className={`font-semibold text-sm sm:text-base ${textColor}`}>{category.name}</div>
                  <div className={`text-[10px] sm:text-xs ${subTextColor}`}>{category.articles.length} articles</div>
                </div>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {activeCategory === category.name && (
                <div
                  className={`absolute top-0 right-full mr-0 w-56 sm:w-64 md:w-80 rounded-lg shadow-xl border ${borderColor} z-50 ${subBgColor}`}
                  style={{ left: 'auto', right: '100%' }}
                  onMouseEnter={() => handleSubmenuMouseEnter(category.name)}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <div className="py-2">
                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 ${headerBg} border-b ${borderColor}`}>
                      <span className={`font-semibold text-sm sm:text-base ${textColor}`}>{category.name}</span>
                      <span className={`text-[10px] sm:text-xs ${subTextColor} ml-2`}>({category.articles.length})</span>
                    </div>
                    {category.articles.map((article, articleIdx) => (
                      <Link
                        key={articleIdx}
                        to={`/article/${article.slug}`}
                        className={`block px-3 sm:px-4 py-1.5 sm:py-2 ${subHoverBg} transition-colors`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className={`text-xs sm:text-sm ${textColor} ${hoverTextColor}`}>
                          {article.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommonHeader