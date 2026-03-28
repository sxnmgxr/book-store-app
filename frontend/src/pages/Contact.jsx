import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-500 text-lg">Have a question? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">support@bookstore.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-2xl">📞</span>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+977 9800000000</p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-2xl">📍</span>
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl">🕒</span>
            <div>
              <h3 className="font-semibold">Working Hours</h3>
              <p className="text-gray-600">Sunday - Friday: 9AM - 6PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="border rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thank you for contacting us. We will get back to you soon.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }) }}
                className="mt-4 bg-primary px-6 py-2 rounded-md text-sm font-medium"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-primary py-2 rounded-md font-medium hover:bg-yellow-500 transition-all"
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact;