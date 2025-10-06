import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with DynamoDB in production)
let telemetryData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate incoming data
    if (!data.vehicle_id || !data.engine_temp || !data.brake_pressure || !data.battery_voltage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Apply anomaly detection rules
    const anomalies = detectAnomalies(data)
    const enrichedData = {
      ...data,
      anomalies,
      received_at: new Date().toISOString(),
    }

    // Store telemetry (in production, this would go to DynamoDB)
    telemetryData.push(enrichedData)

    // Keep only last 100 readings per vehicle
    telemetryData = telemetryData.slice(-500)

    console.log("[v0] Telemetry received:", enrichedData)

    return NextResponse.json({
      success: true,
      data: enrichedData,
      anomalies,
    })
  } catch (error) {
    console.error("[v0] Error processing telemetry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleId = searchParams.get("vehicle_id")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    let filteredData = telemetryData

    if (vehicleId) {
      filteredData = telemetryData.filter((d) => d.vehicle_id === vehicleId)
    }

    // Get latest readings per vehicle
    const latestReadings = getLatestReadingsPerVehicle(filteredData)

    return NextResponse.json({
      success: true,
      count: latestReadings.length,
      data: latestReadings.slice(-limit),
    })
  } catch (error) {
    console.error("[v0] Error fetching telemetry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function detectAnomalies(data: any): string[] {
  const anomalies: string[] = []

  // Engine temperature threshold
  if (data.engine_temp > 100) {
    anomalies.push("engine_overheating")
  } else if (data.engine_temp > 95) {
    anomalies.push("engine_temp_high")
  }

  // Brake pressure threshold
  if (data.brake_pressure < 60) {
    anomalies.push("brake_pressure_critical")
  } else if (data.brake_pressure < 70) {
    anomalies.push("brake_pressure_low")
  }

  // Battery voltage threshold
  if (data.battery_voltage < 11.8) {
    anomalies.push("battery_critical")
  } else if (data.battery_voltage < 12.0) {
    anomalies.push("battery_weak")
  }

  return anomalies
}

function getLatestReadingsPerVehicle(data: any[]): any[] {
  const vehicleMap = new Map()

  data.forEach((reading) => {
    const existing = vehicleMap.get(reading.vehicle_id)
    if (!existing || new Date(reading.timestamp) > new Date(existing.timestamp)) {
      vehicleMap.set(reading.vehicle_id, reading)
    }
  })

  return Array.from(vehicleMap.values())
}
