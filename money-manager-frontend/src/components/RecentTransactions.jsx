import { ArrowRight } from "lucide-react"
import React from "react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"
import EmptyState from "./EmptyState"

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h4 className="card-title">
            Recent Transactions
          </h4>
          <p className="card-subtitle">
            Your latest income and expenses
          </p>
        </div>

        <button
          className="btn btn-ghost"
          onClick={onMore}
        >
          View All
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="mt-2 flex flex-col">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>

      {(!transactions || transactions.length === 0) && (
        <div className="py-8">
          <EmptyState
            title="No transactions yet"
            description="Add your first income or expense to start tracking your finances."
          />
        </div>
      )}
    </div>
  )
}

export default RecentTransactions