import useSWR from 'swr'
import Cookies from 'js-cookie'
import { getApiUrl } from '@/lib/utils'
import { getInitials } from '@/utils/stringUtils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useProfileContext } from '@/context'
import { Card } from '@/components/ui/card'
import { PostFormContainer } from '@/container/postForm-container'
import DisplaySelfPosts from '@/container/selfPost-container'

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

export default function Profile() {
    const User = useProfileContext()
  const { data, isLoading, error } = useSWR<Me>(
    getApiUrl('user/me'),
    fetcher,
    {
      revalidateOnFocus: true,
    },
  )
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
    <Card >
    <div className="flex flex-col items-center justify-center container mt-0 p-2 w-full sticky max-h-screen">
         <Avatar className='mb-2'>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${User?.name}`}
              className='w-10 h-10 border rounded-full'
            />
            <h1 className='font-bold text-center text-sm'>{User?.name?.toUpperCase()}</h1>
            <AvatarFallback>
              {User && getInitials(User.name)}
            </AvatarFallback>
          </Avatar>
      <div className="flex justify-between p-2 w-full gap-2 ">
          
            
            <div className='flex flex-col justify-between items-start'>
              <h3 className="text-sm font-semibold pr-auto text-left">Email</h3>
              <p className="text-sm">{email}</p>
            </div>
            <div className='flex flex-col justify-between items-start'>
              <h3 className="text-sm font-semibold pr-auto text-left">Tanggal Lahir</h3>
              <p className="text-sm">{dob}</p>
            </div>
            <div className='flex flex-col justify-between items-start'>
              <h3 className="text-sm font-semibold pr-auto text-left">Telepon</h3>
              <p className="text-sm">{phone}</p>
            </div>
            <div className='flex flex-col justify-between items-start'>
              <h3 className="text-sm font-semibold pr-auto text-left">Hobi</h3>
              <p className="text-sm">{hobby}</p>
            </div>
      </div>
      <PostFormContainer />
    </div>
    
   
    <div className="overflow-y-auto h-screen">
      <DisplaySelfPosts />
    </div>
    </Card>

  )
}
