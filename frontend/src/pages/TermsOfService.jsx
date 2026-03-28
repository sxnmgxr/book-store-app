import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaFileContract } from 'react-icons/fa'

const TermsOfService = () => {
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
              <FaFileContract className='text-primary text-2xl' />
            </div>
            <div>
              <h1 className='text-4xl font-bold text-secondary font-primary'>Terms of Service</h1>
              <p className='text-gray-600 font-secondary'>Last updated: March 25, 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-2xl shadow-xl p-8 space-y-8'>
          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>1. Acceptance of Terms</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>By accessing and using BookStore ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>2. Use License</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>Permission is granted to temporarily use BookStore for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>3. User Accounts</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Safeguarding your account password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>4. Products and Services</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>All products and services are subject to availability. We reserve the right to discontinue any product or service at any time. Prices for our products are subject to change without notice.</p>
              <p>We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>5. Billing and Account Information</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>6. Returns and Refunds</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We offer a 30-day return policy for most items. Items must be returned in their original condition and packaging. Digital products are not eligible for return unless there's a technical issue.</p>
              <p>Refunds will be processed within 5-7 business days after we receive your returned item.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>7. Prohibited Uses</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>You may not use our products for any illegal or unauthorized purpose. You must not transmit any worms or viruses or any code of a destructive nature.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>8. Limitation of Liability</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>In no event shall BookStore or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>9. Governing Law</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>10. Changes to Terms</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-secondary font-primary mb-4'>11. Contact Information</h2>
            <div className='space-y-4 text-gray-700 font-secondary leading-relaxed'>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p><strong>Email:</strong> legal@bookstore.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Book Street, Reading City, RC 12345</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService