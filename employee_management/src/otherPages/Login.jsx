import React, { useState } from 'react'
import { MdLogin } from "react-icons/md";
import clx from 'clsx'
import bg from '../assets/mdvImage.jpg'
function Login() {
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState(true)

  return (
    <div
    // style={{backgroundImage: `url(${bg})`}}
    className='min-h-screen w-full flex flex-col bg-center justify-center items-center px-4'>
      <h1 className='text-2xl text-center font-bold mb-10 lg:text-3xl'>Welcome to Click&Bounce</h1>
      <form 
        action="" 
        className="w-full max-w-md bg-white p-6 rounded-md shadow-[0px_0px_46px_1px_#D3D3D3] space-y-4"
      >
        <h1 className='text-2xl font-semibold flex items-center gap-2 border-b pb-2'>
          Login <MdLogin />
        </h1>

        <p className={clx('text-red-500 text-sm', error ? '' : 'hidden')}>
          Incorrect username or password
        </p>

        <div className='flex flex-col'>
          <label htmlFor="username" className='text-lg'>Username</label>
          <input 
            type="text" 
            name='username'
            placeholder='Enter username'
            className='p-2 border border-gray-300 rounded-md'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="password" className='text-lg'>Password</label>
          <input 
            type={showPass ? "text" : "password"} 
            name='password'
            placeholder='Enter password'
            className='p-2 border border-gray-300 rounded-md'
          />
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0'>
          <div className='flex items-center gap-2'>
            <input
              onChange={() => setShowPass(!showPass)}
              checked={showPass}
              type="checkbox" 
              className='w-5 h-5'
            />
            <label className='text-sm'>Show password</label>
          </div>
          <a 
            href="/forgot-password" 
            className='text-sm text-blue-500 hover:underline'
          >
            Forgot password?
          </a>
        </div>

        <button 
          type='submit' 
          className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
