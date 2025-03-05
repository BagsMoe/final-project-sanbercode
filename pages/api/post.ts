import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const postSchema = z.object({
  id: z.number(),
  content: z.string(),
  email: z.string().email(),
  likes: z.number(),
  replies: z.number(),
  edited: z.boolean().optional(),
});

type Post = z.infer<typeof postSchema>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;

  try {
    const response = await fetch(`https://service.pace-unv.cloud/api/posts?type=${type}`);
    const data = await response.json();
    const validatedPosts = z.array(postSchema).parse(data);
    res.status(200).json(validatedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}