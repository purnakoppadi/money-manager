import React from "react"
import { addThousandsSeparator } from "../util/util"

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="card card-hover flex items-center gap-5">
      <div
        className={`w-12 h-12 shrink-0 flex items-center justify-center text-white rounded-xl shadow-sm ${color || 'bg-purple-600'}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-[13px] font-semibold tracking-wide uppercase mb-1" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </p>
        <span className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--color-dark)' }}>
          ₹{addThousandsSeparator(value)}
        </span>
      </div>
    </div>
  )
}

export default InfoCard