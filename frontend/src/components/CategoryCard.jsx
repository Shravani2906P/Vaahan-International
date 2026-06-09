import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CategoryCard = ({ title, description, examples, icon, color, link, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="card group"
    >
      <div className={`p-6 ${color}`}>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-dark-800">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {examples.map((example, idx) => (
            <span key={idx} className="text-xs bg-white/50 px-2 py-1 rounded-full text-gray-700">
              {example}
            </span>
          ))}
        </div>
        <Link
          to={link}
          className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          Learn More
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default CategoryCard