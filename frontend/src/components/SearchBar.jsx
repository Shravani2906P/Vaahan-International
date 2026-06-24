// src/components/SearchBar.jsx
/*
================================================================================
File Name : SearchBar.jsx
Author : Tahseen Raza
Created Date : 2025-01-15
Description : Professional search bar component for articles and cars
Company : Vaahan International
Copyright : (c) 2025 Vaahan International. All rights reserved.
================================================================================
*/

import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchArticles } from '../data/articlesData'
import { api } from '../services/api'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [articleResults, setArticleResults] = useState([])
  const [carResults, setCarResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState('all') // 'all', 'articles', 'cars'
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const performSearch = async () => {
      if (query.length >= 2) {
        setIsLoading(true)
        setResults([])
        setArticleResults([])
        setCarResults([])

        try {
          // Search articles
          const articleData = await searchArticles(query)
          setArticleResults(articleData.slice(0, 5))

          // Search cars
          const carData = await api.searchCars(query)
          if (carData.success) {
            setCarResults(carData.data.slice(0, 5))
          }

          setIsOpen(true)
        } catch (error) {
          console.error('❌ Search error:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setArticleResults([])
        setCarResults([])
        setIsOpen(false)
      }
    }

    const timeout = setTimeout(performSearch, 300)
    return () => clearTimeout(timeout)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/articles?search=${encodeURIComponent(query)}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Feature Reviews': return 'bg-blue-100 text-blue-700'
      case 'Tech Insights': return 'bg-green-100 text-green-700'
      case 'New Launches': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const totalResults = articleResults.length + carResults.length

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, cars, brands, models..."
            className="w-full px-5 py-4 pl-12 pr-16 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-800 placeholder-gray-400"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-500"></div>
            </div>
          )}
          {query.length >= 2 && !isLoading && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && totalResults > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden max-h-[500px] overflow-y-auto">
          <div className="py-2">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">
                {totalResults} result{totalResults !== 1 ? 's' : ''} found
              </span>
              <span className="text-xs text-gray-400">
                <button 
                  onClick={() => navigate(`/articles?search=${encodeURIComponent(query)}`)}
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  View all →
                </button>
              </span>
            </div>

            {/* Articles Section */}
            {articleResults.length > 0 && (
              <div>
                <div className="px-4 py-1.5 bg-gray-50/50 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Articles</span>
                </div>
                {articleResults.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    onClick={handleResultClick}
                    className="block px-4 py-3 hover:bg-yellow-50 transition-colors group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                          {article.readTime && (
                            <span className="text-xs text-gray-400">{article.readTime}</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors text-sm">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {article.excerpt}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all ml-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Cars Section */}
            {carResults.length > 0 && (
              <div>
                <div className="px-4 py-1.5 bg-gray-50/50 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Cars</span>
                </div>
                {carResults.map((car) => (
                  <Link
                    key={car.id}
                    to={`/compare-cars`}
                    onClick={() => {
                      handleResultClick()
                      // You can pass the car to compare page via state if needed
                    }}
                    className="block px-4 py-3 hover:bg-yellow-50 transition-colors group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {car.image && (
                        <img 
                          src={car.image} 
                          alt={car.name} 
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-xs font-medium text-gray-600">
                            {car.brand}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{car.model}</span>
                          {car.overallScore && (
                            <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                              ★ {car.overallScore.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors text-sm">
                          {car.name}
                        </h4>
                        {car.price && (
                          <p className="text-xs text-gray-500">{car.price}</p>
                        )}
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && totalResults === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-8 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h4 className="font-semibold text-gray-800 mb-1">No results found</h4>
          <p className="text-sm text-gray-500 mb-3">
            We couldn't find any articles or cars matching "{query}"
          </p>
          <p className="text-xs text-gray-400">
            Try searching for: AWD, ADAS, Spiti, Tyres, ABS, ESC, Creta, Nexon, XUV700
          </p>
          <button
            onClick={() => navigate(`/articles?search=${encodeURIComponent(query)}`)}
            className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Search all articles →
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchBar