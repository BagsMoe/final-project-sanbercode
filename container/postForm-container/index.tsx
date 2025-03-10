import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getApiUrl } from "@/lib/utils"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { mutate } from "swr"

export function PostFormContainer() {
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{
    errors: { [key: string]: string }
  } | null>(null)
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const token = Cookies.get('token')
    if (!token) {
      setError({ errors: { general: 'Unauthorized. Please log in first.' } })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(getApiUrl('post'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        let errorMessage = { errors: { general: 'Unknown error occurred' } }

        try {
          const data = await response.json()
          errorMessage = data
          alert('Failed to create post')
        } catch (err: any) {
          setError(err)
        }

        setError(errorMessage)
        return
      }

      alert('Successfully created post')
      setDescription('') // Clear the textarea after successful submission
      mutate('post') // Trigger SWR to re-fetch the latest posts
      router.push('/')
    } catch (error: any) {
      setError(error.message || 'Unknown error occurred')  
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid w-full gap-2 mt-4">
      <Textarea 
        placeholder="What's happening..." 
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      {error?.errors?.description && (
        <small className="text-red-500">{error.errors.description}</small>
      )}
      <Button 
        className="bg-blue-500"
        disabled={isLoading || !description.trim()} // Disable button if description is empty
      > 
        {isLoading ? 'Loading...' : 'Send Message'}
      </Button>
    </form>
  )
}