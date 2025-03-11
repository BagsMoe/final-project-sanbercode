import React from 'react'
import useSWR from 'swr'
import Cookies from 'js-cookie'
import { getApiUrl, getFormattedDate2 } from '@/lib/utils'

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  description: string
  users_id: number
  is_like_post: boolean
  is_own_post: boolean
  user: User
}

interface Notification {
  id: number
  remark: string
  read: boolean
  created_at: string
  user: User
  posts: Post
}


export default function Notifications() {
  const token = Cookies.get('token')
  const { data, error } = useSWR<Notification[]>(
    token ? [`${getApiUrl('notifications')}`, token] : null,
    ([url, token]) => fetcher(url, token as string),
  )
  if (error)
    return <div className="text-red-500">Failed to load notifications</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="w-[480px]">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      <ul>
        {data?.data.map((notification: Notification) => (
          <li key={notification.id} className="p-4 my-2 border-2 rounded-lg">
            <p>
              <strong>{notification.user.name}</strong> {notification.remark}{' '}
              your post.
            </p>
            <p className="text-gray-500 text-sm">
              {getFormattedDate2(notification.created_at)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

