import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function LoginContainer() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full justify-between bg-white p-1 items-center border-2 border-gray-200 rounded-md">
        <Input
          className="w-full border-none"
          type="email"
          placeholder="Email"
        />
      </div>

      <div className="flex w-full justify-between bg-white p-1 items-center border-2 border-gray-200 rounded-md">
        <Input
          className="w-full border-none"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </div>
      <Button  
      className='bg-blue-500 w-full hover:bg-blue-600 p-5'>Login</Button>
      <p className='text-center text-lg'>Don&apos;t have an account? <Link 
      className='font-semibold' href="/register">Register now!</Link></p>
    </div>
  )
}

