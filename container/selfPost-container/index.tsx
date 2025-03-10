// components/DisplayAllPosts.tsx
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getApiUrl, getFormattedDate, isOwnPost } from '@/lib/utils';
import { Heart, MessageCircle } from 'lucide-react';
import { likePost, unlikePost } from '@/lib/handleLikes';
import PostActions from '@/components/ui/postAction';
import { useRouter } from 'next/router';


type User = {
  id: number;
  name: string;
  email: string;
};

type Post = {
  id: number;
  description: string;
  users_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  likes_count: number;
  replies_count: number;
  is_like_post: boolean;
  is_own_post: boolean;
  user: User;
};

export default function DisplaySelfPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = Number(Cookies.get('user_id')); 
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Token tidak ditemukan. Silakan login.');
        setLoading(false);
        return;
      }

      const response = await fetch(getApiUrl('posts?type=me'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Gagal mengambil data');

      const data = await response.json();
      setPosts(data.data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLikeClick = async (postId: number, isLiked: boolean) => {
    try {
      let result;
      if (isLiked) {
        result = await unlikePost(postId);
      } else {
        result = await likePost(postId);
      }

      if (result.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  is_like_post: !post.is_like_post,
                  likes_count: post.is_like_post ? post.likes_count - 1 : post.likes_count + 1,
                }
              : post,
          ),
        );
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleUpdatePost = (postId: number, newDescription: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, description: newDescription, updated_at: new Date().toISOString() } : post,
      ),
    );
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full py-10 px-5 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          const initial = post.user.name.charAt(0).toUpperCase();
          const bgColor = `hsl(${post.user.name.length * 42}, 70%, 50%)`;

          return (
                       <div
                       onClick={() => router.push('/profile')}
              key={post.id}
              className="block bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
            
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white font-bold rounded-full"
                    style={{ backgroundColor: bgColor }}
                  >
                    {initial}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {post.user.name} {isOwnPost(post.users_id, currentUserId) && '(You)'}
                    </h2>
                    <p className="text-gray-500 text-sm">{post.user.email}</p>
                    <p className="text-gray-400 text-xs">
                      {getFormattedDate(post.created_at, post.updated_at)}
                    </p>
                  </div>
                </div>
                {post.is_own_post && (
                  <PostActions
                    postId={post.id}
                    description={post.description}
                    onDelete={() => handleDeletePost(post.id)}
                    onUpdate={(newDescription) => handleUpdatePost(post.id, newDescription)}
                  />
                )}
              </div>

              <p className="mt-2 text-gray-700">{post.description}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLikeClick(post.id, post.is_like_post);
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      post.is_like_post ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                  {post.likes_count} Likes
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  {post.replies_count} Replies
                </div>
              </div>
            </div>
        
          );
        })}
      </div>
    </div>
  );
}