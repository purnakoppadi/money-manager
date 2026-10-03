import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import CustomLineChart from "./CustomLineChart"
import { prepareExpenseLineChartData } from "../util/util"
import EmptyState from "./EmptyState"

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions)
    setChartData(result)
  }, [transactions])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Expense Overview
          </h1>
          <p className="page-subtitle">
            Track your spending over time and analyze your expense trends.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={onAddExpense}
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      <div className="card">
        {chartData.length > 0 ? (
          <div className="py-2">
            <CustomLineChart data={chartData} />
          </div>
        ) : (
          <EmptyState
            title="No expense data yet"
            description="Add your first expense to see the chart"
          />
        )}
      </div>
    </div>
  )
}

export default ExpenseOverview