
export const BASE_URL=import.meta.env.VITE_BASE_URL;
const CLOUDINARY_CLOUD_NAME=import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,

  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORIES: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,

  GET_ALL_INCOMES: "/incomes",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_INCOME: "/incomes",
  DELTE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
  EMAIL_INCOME: "/email/income",

  GET_ALL_EXPENSES: "/expenses",
  ADD_EXPENSE: "/expenses",
  DELTE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
  EMAIL_EXPENSE: "/email/expense",

  APPLY_FILTERS:"/filter",
  DASHBOARD_DATA:"/dashboard"
};

export default API_ENDPOINTS;