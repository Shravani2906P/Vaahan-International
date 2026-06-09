import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Informed Decision?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive guides and understand modern car features before you buy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/category" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Browse Categories
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection