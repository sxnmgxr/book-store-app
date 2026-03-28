import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa'

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5'>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            to="/"
            className='inline-flex items-center text-secondary hover:text-primary transition-colors duration-200 mb-4'
          >
            <FaArrowLeft className='mr-2' />
            Back to Home
          </Link>
          <div className='flex items-center mb-6'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mr-4'>
              <FaShieldAlt className='text-primary text-2xl' />
            </div>
            <div>
              <h1 className='text-4xl font-bold text-secondary font-primary'>Privacy Policy</h1>
              <p className='text-gray-600 font-secondary'>Last updated: March 25, 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-2xl shadow-xl p-8 space-y-8'>
          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>1. Information We Collect</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Create an account or make a purchase</li>
                <li>Sign up for our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>This information may include your name, email address, shipping address, payment information, and any other information you choose to provide.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>2. How We Use Your Information</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We use the information we collect to:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Process and fulfill your orders</li>
                <li>Provide customer support</li>
                <li>Send you important updates about your account and orders</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and maintain security</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>3. Information Sharing</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>With service providers who help us operate our business</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>4. Data Security</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing</li>
                <li>Regular security audits</li>
                <li>Employee access controls</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>5. Cookies and Tracking</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>6. Your Rights</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>You have the right to:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>7. Contact Us</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p><strong>Email:</strong> privacy@bookstore.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Book Street, Reading City, RC 12345</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>8. Changes to This Policy</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy