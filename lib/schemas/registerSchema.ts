import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
  dob: z.string().optional(),
  phone: z.string().optional(),
  hobby: z.string().optional(),
})

export type RegisterPayload = z.infer<typeof registerSchema>
