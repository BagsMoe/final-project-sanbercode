import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export default function Profile() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 justify-between items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1>Profile</h1>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <div>
          <h2>Email</h2>
          <p>test</p>
        </div>
        <div>
          <h2>Hobby</h2>
          <p>test</p>
        </div>
        <div>
          <h2>Date of Birth</h2>
          <p>test</p>
        </div>
        <div>
          <h2>phone</h2>
          <p>test</p>
        </div>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quia
          fuga voluptate debitis temporibus ducimus nobis id sit optio! Nulla
          enim aspernatur dolor architecto, provident libero iusto. Modi,
          voluptates quia?
        </p>
      </div>
    </div>
  )
}
