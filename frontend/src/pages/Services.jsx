import React from 'react'

const Services = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-500 text-lg">Everything we offer to make your reading experience better.</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <div className="text-3xl mb-3">🛒</div>
          <h3 className="text-xl font-semibold mb-2">Online Book Shopping</h3>
          <p className="text-gray-600">
            Browse and buy from thousands of books online. Easy search, filtering by genre,
            and a smooth checkout experience.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="text-xl font-semibold mb-2">Home Delivery</h3>
          <p className="text-gray-600">
            Get your books delivered directly to your doorstep anywhere in Nepal.
            Fast and reliable shipping at affordable rates.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-3xl mb-3">🎁</div>
          <h3 className="text-xl font-semibold mb-2">Discounts & Offers</h3>
          <p className="text-gray-600">
            Enjoy regular discounts, seasonal sales, and special offers on your
            favourite books throughout the year.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-3xl mb-3">📬</div>
          <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
          <p className="text-gray-600">
            Subscribe to our newsletter and stay updated with new arrivals,
            trending books, and exclusive deals delivered to your inbox.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-3xl mb-3">⭐</div>
          <h3 className="text-xl font-semibold mb-2">Book Recommendations</h3>
          <p className="text-gray-600">
            Get personalized book recommendations based on your interests and
            reading history to discover your next favourite book.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-3xl mb-3">🔄</div>
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">
            Not satisfied? We offer a simple and hassle-free return process
            to ensure your complete satisfaction.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services;