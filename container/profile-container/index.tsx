import useSWR from 'swr'
import Cookies from 'js-cookie'
import { getApiUrl } from '@/lib/utils'
import { getInitials } from '@/utils/stringUtils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useProfileContext } from '@/context'
import { Card } from '@/components/ui/card'
import { PostFormContainer } from '../postForm-container'
import DisplaySelfPosts from '../selfPost-container'

type UserProfile = {
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

type Me = {
  success: boolean
  message: string
  data: UserProfile
}

const fetcher = async (url: string) => {
  const token = Cookies.get('token')
  if (!token) {
    throw new Error('Unauthorized')
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  return response.json()
}

export default function ProfileContainer() {
  const User = useProfileContext()
  const { data, isLoading, error } = useSWR<Me>(getApiUrl('user/me'), fetcher, {
    revalidateOnFocus: true,
  })
  console.log(data)
  if (isLoading) {
    return <div>Loading....</div>
  }
  if (error) {
    return <div>Error...</div>
  }
  if (!data?.data) {
    return <div>No user data found</div>
  }

  const { email, dob, phone, hobby } = data.data

  return (
    <Card>
      <div className="flex flex-col items-center justify-center container mx-auto p-4 w-full">
        <Avatar className="mb-4">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${User?.name}`}
            className="w-20 h-20 border rounded-full"
          />
          <h1 className="font-bold text-center text-xl">
            {User?.name?.toUpperCase()}
          </h1>
          <AvatarFallback>{User && getInitials(User.name)}</AvatarFallback>
        </Avatar>
        <div className="flex p-6 w-auto gap-2 ">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold pr-5">Email</h3>
            <p className="text-sm">{email}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold pr-5">Tanggal Lahir</h3>
            <p className="text-sm">{dob}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold pr-5">Telepon</h3>
            <p className="text-sm">{phone}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold pr-5">Hobi</h3>
            <p className="text-sm">{hobby}</p>
          </div>
        </div>
      </div>
      <PostFormContainer />
      <DisplaySelfPosts />
    </Card>
  )
}
