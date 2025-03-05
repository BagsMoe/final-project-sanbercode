// containers/register-container/index.tsx
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema, RegisterPayload } from '@/lib/schemas/register/registerSchema';
import { CalendarIcon } from 'lucide-react';

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
  });

  const dob = watch('dob'); // Watch the date of birth field

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setValue('dob', format(date, 'yyyy-MM-dd')); // Set value for dob field
    }
  };

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        router.push('/login'); // Redirect ke halaman login setelah registrasi berhasil
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">REGISTER</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Name ..."
              className="mt-1"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              {...register('email')}
              type="email"
              placeholder="Email ..."
              className="mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal mt-1"
                >
                
                  {dob ? format(new Date(dob), 'MM/dd/yyyy') : 'mm/dd/yyyy'}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dob ? new Date(dob) : undefined}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...register('phone')}
              type="tel"
              placeholder="Phone ..."
              className="mt-1"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="hobby">Hobby</Label>
            <Input
              id="hobby"
              {...register('hobby')}
              placeholder="Hobby ..."
              className="mt-1"
            />
            {errors.hobby && <p className="text-red-500 text-sm mt-1">{errors.hobby.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register('password')}
              type="password"
              placeholder="Password ..."
              className="mt-1"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full mt-6">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;