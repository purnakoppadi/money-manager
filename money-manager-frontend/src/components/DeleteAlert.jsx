import { AlertTriangle, LoaderCircle } from "lucide-react"
import React, { useState } from "react"

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await onDelete()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-600">
          <AlertTriangle size={20} />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed pt-1">{content}</p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          disabled={loading}
          onClick={handleDelete}
          type="button"
          className="btn bg-red-600 hover:bg-red-700 text-white"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
