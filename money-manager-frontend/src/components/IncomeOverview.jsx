import React, { useEffect, useState } from 'react'
import { prepareIncomeLineChartData } from '../util/util'
import CustomLineChart from './CustomLineChart'
import { Plus } from 'lucide-react'
import EmptyState from './EmptyState'

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions)
    setChartData(result)
  }, [transactions])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Income Overview
          </h1>
          <p className="page-subtitle">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={onAddIncome}
        >
          <Plus size={16} />
          Add Income
        </button>
      </div>

      <div className="card">
        {chartData.length > 0 ? (
          <div className="py-2">
            <CustomLineChart data={chartData} />
          </div>
        ) : (
          <EmptyState
            title="No income data yet"
            description="Add your first income to see the chart"
          />
        )}
      </div>
    </div>
  )
}

export default IncomeOverview