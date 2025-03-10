import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getApiUrl } from '@/lib/utils';
import { MessageCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Reply = {
  id: number;
  description: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type ReplyPopupProps = {
  postId: number;
  description: string;
  onClose: () => void;
};

export default function ReplyPopup({ postId, onClose }: ReplyPopupProps) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = Number(Cookies.get('user_id'));

  const fetchReplies = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Silahkan login.');
        setLoading(false);
        return;
      }

      const response = await fetch(getApiUrl(`replies/post/${postId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Gagal mengambil data');

      const data = await response.json();
      setReplies(data.data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Token tidak ditemukan. Silakan login.');
        return;
      }

      const response = await fetch(getApiUrl(`replies/post/${postId}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: newReply }),
      });

      if (!response.ok) throw new Error('Gagal mengirim reply');

      setNewReply('');
      fetchReplies();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus reply ini?')) {
      try {
        const token = Cookies.get('token');
        if (!token) {
          setError('Token tidak ditemukan. Silakan login.');
          return;
        }

        const response = await fetch(getApiUrl(`replies/delete/${replyId}`), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Gagal menghapus reply');

        fetchReplies();
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan');
      }
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [postId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Card>
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">Replies</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmitReply} className="mt-4">
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Tulis reply..."
            required
          />
          <button type="submit" className="my-2 w-full text-sm bg-blue-500 text-white p-1 rounded-lg">
            Kirim
          </button>
        </form>
        <div className="space-y-4 shadow-lg rounded-sm p-2">
          {replies.map((reply) => (
            <div key={reply.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">{reply.user.name}</p>
                {reply.user_id === currentUserId && (
                  <button
                    onClick={() => handleDeleteReply(reply.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-700">{reply.description}</p>
              <p className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
       
      </div>
    </div>
    </Card>
  );
}