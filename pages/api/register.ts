import { NextApiRequest, NextApiResponse } from "next";

interface RegisterPayload {
  name: string;
  email: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  phone: string;
  hobby: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, dateOfBirth, phone, hobby, password }: RegisterPayload = req.body;

      if (!name || !email || !dateOfBirth || !phone || !hobby || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateOfBirth)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }

      console.log("Received payload:", { name, email, dateOfBirth, phone, hobby, password });

      return res.status(200).json({ message: "Registration successful!", data: { name, email, dateOfBirth, phone, hobby } });
    } catch (error) {
      console.error("Error in register API:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}