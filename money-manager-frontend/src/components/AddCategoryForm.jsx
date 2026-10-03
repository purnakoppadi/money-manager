import React, { useEffect, useState } from "react"
import Input from "./Input"
import EmojiPickerPopUp from "./EmojiPickerPopUp"
import { LoaderCircle } from "lucide-react"

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  })

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData)
    } else {
      setCategory({ name: "", type: "income", icon: "" })
    }
  }, [isEditing, initialCategoryData])

  const [loading, setLoading] = useState(false)

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ]

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onAddCategory(category)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <EmojiPickerPopUp
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onchange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeHolder="e.g., Freelance, Salary, Groceries"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onchange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          disabled={loading}
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </>
          ) : (
            isEditing ? "Update Category" : "Add Category"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddCategoryForm
