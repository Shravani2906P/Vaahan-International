// src/components/Carousel.jsx
/*
================================================================================
File Name : Carousel.jsx
Description : Reusable horizontal scroll-snap carousel used on the homepage
              for Travel Logs and Technology Guides. Netflix / Prime style:
              - Desktop: multiple cards visible, arrow buttons to page through,
                native drag/trackpad scroll also works.
              - Mobile: one card fully visible with the next card peeking in,
                swipe to move, no arrows (keeps mobile UI clean).
              No visual styling is imposed here beyond layout/spacing — the
              cards passed in as children keep their existing look untouched.
================================================================================
*/

import { useRef, useState, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

const Carousel = ({ children, ariaLabel = 'Carousel' }) => {
  const { isDark } = useTheme()
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrowState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrowState()
    el.addEventListener('scroll', updateArrowState, { passive: true })
    window.addEventListener('resize', updateArrowState)
    return () => {
      el.removeEventListener('scroll', updateArrowState)
      window.removeEventListener('resize', updateArrowState)
    }
  }, [updateArrowState, children])

  const scrollByCard = (direction) => {
    const el = trackRef.current
    if (!el) return
    const firstCard = el.firstElementChild
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : el.clientWidth * 0.8
    const gap = 20 // matches gap-5 track spacing below
    el.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">
      {/* Left arrow — desktop/tablet only, hidden on touch-first mobile widths */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={`Scroll ${ariaLabel} left`}
          className={`hidden sm:flex absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
            isDark
              ? 'bg-dark-800 text-white border border-dark-600 hover:bg-dark-700'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={`Scroll ${ariaLabel} right`}
          className={`hidden sm:flex absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
            isDark
              ? 'bg-dark-800 text-white border border-dark-600 hover:bg-dark-700'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Right-edge fade hint so users on desktop know there's more to scroll */}
      {canScrollRight && (
        <div
          className={`hidden sm:block pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-16 z-10 bg-gradient-to-l ${
            isDark ? 'from-dark-900' : 'from-gray-50'
          } to-transparent`}
        />
      )}

      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
      >
        {children}
      </div>
    </div>
  )
}

export default Carousel