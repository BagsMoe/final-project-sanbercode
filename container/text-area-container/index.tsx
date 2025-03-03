import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function TextareaContainer() {
  return (
    <div className="grid w-full gap-2 mt-4">
      <Textarea placeholder="What's happening..." />
      <Button className="bg-blue-500">Send message</Button>
    </div>
  )
}
