import { LoginForm}from '@/container/login-container'

export default function LoginPage() {
  return (
    <div className="m-0 flex justify-center items-center">
      <div className="w-[480px]">
        <LoginForm/>
        <p className=" text-center">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-500">
            Register Now
          </a>
        </p>
      </div>
    </div>
  )
}
