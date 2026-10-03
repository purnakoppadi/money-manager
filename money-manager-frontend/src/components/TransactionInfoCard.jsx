import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from 'lucide-react'
import React from 'react'
import { addThousandsSeparator } from '../util/util'

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {

  const isIncome = type === 'income'

  return (
    <div className='group relative flex items-center gap-4 py-3 px-2 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 transition-colors' style={{ transitionDuration: '150ms' }}>
      <div
        className="w-11 h-11 flex items-center justify-center text-lg rounded-xl flex-shrink-0 shadow-sm"
        style={{ backgroundColor: isIncome ? 'var(--color-income-light)' : 'var(--color-expense-light)' }}
      >
        {icon ? (
          <img src={icon} alt={title} className='w-5 h-5' />
        ) : (
          <UtensilsCrossed size={18} style={{ color: isIncome ? 'var(--color-income)' : 'var(--color-expense)' }} />
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <p className='text-sm font-semibold truncate' style={{ color: 'var(--color-dark)' }}>{title}</p>
        <p className='text-[13px] mt-0.5' style={{ color: 'var(--color-text-muted)' }}>{date}</p>
      </div>

      <div className='flex items-center gap-3 flex-shrink-0'>
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className='p-1.5 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer'
            style={{ color: 'var(--color-expense)', transitionDuration: '150ms' }}
            aria-label="Delete transaction"
          >
            <Trash2 size={16} />
          </button>
        )}

        <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm border' style={{ 
          backgroundColor: isIncome ? 'var(--color-income-light)' : 'var(--color-expense-light)',
          borderColor: isIncome ? '#bbf7d0' : '#fecaca' 
        }}>
          {isIncome ? (
            <TrendingUp size={14} style={{ color: 'var(--color-income)' }} />
          ) : (
            <TrendingDown size={14} style={{ color: 'var(--color-expense)' }} />
          )}
          <span className='text-[13px] font-bold' style={{ color: isIncome ? 'var(--color-income)' : 'var(--color-expense)' }}>
            {isIncome ? '+' : '-'} ₹{addThousandsSeparator(amount)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard