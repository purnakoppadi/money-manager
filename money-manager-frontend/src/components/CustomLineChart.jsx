import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg px-3 py-2 shadow-md" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-dark)' }}>{label}</p>
        <p className="text-xs" style={{ color: 'var(--color-primary)' }}>
          ₹{payload[0].value?.toLocaleString('en-IN')}
        </p>
      </div>
    )
  }
  return null
}

const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center rounded-xl bg-gray-50/50">
        <p className="text-sm text-gray-400 font-medium">No chart data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 15, left: 5, bottom: 5 }}
        >
          <CartesianGrid vertical={false} stroke="var(--color-border-light)" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            width={50}
          />

          <Tooltip content={<CustomTooltip />} />

          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="none"
            fill="url(#areaGradient)"
          />

          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-primary)', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart