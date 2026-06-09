import { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      console.log('Newsletter signup:', email)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-4 text-5xl">📧</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-800">
            Stay Updated With Automotive Technology
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Receive the latest feature guides, technology updates, and vehicle insights directly in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-600"
            >
              Thank you for subscribing! 🎉
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter