
import Cookies from 'js-cookie'
import { getApiUrl } from '@/lib/utils'

export const deletePost = async (postId: number) => {
  const token = Cookies.get('token')
  if (!token) throw new Error('Token tidak ditemukan. Silakan login.')

  const response = await fetch(getApiUrl(`post/delete/${postId}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) throw new Error('Gagal menghapus post')

  return response.json()
}

export const updatePost = async (postId: number, description: string) => {
  const token = Cookies.get('token')
  if (!token) throw new Error('Token tidak ditemukan. Silakan login.')

  const response = await fetch(getApiUrl(`post/update/${postId}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description }),
  })

  if (!response.ok) throw new Error('Gagal mengupdate post')

  return response.json()
}