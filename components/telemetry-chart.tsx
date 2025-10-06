"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface TelemetryChartProps {
  title: string
  data: any[]
  dataKey: string
  unit: string
  threshold: number
  color: string
  inverted?: boolean
}

export function TelemetryChart({
  title,
  data,
  dataKey,
  unit,
  threshold,
  color,
  inverted = false,
}: TelemetryChartProps) {
  const chartData = data.map((item) => ({
    name: item.vehicle_id,
    value: item[dataKey],
    isWarning: inverted ? item[dataKey] < threshold : item[dataKey] > threshold,
  }))

  const average = data.length > 0 ? data.reduce((sum, item) => sum + item[dataKey], 0) / data.length : 0

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{average.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">{unit} avg</span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--popover-foreground))",
              }}
              formatter={(value: number) => [`${value.toFixed(2)} ${unit}`, title]}
            />
            <ReferenceLine
              y={threshold}
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
              label={{ value: `Threshold: ${threshold}${unit}`, fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
