import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaEnvelope, FaLock, FaBookOpen } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const { loginUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
      }

      const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true)
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!")
            console.error(error)
        } finally {
            setIsGoogleLoading(false)
        }
      }
  return (
    <div className='min-h-[calc(100vh-120px)] bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex justify-center items-center p-4'>
        <div className='w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-8 border border-gray-100'>
            {/* Header with book icon */}
            <div className='text-center mb-8'>
                <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
                    <FaBookOpen className='text-primary text-2xl' />
                </div>
                <h2 className='text-3xl font-bold text-secondary font-primary mb-2'>Welcome Back</h2>
                <p className='text-gray-600 font-secondary'>Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div>
                    <label className='block text-gray-700 text-sm font-semibold mb-2 font-secondary' htmlFor="email">
                        Email Address
                    </label>
                    <div className='relative'>
                        <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                        {...register("email", { required: true })}
                        type="email" name="email" id="email" placeholder='Enter your email'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                        />
                    </div>
                </div>

                <div>
                    <label className='block text-gray-700 text-sm font-semibold mb-2 font-secondary' htmlFor="password">
                        Password
                    </label>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                        {...register("password", { required: true })}
                        type="password" name="password" id="password" placeholder='Enter your password'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                        />
                    </div>
                </div>

                {
                    message && (
                        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                            <p className='text-red-600 text-sm font-medium'>{message}</p>
                        </div>
                    )
                }

                <div>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full bg-secondary hover:bg-secondary/90 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none'
                    >
                        {isLoading ? (
                            <div className='flex items-center justify-center'>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                                Signing In...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </div>
            </form>

            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                    </div>
                </div>

                <div className='mt-6'>
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                        className='w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none'
                    >
                        {isGoogleLoading ? (
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2'></div>
                        ) : (
                            <FaGoogle className='text-red-500' />
                        )}
                        {isGoogleLoading ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </div>

            <p className='text-center mt-8 text-gray-600 font-secondary'>
                Don't have an account?
                <Link to="/register" className='text-primary hover:text-primary/80 font-semibold ml-1 transition-colors duration-200'>
                    Create one here
                </Link>
            </p>

            <p className='mt-8 text-center text-gray-500 text-xs font-secondary'>
                ©2025 Book Store. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Login;