import React, { useEffect, useState, useRef } from "react"
import DashBoard from "../components/DashBoard"
import UseUser from "../hooks/UseUser"
import axiosConfig from "../util/AxiosConfig"
import API_ENDPOINTS from "../util/apiEndpoints"
import ExpenseList from "../components/ExpenseList"
import Model from "../components/Model"
import toast from "react-hot-toast"
import AddExpenseForm from "../components/AddExpenseForm"
import DeleteAlert from "../components/DeleteAlert"
import ExpenseOverview from "../components/ExpenseOverview"

const Expense = () => {
  const [expenseData, setExpenseData] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const isFetching = useRef(false)

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const fetchExpenseDetails = async () => {
    if (isFetching.current) return
    isFetching.current = true
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES)
      if (response.status === 200) {
        setExpenseData(response.data)
      }
    } catch (err) {
      console.error("Failed to fetch expense details", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"))
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (err) {
      console.log("Failed to fetch expense categories:", err)
      toast.error(err.response?.data?.message || "Failed to fetch expense categories")
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    fetchExpenseCategories()
  }, [])

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense

    if (!name.trim()) {
      toast.error("Please enter a name")
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than zero")
      return
    }

    if (!date) {
      toast.error("Please select date")
      return
    }

    const today = new Date().toISOString().split("T")[0]
    if (date > today) {
      toast.error("Date cannot be in the future")
      return
    }

    if (!categoryId) {
      toast.error("Please select a category")
      return
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      })

      if (response.status === 201) {
        setOpenAddExpenseModel(false)
        toast.success("Expense added successfully")
        fetchExpenseDetails()
        fetchExpenseCategories()
      }
    } catch (err) {
      console.log("Error adding expense", err)
      toast.error(err.response?.data?.message || "Failed to add expense")
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELTE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense deleted successfully")
      fetchExpenseDetails()
    } catch (err) {
      console.log("Error deleting expense", err)
      toast.error(err.response?.data?.message || "Failed to delete expense")
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: "blob",
      })

      const filename = "expense_details.xlsx"
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success("Expense details downloaded successfully")
    } catch (err) {
      console.log("Error downloading expense Details:", err)
    }
  }

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE)
      if (response.status === 200) {
        toast.success("Expense details emailed successfully")
      }
    } catch (err) {
      console.log("Error emailing expense details:", err)
    }
  }

  UseUser()

  return (
    <DashBoard activeMenu="Expense">
      <div className="space-y-5">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />

            <ExpenseList
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              transactions={expenseData}
              onDownload={handleDownloadExpenseDetails}
              onEmail={handleEmailExpenseDetails}
            />
          </>
        )}

        <Model
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={(expense) => handleAddExpense(expense)}
            categories={categories}
          />
        </Model>

        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record? This action cannot be undone."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashBoard>
  )
}

export default Expense