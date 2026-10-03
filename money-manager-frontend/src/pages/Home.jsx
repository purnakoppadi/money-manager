import React, { useContext, useEffect, useState, useRef } from "react"
import DashBoard from "../components/DashBoard"
import UseUser from "../hooks/UseUser"
import InfoCard from "../components/InfoCard"
import { Coins, Plus, Wallet, WalletCards, TrendingUp, TrendingDown } from "lucide-react"
import { addThousandsSeparator } from "../util/util"
import axiosConfig from "../util/AxiosConfig"
import API_ENDPOINTS from "../util/apiEndpoints"
import RecentTransactions from "../components/RecentTransactions"
import { useNavigate } from "react-router-dom"
import FinanceOverview from "../components/FinanceOverview"
import Transactions from '../components/Transactions'
import AppContext from "../context/AppContext"

const Home = () => {
  UseUser()

  const { user } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const isFetching = useRef(false)
  const navigate = useNavigate()

  const fetchDashBoardData = async () => {
    if (isFetching.current) return
    isFetching.current = true
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA)
      if (response.status === 200) {
        setDashboardData(response.data)
      }
    } catch (err) {
      console.log("Something went wrong", err)
    } finally {
      isFetching.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashBoardData()
  }, [])

  return (
    <DashBoard activeMenu="Dashboard">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Welcome back, {user?.fullName?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="page-subtitle">
              Here's your financial overview for today.
            </p>
          </div>
          <button
            onClick={() => navigate('/income')}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

        {loading && !dashboardData ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Stat Cards - 3 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards size={20} />}
            label="Total Balance"
            value={dashboardData?.totalBalance || 0}
            color="bg-purple-800"
          />
          <InfoCard
            icon={<TrendingUp size={20} />}
            label="Total Income"
            value={dashboardData?.TotalIncome || 0}
            color="bg-green-600"
          />
          <InfoCard
            icon={<TrendingDown size={20} />}
            label="Total Expenses"
            value={dashboardData?.totalExpenses || 0}
            color="bg-red-600"
          />
        </div>

        {/* Main Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.TotalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />
        </div>

        {/* Secondary Grid for recent separated incomes and expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Transactions
            transactions={dashboardData?.recent5Expenses || []}
            onMore={() => navigate("/expense")}
            type="expense"
            title="Recent Expenses"
          />

          <Transactions
            transactions={dashboardData?.recent5Incomes || []}
            onMore={() => navigate("/income")}
            type="income"
            title="Recent Incomes"
          />
        </div>
        </>
        )}
      </div>
    </DashBoard>
  )
}

export default Home