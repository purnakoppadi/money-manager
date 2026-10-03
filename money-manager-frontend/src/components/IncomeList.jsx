import { Download, LoaderCircle, Mail } from "lucide-react"
import React, { useState } from "react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"
import EmptyState from "./EmptyState"

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)

  const handleEmail = async () => {
    setEmailLoading(true)
    try {
      await onEmail()
    } finally {
      setEmailLoading(false)
    }
  }

  const handleDownload = async () => {
    setDownloadLoading(true)
    try {
      await onDownload()
    } finally {
      setDownloadLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">
          Income Sources
        </h5>

        <div className="flex items-center gap-3">
          <button
            disabled={emailLoading}
            onClick={handleEmail}
            className="btn btn-secondary"
          >
            {emailLoading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Mail size={16} />
            )}
            Email Report
          </button>

          <button
            disabled={downloadLoading}
            onClick={handleDownload}
            className="btn btn-secondary"
          >
            {downloadLoading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Download size={16} />
            )}
            Export Excel
          </button>
        </div>
      </div>

      <div className="mt-5">
        {transactions?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {transactions.map((income) => (
              <TransactionInfoCard
                key={income.id}
                title={income.name}
                icon={income.icon}
                date={moment(income.date).format("DD MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No income sources yet"
            description="Add your first income to start tracking"
          />
        )}
      </div>
    </div>
  )
}

export default IncomeList