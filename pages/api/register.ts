// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { registerSchema, RegisterPayload } from '@/lib/schemas/register/registerSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Validasi payload menggunakan Zod
      const validatedData: RegisterPayload = registerSchema.parse(req.body);

      // Simulasikan penyimpanan data
      const newUser = {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        dob: validatedData.dob || '',
        phone: validatedData.phone || '',
        hobby: validatedData.hobby || '',
      };

      // Simulasikan respons sukses
      return res.status(200).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
      // Tangani error validasi Zod
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
  } else {
    // Handle metode selain POST
    return res.status(405).json({ message: 'Method not allowed' });
  }
}