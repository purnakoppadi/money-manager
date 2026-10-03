import React from 'react'
import { FileText } from 'lucide-react'

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        {icon || <FileText size={24} />}
      </div>
      <p className="text-base font-bold text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-500 max-w-[250px] mb-4">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  )
}

export default EmptyState
