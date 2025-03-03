import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, LogOut, User, Bell } from 'lucide-react'
import Link from 'next/link'

export default function DropdownContainer() {
  return (
    <div className="flex gap-4 items-center justify-center bg-gray-100 px-4 py-2 rounded-md cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
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
          <DropdownMenuItem className="flex items-center gap-2">
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
