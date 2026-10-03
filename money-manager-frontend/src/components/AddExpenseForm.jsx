import React, { useState } from "react"
import EmojiPickerPopUp from "./EmojiPickerPopUp"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"

const AddExpenseForm = ({ categories, onAddExpense }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  })

  const [loading, setLoading] = useState(false)

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value })
  }

  const handleAddExpense = async () => {
    setLoading(true)
    try {
      await onAddExpense(expense)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <EmojiPickerPopUp
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onchange={({ target }) => handleChange("name", target.value)}
        label="Expense Name"
        placeHolder="e.g., Food, Shopping, Travel"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onchange={({ target }) => handleChange("categoryId", target.value)}
        options={categoryOptions}
        isSelect={true}
      />

      <Input
        value={expense.amount}
        onchange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeHolder="e.g., 500, 1500.75"
        type="number"
      />

      <Input
        value={expense.date}
        onchange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeHolder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleAddExpense}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : ("Add Expense")}
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm