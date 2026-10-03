import React from "react"
import { addThousandsSeparator } from "../util/util"
import CustomPieChart from "./CustomPieChart"

const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {

  const COLORS = ["var(--color-primary)", "var(--color-expense)", "var(--color-income)"]

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ]

  return (
    <div className="card">
      <div className="card-header border-b-0 pb-0 mb-0">
        <div>
          <h5 className="card-title">
            Financial Overview
          </h5>
          <p className="card-subtitle">
            Your balance distribution
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2 pb-2">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  )
}

export default FinanceOverview