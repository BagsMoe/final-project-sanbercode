import { LoginForm } from "../container/login-container";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <LoginForm />
        <p className="mt-4 text-center">
          Don&apos;t have an account? <a href="/register" className="text-blue-500">Register Now</a>
        </p>
      </div>
    </div>
  );
}