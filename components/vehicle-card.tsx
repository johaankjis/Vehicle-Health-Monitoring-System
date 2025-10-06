import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, XCircle, Gauge, Disc, Battery } from "lucide-react"

interface VehicleData {
  vehicle_id: string
  engine_temp: number
  brake_pressure: number
  battery_voltage: number
  timestamp: string
  status: string
  anomalies?: string[]
}

interface VehicleCardProps {
  vehicle: VehicleData
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const statusConfig = {
    healthy: {
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      label: "Healthy",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      label: "Warning",
    },
    critical: {
      icon: XCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      label: "Critical",
    },
  }

  const config = statusConfig[vehicle.status as keyof typeof statusConfig] || statusConfig.healthy
  const StatusIcon = config.icon

  const getMetricStatus = (value: number, threshold: number, inverted = false) => {
    const isWarning = inverted ? value < threshold : value > threshold
    return isWarning ? "text-destructive" : "text-foreground"
  }

  return (
    <Card className={`bg-card border-2 ${config.borderColor} hover:border-primary/50 transition-colors`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-foreground">{vehicle.vehicle_id}</CardTitle>
          <Badge variant="outline" className={`${config.bgColor} ${config.color} border-0`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground font-mono">{new Date(vehicle.timestamp).toLocaleString()}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Engine Temperature */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-chart-1/20">
              <Gauge className="h-4 w-4 text-chart-1" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Engine Temp</p>
              <p className={`text-lg font-bold ${getMetricStatus(vehicle.engine_temp, 100)}`}>
                {vehicle.engine_temp.toFixed(1)}°C
              </p>
            </div>
          </div>
          {vehicle.engine_temp > 100 && <AlertTriangle className="h-4 w-4 text-destructive" />}
        </div>

        {/* Brake Pressure */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-chart-2/20">
              <Disc className="h-4 w-4 text-chart-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Brake Pressure</p>
              <p className={`text-lg font-bold ${getMetricStatus(vehicle.brake_pressure, 60, true)}`}>
                {vehicle.brake_pressure.toFixed(1)} PSI
              </p>
            </div>
          </div>
          {vehicle.brake_pressure < 60 && <AlertTriangle className="h-4 w-4 text-destructive" />}
        </div>

        {/* Battery Voltage */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-chart-3/20">
              <Battery className="h-4 w-4 text-chart-3" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Battery Voltage</p>
              <p className={`text-lg font-bold ${getMetricStatus(vehicle.battery_voltage, 11.8, true)}`}>
                {vehicle.battery_voltage.toFixed(2)}V
              </p>
            </div>
          </div>
          {vehicle.battery_voltage < 11.8 && <AlertTriangle className="h-4 w-4 text-destructive" />}
        </div>

        {/* Anomalies */}
        {vehicle.anomalies && vehicle.anomalies.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Active Alerts:</p>
            <div className="flex flex-wrap gap-1">
              {vehicle.anomalies.map((anomaly, idx) => (
                <Badge key={idx} variant="destructive" className="text-xs">
                  {anomaly.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
