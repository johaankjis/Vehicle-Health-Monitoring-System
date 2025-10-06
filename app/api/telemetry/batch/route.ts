import { type NextRequest, NextResponse } from "next/server"

// Batch endpoint for multiple vehicle readings
export async function POST(request: NextRequest) {
  try {
    const readings = await request.json()

    if (!Array.isArray(readings)) {
      return NextResponse.json({ error: "Expected array of readings" }, { status: 400 })
    }

    const results = []

    for (const reading of readings) {
      // Forward to single telemetry endpoint
      const response = await fetch(`${request.nextUrl.origin}/api/telemetry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reading),
      })

      const result = await response.json()
      results.push(result)
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    })
  } catch (error) {
    console.error("[v0] Error processing batch telemetry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
