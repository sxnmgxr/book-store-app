import React from 'react'

const About = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-500 text-lg">Learn more about who we are and what we do.</p>
      </div>

      {/* Who We Are */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed">
          We are a passionate team of book lovers dedicated to bringing the best books to readers across Nepal.
          Our bookstore offers a wide collection of genres — from fiction and non-fiction to academic and children's books.
          We believe that every book has the power to change a life.
        </p>
      </div>

      {/* Our Mission */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to make quality books accessible and affordable for everyone.
          We strive to create a seamless reading experience by providing a wide selection of books,
          fast delivery, and excellent customer support.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-5">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border rounded-lg p-5 text-center">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
            <p className="text-gray-500 text-sm">Thousands of books across all genres and categories.</p>
          </div>
          <div className="border rounded-lg p-5 text-center">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-500 text-sm">Quick and reliable delivery across Nepal.</p>
          </div>
          <div className="border rounded-lg p-5 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
            <p className="text-gray-500 text-sm">Affordable prices with regular discounts and offers.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;