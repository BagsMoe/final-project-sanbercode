import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, LogOut, User, Bell } from 'lucide-react'
import Link from 'next/link'
import { getApiUrl } from '@/lib/utils'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useProfileContext } from '@/context'

export default function DropdownContainer() {
  const router = useRouter()
  const profileUser = useProfileContext()

  const getInitials = (name: string) => {
    if (!name) return ''

    const names = name.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase()

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }

    return initials
  }

  const handleLogout = async () => {
    const response = await fetch(getApiUrl('logout'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    if (response.ok) {
      Cookies.remove('token')
      router.push('/login')
    }
  }

  return (
    <div className="flex gap-4 items-center justify-center bg-gray-100 px-4 py-2 rounded-md cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${profileUser?.name}`}
            />
            <AvatarFallback>
              {profileUser && getInitials(profileUser.name)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="/profile">
              <User />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="/notification">
              <Bell />
              Notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}