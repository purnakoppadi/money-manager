import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'
import EmptyState from './EmptyState'

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <div>
          <h5 className='card-title'>{title}</h5>
        </div>

        <button
          className='btn btn-ghost'
          onClick={onMore}
        >
          View All <ArrowRight size={15} />
        </button>
      </div>

      <div className="mt-2 flex flex-col">
        {transactions?.slice(0, 5)?.map(item => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>

      {(!transactions || transactions.length === 0) && (
        <div className="py-8">
          <EmptyState
            title={`No ${type} transactions`}
            description={`Add ${type} to see them here`}
          />
        </div>
      )}
    </div>
  )
}

export default Transactions