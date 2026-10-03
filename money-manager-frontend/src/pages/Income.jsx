import React, { useEffect, useState, useRef } from "react"
import DashBoard from "../components/DashBoard"
import UseUser from "../hooks/UseUser"
import axiosConfig from "../util/AxiosConfig"
import API_ENDPOINTS from "../util/apiEndpoints"
import IncomeList from "../components/IncomeList"
import Model from "../components/Model"
import toast from "react-hot-toast"
import AddIncomeForm from "../components/AddIncomeForm"
import DeleteAlert from "../components/DeleteAlert"
import IncomeOverview from "../components/IncomeOverview"

const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const isFetching = useRef(false)

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const fetchIncomeDetails = async () => {
    if (isFetching.current) return
    isFetching.current = true
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES)
      if (response.status === 200) {
        setIncomeData(response.data)
      }
    } catch (err) {
      console.error("Failed to fetch income details", err)
    } finally {
      isFetching.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
    fetchIncomeCategories()
  }, [])

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"))
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (err) {
      console.log("Failed to fetch income categories:", err)
      toast.error(err.data?.message || "Failed to fetch income categories")
    }
  }

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income

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

    const today = new Date().toISOString().split('T')[0]
    if (date > today) {
      toast.error("Date cannot be in the future")
      return
    }

    if (!categoryId) {
      toast.error("Please select a category")
      return
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      })

      if (response.status === 201) {
        setOpenAddIncomeModel(false)
        toast.success("Income added successfully")
        fetchIncomeDetails()
        fetchIncomeCategories()
      }
    } catch (err) {
      console.log("Error adding income", err)
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELTE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income deleted successfully")
      fetchIncomeDetails()
    } catch (err) {
      console.log("Error deleting income", err)
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: 'blob' })
      let filename = "income_details.xlsx"
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success("Income details downloaded successfully")
    } catch (err) {
      console.log("Error downloading income Details:", err)
    }
  }

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME)
      if (response.status === 200) {
        toast.success("Income details emailed successfully")
      }
    } catch (err) {
      console.log("Error emailing income details:", err)
    }
  }

  UseUser()

  return (
    <DashBoard activeMenu="Income">
      <div className="space-y-5">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />

            <IncomeList
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              transactions={incomeData}
              onDownload={handleDownloadIncomeDetails}
              onEmail={handleEmailIncomeDetails}
            />
          </>
        )}

        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm
            onAddIncome={(income) => handleAddIncome(income)}
            categories={categories}
          />
        </Model>

        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record? This action cannot be undone."
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashBoard>
  )
}

export default Income
