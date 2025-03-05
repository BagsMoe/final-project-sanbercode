// containers/home-container/index.tsx
import { useEffect, useState } from 'react';
import { z } from 'zod';

// Schema untuk validasi data post
const postSchema = z.object({
  id: z.number(),
  content: z.string(),
  email: z.string().email(),
  likes: z.number(),
  replies: z.number(),
  edited: z.boolean().optional(),
});

type Post = z.infer<typeof postSchema>;

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?type=all');
        const data = await response.json();
        const validatedPosts = z.array(postSchema).parse(data);
        setPosts(validatedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>By: {post.email}</p>
          <p>Likes: {post.likes} | Replies: {post.replies}</p>
          {post.edited && <p>(Edited)</p>}
        </div>
      ))}
    </div>
  );
}