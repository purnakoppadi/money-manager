import React, { useState } from "react"
import DashBoard from "../components/DashBoard"
import UseUser from "../hooks/UseUser"
import { LoaderCircle, Search } from "lucide-react"
import axiosConfig from "../util/AxiosConfig"
import API_ENDPOINTS from "../util/apiEndpoints"
import moment from "moment"
import TransactionInfoCard from "../components/TransactionInfoCard"
import EmptyState from "../components/EmptyState"

const Filter = () => {
  UseUser()

  const [type, setType] = useState("income")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [keyword, setKeyword] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axiosConfig.post(
        API_ENDPOINTS.APPLY_FILTERS,
        { type, startDate, endDate, sortField, sortOrder, keyword }
      )
      setTransactions(response.data)
      setHasSearched(true)
    } catch (err) {
      console.error("Failed to fetch transactions", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashBoard activeMenu="Filters">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Filter Transactions
            </h1>
            <p className="page-subtitle">
              Search and filter your income and expense records.
            </p>
          </div>
        </div>

        {/* Filter Card */}
        <div className="card">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Type */}
            <div className="input-group">
              <label className="input-label" htmlFor="type">Transaction Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="type"
                className="input-field"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="input-group">
              <label htmlFor="startdate" className="input-label">Start Date</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="startdate"
                type="date"
                className="input-field"
              />
            </div>

            {/* End Date */}
            <div className="input-group">
              <label htmlFor="enddate" className="input-label">End Date</label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="enddate"
                type="date"
                className="input-field"
              />
            </div>

            {/* Sort Field */}
            <div className="input-group">
              <label htmlFor="sortfield" className="input-label">Sort By</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                id="sortfield"
                className="input-field"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="input-group">
              <label htmlFor="sortorder" className="input-label">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                id="sortorder"
                className="input-field"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Keyword + Search */}
            <div className="input-group">
              <label htmlFor="keyword" className="input-label">Keyword Search</label>
              <div className="flex items-center gap-2">
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  id="keyword"
                  type="text"
                  className="input-field"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-icon"
                  aria-label="Search"
                >
                  {loading ? (
                    <LoaderCircle size={20} className="animate-spin" />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">
              Search Results
              {hasSearched && !loading && (
                <span className="ml-2 text-sm font-semibold px-2.5 py-1 rounded-md bg-slate-100" style={{ color: 'var(--color-text-muted)' }}>
                  {transactions.length} result{transactions.length !== 1 ? 's' : ''}
                </span>
              )}
            </h5>
          </div>

          <div className="mt-5 flex flex-col gap-1">
            {!hasSearched && !loading && (
              <EmptyState
                icon={<Search size={24} />}
                title="Ready to search"
                description="Select the filters above and click search to find transactions."
              />
            )}

            {loading && (
              <div className="flex items-center justify-center py-12 gap-3" style={{ color: 'var(--color-text-muted)' }}>
                <LoaderCircle size={24} className="animate-spin" />
                <span className="text-base font-medium">Loading transactions...</span>
              </div>
            )}

            {hasSearched && !loading && transactions.length === 0 && (
              <EmptyState
                icon={<Search size={24} />}
                title="No transactions found"
                description="Try adjusting your filters to find what you're looking for."
              />
            )}

            {!loading && transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                amount={transaction.amount}
                icon={transaction.icon}
                date={moment(transaction.date).format("DD MMM YYYY")}
                type={type}
                hideDeleteBtn
              />
            ))}
          </div>
        </div>
      </div>
    </DashBoard>
  )
}

export default Filter