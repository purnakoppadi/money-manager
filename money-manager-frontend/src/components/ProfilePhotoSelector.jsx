import { Camera, Trash, User } from "lucide-react"
import React, { useRef, useState } from "react"

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = (e) => {
    e.preventDefault()
    setImage(null)
    setPreviewUrl(null)
  }

  const onChooseFile = (e) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className="flex justify-center mb-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative">
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          >
            <User size={30} style={{ color: 'var(--color-primary)' }} />
          </div>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={onChooseFile}
            aria-label="Upload photo"
          >
            <Camera size={12} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile photo"
            className="w-20 h-20 rounded-full object-cover ring-2 ring-offset-2"
            style={{ ringColor: 'var(--color-primary-200)' }}
          />
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white cursor-pointer"
            style={{ backgroundColor: 'var(--color-expense)' }}
            onClick={handleRemoveImage}
            aria-label="Remove photo"
          >
            <Trash size={12} className="text-white" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector