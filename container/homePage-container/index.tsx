import DisplayAllPosts from '@/container/post-container'
import { PostFormContainer } from '../postForm-container'
export default function HomePageContainer() {
  return (
    <div className="flex p-0 flex-col items-center justify-center h-screen">
      {/* <h1 className="text-4xl font-bold text-blue-500 dark:text-white group cursor-pointer">
                Sanber Daily
            </h1> */}
      <PostFormContainer />
      <DisplayAllPosts />
    </div>
  )
}
