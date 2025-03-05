import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post_id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const response = await fetch(`https://service.pace-unv.cloud/api/post/update/${post_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await fetch(`https://service.pace-unv.cloud/api/post/delete/${post_id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}