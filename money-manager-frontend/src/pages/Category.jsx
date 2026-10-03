import React, { useEffect, useState, useRef } from "react"
import DashBoard from "../components/DashBoard"
import UseUser from "../hooks/UseUser"
import { Plus } from "lucide-react"
import CategoryList from "../components/CategoryList"
import axiosConfig from "../util/AxiosConfig"
import API_ENDPOINTS from "../util/apiEndpoints"
import toast from "react-hot-toast"
import Model from "../components/Model"
import AddCategoryForm from "../components/AddCategoryForm"

const Category = () => {
  UseUser()

  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState([])
  const [openAddCategoryModel, setOpenAddCategoryModal] = useState(false)
  const [openEditegoryModel, setOpenEditCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const isFetching = useRef(false)

  const fetchCategoryDetails = async () => {
    if (isFetching.current) return
    isFetching.current = true
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES)
      if (response.status === 200) {
        setCategoryData(response.data)
      }
    } catch (err) {
      console.error("Something went wrong. Please try again.", err)
      toast.error(err.message)
    } finally {
      isFetching.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryDetails()
  }, [])

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category

    if (!name.trim()) {
      toast.error("Category Name is required")
      return
    }

    const isDuplicate = categoryData.some((cat) => {
      return cat.name.toLowerCase() === name.trim().toLowerCase()
    })

    if (isDuplicate) {
      toast.error("Category name already exists")
      return
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORIES, { name, type, icon })
      if (response.status === 201) {
        toast.success("Category added successfully")
        setOpenAddCategoryModal(false)
        fetchCategoryDetails()
      }
    } catch (err) {
      console.error("Error adding category", err)
      toast.error(err.response?.data?.message || "Failed to add category.")
    }
  }

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit)
    setOpenEditCategoryModal(true)
  }

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory
    if (!name.trim()) {
      toast.error("Category Name is required")
      return
    }

    if (!id) {
      console.log("Category ID is missing for update")
      return
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon })
      setOpenEditCategoryModal(false)
      setSelectedCategory(null)
      toast.success("Category updated successfully")
      fetchCategoryDetails()
    } catch (err) {
      console.error("Error updating category:", err.response?.data?.message || "Failed to update category")
      toast.error(err.response?.data?.message || "Failed to update category")
    }
  }

  return (
    <DashBoard activeMenu="Category">
      <div className="space-y-5">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Categories</h1>
            <p className="page-subtitle">
              Manage your income and expense categories
            </p>
          </div>
          <button
            onClick={() => setOpenAddCategoryModal(!openAddCategoryModel)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />
        )}

        <Model title="Add Category" isOpen={openAddCategoryModel} onClose={() => setOpenAddCategoryModal(false)}>
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Model>

        <Model
          onClose={() => {
            setOpenEditCategoryModal(false)
            setSelectedCategory(null)
          }}
          isOpen={openEditegoryModel}
          title="Update Category"
        >
          <AddCategoryForm initialCategoryData={selectedCategory} onAddCategory={handleUpdateCategory} isEditing={true} />
        </Model>
      </div>
    </DashBoard>
  )
}

export default Category
