import { Layers2, Pencil } from "lucide-react"
import React from "react"
import EmptyState from "./EmptyState"

const CategoryList = ({ categories, onEditCategory }) => {
  const incomeCategories = categories.filter(c => c.type === 'income')
  const expenseCategories = categories.filter(c => c.type === 'expense')

  const renderCategoryCard = (category) => (
    <div
      key={category.id}
      className="group flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-all cursor-default"
      style={{ borderColor: 'var(--color-border)', transitionDuration: '150ms' }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
        style={{ backgroundColor: category.type === 'income' ? 'var(--color-income-light)' : 'var(--color-expense-light)' }}
      >
        {category.icon ? (
          <img src={category.icon} alt={category.name} className="h-5 w-5" />
        ) : (
          <Layers2 size={18} style={{ color: category.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)' }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-dark)' }}>
          {category.name}
        </p>
        <p className="text-xs capitalize" style={{ color: 'var(--color-text-muted)' }}>
          {category.type}
        </p>
      </div>

      <button
        onClick={() => onEditCategory(category)}
        className="p-1.5 rounded-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        style={{ color: 'var(--color-text-muted)', transitionDuration: '150ms' }}
        aria-label={`Edit ${category.name}`}
      >
        <Pencil size={14} />
      </button>
    </div>
  )

  const renderSection = (title, items, emptyText) => (
    <div className="mb-6 last:mb-0">
      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
        {title} ({items.length})
      </h4>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(renderCategoryCard)}
        </div>
      ) : (
        <p className="text-sm py-4" style={{ color: 'var(--color-text-muted)' }}>{emptyText}</p>
      )}
    </div>
  )

  return (
    <div className="card">
      {categories.length === 0 ? (
        <EmptyState
          icon={<Layers2 size={32} />}
          title="No categories yet"
          description="Create a category to organize your finances"
        />
      ) : (
        <>
          {renderSection('Income Categories', incomeCategories, 'No income categories yet')}
          {renderSection('Expense Categories', expenseCategories, 'No expense categories yet')}
        </>
      )}
    </div>
  )
}

export default CategoryList
