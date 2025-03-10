// components/ui/EditPostDialog.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type EditPostDialogProps = {
  isOpen: boolean
  onClose: () => void
  initialDescription: string
  onSubmit: (newDescription: string) => void
}

export function EditPostDialog({
  isOpen,
  onClose,
  initialDescription,
  onSubmit,
}: EditPostDialogProps) {
  const [description, setDescription] = useState(initialDescription)

  const handleSubmit = () => {
    onSubmit(description)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Edit"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}