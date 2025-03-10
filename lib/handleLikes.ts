import { getApiUrl } from './utils'
import Cookies from 'js-cookie'

export const handleLike = async (postId: number) => {
  try {
    const token = Cookies.get('token')
    if (!token) {
      throw new Error('Silakan login.')
    }

    const response = await fetch(getApiUrl(`post/like/${postId}`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Gagal melakukan like/unlike')

    // Mengembalikan status like/unlike yang baru
    return { success: true, postId }
  } catch (err: any) {
    throw new Error(err.message || 'Terjadi kesalahan')
  }
}

// services/likeHandler.ts

export const likePost = async (postId: number) => {
  try {
    const token = Cookies.get('token')
    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login.')
    }

    const response = await fetch(getApiUrl(`likes/post/${postId}`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Gagal melakukan like')

    return { success: true, postId }
  } catch (err: any) {
    throw new Error(err.message || 'Terjadi kesalahan')
  }
}

export const unlikePost = async (postId: number) => {
  try {
    const token = Cookies.get('token')
    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login.')
    }

    const response = await fetch(getApiUrl(`unlikes/post/${postId}`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Gagal melakukan unlike')

    return { success: true, postId }
  } catch (err: any) {
    throw new Error(err.message || 'Terjadi kesalahan')
  }
}
