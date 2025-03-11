import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { getApiUrl } from '@/lib/utils'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/useToast'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const LoginForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(getApiUrl('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      console.log(data)
      if (data.success) {
        Cookies.set('token', data.data.token, { path: '/' })
        showToast({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          variant: 'success',
        })
        router.push('/')
      } else {
        setError(data.message || 'Login failed')
        showToast({
          title: 'Login Failed',
          description: data.message || 'Login failed.',
          variant: 'error',
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || 'An error occurred during login')
      showToast({
        title: 'Error',
        description: 'An error occurred during login.',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold p-8 dark:text-white">LOGIN</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Masukkan email anda"
                    type="email"
                    {...field}
                    className="w-full border-2 border-gray-200 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center border-2 border-gray-200 rounded-md">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      {...field}
                      className="w-full border-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 font-bold text-white hover:bg-blue-600"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
