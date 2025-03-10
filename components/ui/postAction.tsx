// components/PostActions.tsx
import { useState } from 'react'
import { MoreVertical, Trash2, Edit } from 'lucide-react'
import { deletePost, updatePost } from '@/lib/handlePost'
import { EditPostDialog } from '@/components/ui/editPostDialog'

type PostActionsProps = {
  postId: number
  description: string
  onDelete: () => void
  onUpdate: (newDescription: string) => void
}

export default function PostActions({
  postId,
  description,
  onDelete,
  onUpdate,
}: PostActionsProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await deletePost(postId)
      onDelete()
      setIsConfirmDeleteVisible(false)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleUpdate = async (newDescription: string) => {
    try {
      await updatePost(postId, newDescription)
      onUpdate(newDescription)
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="relative">
      {/* Tombol MoreVertical untuk membuka popup */}
      <MoreVertical
        className="cursor-pointer"
        onClick={() => setIsPopupVisible(!isPopupVisible)}
      />

      {/* Popup pilihan Edit dan Delete */}
      {isPopupVisible && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setIsEditDialogOpen(true)
                setIsPopupVisible(false)
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => {
                setIsConfirmDeleteVisible(true)
                setIsPopupVisible(false)
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus
            </button>
          </div>
        </div>
      )}

      {/* Popup konfirmasi hapus */}
      {isConfirmDeleteVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg border-gray-400 shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Apakah Anda yakin ingin menghapus post ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsConfirmDeleteVisible(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Edit Post */}
      <EditPostDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        initialDescription={description}
        onSubmit={handleUpdate}
      />
    </div>
  )
}