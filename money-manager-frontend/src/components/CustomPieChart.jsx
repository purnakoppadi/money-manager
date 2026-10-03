import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg px-3 py-2 shadow-md" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-xs font-medium" style={{ color: 'var(--color-dark)' }}>{payload[0].name}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-primary)' }}>
          ₹{payload[0].value?.toLocaleString('en-IN')}
        </p>
      </div>
    )
  }
  return null
}

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const hasData = data && data.length > 0 && data.some((d) => d.amount > 0)
  const chartData = hasData ? data : [{ name: "No data", amount: 1 }]
  const chartColors = hasData ? colors : ["#e2e8f0"]

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full" style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={85}
              paddingAngle={3}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            {showTextAnchor && (
              <>
                <text
                  x="50%"
                  y="46%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fill: 'var(--color-text-muted)', fontSize: '11px' }}
                >
                  {label}
                </text>

                <text
                  x="50%"
                  y="56%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fill: 'var(--color-dark)', fontSize: '15px', fontWeight: '700' }}
                >
                  ₹{totalAmount}
                </text>
              </>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomPieChart