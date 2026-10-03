import React, { useEffect, useState } from "react"
import EmojiPickerPopUp from "./EmojiPickerPopUp"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"

const AddIncomeForm = ({ categories, onAddIncome }) => {
  const [income, setIncome] = useState({
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
    setIncome({ ...income, [key]: value })
  }

  const handleAddIncome = async () => {
    setLoading(true)
    try {
      await onAddIncome(income)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [categories, income.categoryId])

  return (
    <div>
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onchange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeHolder="e.g., Salary, Freelance, Bonus"
        type="text"
      />

      <Input
        label="Category"
        value={income.categoryId}
        onchange={({ target }) => handleChange("categoryId", target.value)}
        options={categoryOptions}
        isSelect={true}
      />

      <Input
        value={income.amount}
        onchange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeHolder="e.g., 5000, 1500.75"
        type="number"
      />

      <Input
        value={income.date}
        onchange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeHolder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleAddIncome}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : ("Add Income")}
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm