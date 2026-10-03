import EmojiPicker from "emoji-picker-react"
import React, { useState } from "react"
import { Image, X } from "lucide-react"

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isopen, setIsOpen] = useState(false)

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "")
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-5">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div
          className="w-11 h-11 flex items-center justify-center rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--color-primary-50)' }}
        >
          {icon ? (
            <img src={icon} alt="Icon" className="w-6 h-6" />
          ) : (
            <Image size={18} style={{ color: 'var(--color-primary)' }} />
          )}
        </div>
        <span className="text-xs font-medium group-hover:underline" style={{ color: 'var(--color-primary)' }}>
          {icon ? "Change icon" : "Pick Icon"}
        </span>

        {isopen && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              className="w-6 h-6 flex items-center justify-center bg-white border rounded-full absolute -top-2 -right-2 z-10 cursor-pointer shadow-sm hover:bg-gray-50"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <X size={12} />
            </button>

            <EmojiPicker
              open={isopen}
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EmojiPickerPopUp
