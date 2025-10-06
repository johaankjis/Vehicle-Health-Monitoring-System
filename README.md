# Vehicle Health Monitoring System

A cloud-native vehicle monitoring platform that collects, processes, and visualizes real-time telemetry data.

> 📖 **[View the Complete Project Showcase](./SHOWCASE.md)** for a comprehensive overview of features, architecture, and use cases.

## Architecture

\`\`\`
Vehicle Sensor Simulator (Python)
        ↓
REST API / WebSocket
        ↓
Next.js API Routes (Telemetry Ingestion)
        ↓
Anomaly Detection (Rule-based)
        ↓
In-Memory Storage (DynamoDB in production)
        ↓
React Dashboard (Live Visualization)
\`\`\`

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

### 3. Generate Vehicle Data

**Option A: Run the simulator standalone**
\`\`\`bash
python scripts/vehicle-sensor-simulator.py
\`\`\`

**Option B: Send data directly to the API** (requires `requests` library)
\`\`\`bash
pip install requests
python scripts/send-telemetry.py
\`\`\`

The simulator will generate realistic telemetry data and send it to your API every 3 seconds.

### 4. Manual API Testing

You can also send data manually using curl:

\`\`\`bash
curl -X POST http://localhost:3000/api/telemetry/batch \
  -H "Content-Type: application/json" \
  -d '[
    {
      "vehicle_id": "VEH-001",
      "engine_temp": 95.5,
      "brake_pressure": 85.2,
      "battery_voltage": 12.6,
      "timestamp": "2025-01-06T10:30:00Z",
      "status": "healthy"
    }
  ]'
\`\`\`

## Features

### Current MVP
- ✅ Python sensor simulator with realistic data generation
- ✅ REST API for telemetry ingestion
- ✅ Rule-based anomaly detection
- ✅ Batch processing support
- ✅ Real-time dashboard with auto-refresh
- ✅ Fleet overview statistics
- ✅ Individual vehicle health cards
- ✅ Telemetry visualization charts

### Dashboard Features
- **Fleet Overview**: Total vehicles, healthy/warning/critical counts
- **Vehicle Cards**: Individual status cards with component metrics
- **Real-time Updates**: Auto-refresh every 3 seconds
- **Telemetry Charts**: Bar charts showing fleet-wide metrics
- **Alert Indicators**: Visual warnings for anomalies
- **Status Color Coding**: Green (healthy), Yellow (warning), Red (critical)

### Anomaly Detection Rules
- **Engine**: Warning >95°C, Critical >100°C
- **Brakes**: Warning <70 PSI, Critical <60 PSI
- **Battery**: Warning <12.0V, Critical <11.8V

## Tech Stack

- **Simulator**: Python 3.x
- **Backend**: Next.js 15 API Routes, TypeScript
- **Frontend**: React 19, Next.js 15, Tailwind CSS v4
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Cloud** (Production): AWS Lambda, DynamoDB, API Gateway

## Next Steps for Production

1. **Database Integration**: Replace in-memory storage with DynamoDB
2. **AWS Lambda**: Deploy anomaly detection as serverless functions
3. **WebSocket Support**: Add real-time push notifications
4. **Authentication**: Add user authentication and role-based access
5. **Historical Data**: Store and visualize historical trends
6. **CI/CD Pipeline**: Set up GitHub Actions for automated deployment
7. **Alerting**: Email/SMS notifications for critical alerts

## Project Structure

\`\`\`
├── app/
│   ├── api/telemetry/          # API routes for data ingestion
│   ├── page.tsx                # Main dashboard page
│   └── globals.css             # Theme and styling
├── components/
│   ├── vehicle-fleet-dashboard.tsx  # Main dashboard component
│   ├── vehicle-card.tsx             # Individual vehicle card
│   ├── telemetry-chart.tsx          # Chart component
│   └── ui/                          # shadcn/ui components
├── scripts/
│   ├── vehicle-sensor-simulator.py  # Data generator
│   └── send-telemetry.py            # API integration script
└── README.md
\`\`\`

## Design

The dashboard features a dark theme inspired by modern observability platforms:
- **Deep blue-black background** for reduced eye strain
- **Blue primary color** for data visualization and healthy states
- **Orange/coral accents** for warnings and critical alerts
- **Clean, professional layout** optimized for fleet monitoring
- **Responsive design** works on desktop and tablet devices

## Documentation

- **[SHOWCASE.md](./SHOWCASE.md)**: Comprehensive project showcase with features, use cases, and roadmap
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Detailed technical architecture and design decisions
