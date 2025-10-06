"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VehicleCard } from "@/components/vehicle-card"
import { TelemetryChart } from "@/components/telemetry-chart"
import { RefreshCw, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

interface VehicleData {
  vehicle_id: string
  engine_temp: number
  brake_pressure: number
  battery_voltage: number
  timestamp: string
  status: string
  anomalies?: string[]
}

export function VehicleFleetDashboard() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchVehicleData = async () => {
    try {
      const response = await fetch("/api/telemetry")
      const result = await response.json()

      if (result.success && result.data) {
        setVehicles(result.data)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error("[v0] Error fetching vehicle data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicleData()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchVehicleData()
    }, 3000) // Refresh every 3 seconds

    return () => clearInterval(interval)
  }, [autoRefresh])

  const healthyCount = vehicles.filter((v) => v.status === "healthy").length
  const warningCount = vehicles.filter((v) => v.status === "warning").length
  const criticalCount = vehicles.filter((v) => v.status === "critical").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Vehicle Health Monitoring</h1>
              <p className="text-sm text-muted-foreground">Real-time fleet telemetry and diagnostics</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last updated</p>
                <p className="text-sm font-mono text-foreground">{lastUpdate.toLocaleTimeString()}</p>
              </div>

              <Button variant="outline" size="sm" onClick={() => fetchVehicleData()} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Fleet Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{vehicles.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active in fleet</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Healthy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{healthyCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Operating normally</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{warningCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                Critical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{criticalCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Immediate action needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Cards Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Fleet Status</h2>
          {loading && vehicles.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading vehicle data...</p>
              </CardContent>
            </Card>
          ) : vehicles.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-2">No vehicle data available</p>
                <p className="text-sm text-muted-foreground">Run the Python simulator to generate telemetry data</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>

        {/* Telemetry Charts */}
        {vehicles.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Telemetry Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <TelemetryChart
                title="Engine Temperature"
                data={vehicles}
                dataKey="engine_temp"
                unit="°C"
                threshold={100}
                color="hsl(var(--chart-1))"
              />
              <TelemetryChart
                title="Brake Pressure"
                data={vehicles}
                dataKey="brake_pressure"
                unit="PSI"
                threshold={60}
                color="hsl(var(--chart-2))"
                inverted
              />
              <TelemetryChart
                title="Battery Voltage"
                data={vehicles}
                dataKey="battery_voltage"
                unit="V"
                threshold={11.8}
                color="hsl(var(--chart-3))"
                inverted
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
