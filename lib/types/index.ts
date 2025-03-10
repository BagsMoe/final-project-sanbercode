type User = {
  id: number
  name: string
  email: string
  dob: string
  phone: string
  hobby: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}
  
  type Posts = {
    id: number
    description: string
    user_id: number
    deleted_at: Date | null
    created_at: Date
    updated_at: Date
    likes_count: number
    replies_count: number
    is_like_post: boolean
    is_own_post: boolean
    user: User
    handleLike: (id: number) => Promise<void>
    handleDislike: (id: number) => Promise<void>
  }
  
  type Replies = {
    id: number
    description: string
    posts_id: number
    users_id: number
    deleted_at: Date | null
    created_at: Date
    updated_at: Date
    is_own_reply: boolean
    user: User
  }
  
  export type { Posts, User, Replies }