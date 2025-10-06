# 🚗 Vehicle Health Monitoring System - Project Showcase

<div align="center">

**A Production-Ready, Cloud-Native IoT Platform for Real-Time Vehicle Fleet Management**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](#quick-start) • [Features](#-key-features) • [Architecture](#-architecture) • [Documentation](./ARCHITECTURE.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Live Demo](#-live-demo)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Project Highlights](#-project-highlights)
- [Use Cases](#-use-cases)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Dashboard Features](#-dashboard-features)
- [Anomaly Detection](#-anomaly-detection)
- [Production Roadmap](#-production-roadmap)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🎯 Overview

The **Vehicle Health Monitoring System** is a full-stack, cloud-native platform designed to collect, process, and visualize real-time telemetry data from vehicle fleets. Built with modern technologies and industry best practices, this system demonstrates end-to-end IoT data pipeline implementation from sensor simulation to real-time dashboard visualization.

### What Makes This Project Special?

- 🔄 **Real-Time Monitoring**: Live telemetry updates every 3 seconds
- 🤖 **Intelligent Anomaly Detection**: Rule-based alerts for critical vehicle conditions
- 📊 **Beautiful Visualizations**: Professional dashboard with charts and metrics
- 🏗️ **Production-Ready Architecture**: Scalable design ready for AWS deployment
- 🎨 **Modern UI/UX**: Dark theme, responsive design, smooth animations
- 🔌 **API-First Design**: RESTful endpoints with batch processing support
- 🐍 **Complete Simulator**: Python-based realistic vehicle data generator

---

## ✨ Key Features

### Current Implementation (MVP)

#### 🚀 Backend & API
- ✅ **REST API** with Next.js 15 API Routes
- ✅ **Telemetry Ingestion** - Single and batch endpoints
- ✅ **Real-Time Processing** - Immediate anomaly detection
- ✅ **Data Validation** - Field-level validation for all inputs
- ✅ **In-Memory Storage** - Fast prototype storage (DynamoDB-ready)
- ✅ **Error Handling** - Comprehensive error responses

#### 🎨 Frontend & Visualization
- ✅ **Fleet Dashboard** - Overview of all vehicles at a glance
- ✅ **Vehicle Cards** - Individual health status for each vehicle
- ✅ **Telemetry Charts** - Bar charts showing engine temp, brake pressure, battery voltage
- ✅ **Auto-Refresh** - Configurable automatic data refresh
- ✅ **Status Indicators** - Color-coded health states (Healthy/Warning/Critical)
- ✅ **Responsive Design** - Works seamlessly on desktop and tablets
- ✅ **Loading States** - Smooth loading animations and transitions

#### 🔬 Data Generation & Simulation
- ✅ **Vehicle Sensor Simulator** - Realistic telemetry generation
- ✅ **Multi-Vehicle Fleet** - Simulate up to N vehicles simultaneously
- ✅ **Degradation Modeling** - Some vehicles gradually degrade over time
- ✅ **API Integration** - Direct sending to API endpoints
- ✅ **Configurable Intervals** - Adjustable update frequency

#### 🚨 Monitoring & Alerts
- ✅ **Anomaly Detection Rules**:
  - Engine: Warning >95°C, Critical >100°C
  - Brakes: Warning <70 PSI, Critical <60 PSI
  - Battery: Warning <12.0V, Critical <11.8V
- ✅ **Visual Alerts** - Alert badges on vehicle cards
- ✅ **Fleet Statistics** - Real-time counts of healthy/warning/critical vehicles

---

## 🎬 Live Demo

### Running the Demo

```bash
# Terminal 1: Start the Next.js server
npm run dev

# Terminal 2: Run the vehicle simulator
pip install requests
python scripts/send-telemetry.py
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard come alive with real-time data!

### What You'll See

1. **Fleet Overview Cards**: Total vehicles, healthy count, warnings, and critical alerts
2. **Live Vehicle Grid**: Individual cards showing each vehicle's health metrics
3. **Real-Time Charts**: Bar charts visualizing engine temperature, brake pressure, and battery voltage
4. **Auto-Refresh**: Dashboard updates every 3 seconds with new data
5. **Status Colors**: 
   - 🟢 **Green**: Healthy vehicle
   - 🟡 **Yellow**: Warning - requires attention
   - 🔴 **Red**: Critical - immediate action needed

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Vehicle Health Monitoring System              │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐          ┌──────────────────┐
│  Python Sensor   │          │   Fleet Manager  │
│   Simulator      │──────────▶     (5 vehicles) │
│                  │          │                  │
└──────────────────┘          └──────────────────┘
                                       │
                                       │ JSON over HTTP
                                       ▼
                              ┌──────────────────┐
                              │   REST API       │
                              │ /api/telemetry   │
                              │ /api/telemetry/  │
                              │      batch       │
                              └──────────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
           ┌────────────┐    ┌─────────────┐   ┌─────────────┐
           │ Validation │    │  Anomaly    │   │  Storage    │
           │            │    │  Detection  │   │ (In-Memory) │
           └────────────┘    └─────────────┘   └─────────────┘
                                       │
                                       │ REST API
                                       ▼
                              ┌──────────────────┐
                              │  React Dashboard │
                              │   - Fleet Stats  │
                              │   - Vehicle Grid │
                              │   - Charts       │
                              └──────────────────┘
```

### Data Flow Pipeline

```
Sensor Data → Validation → Anomaly Detection → Enrichment → Storage → API → Dashboard
```

1. **Generation**: Python simulator creates realistic vehicle telemetry
2. **Ingestion**: HTTP POST to `/api/telemetry/batch` endpoint
3. **Validation**: Required fields checked, data types verified
4. **Processing**: Anomaly detection rules applied to each reading
5. **Storage**: Enriched data stored in-memory (DynamoDB in production)
6. **Delivery**: Dashboard polls `/api/telemetry` every 3 seconds
7. **Visualization**: React components render real-time updates

---

## 🛠️ Technology Stack

### Backend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | Full-stack framework with API routes | 15.2.4 |
| **TypeScript** | Type-safe development | 5.x |
| **Node.js** | Runtime environment | 20+ |

### Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 19 |
| **Tailwind CSS** | Styling framework | 4.1.9 |
| **shadcn/ui** | Component library (Radix UI primitives) | Latest |
| **Recharts** | Chart visualization | Latest |
| **Lucide React** | Icon library | 0.454.0 |

### Data & Simulation
| Technology | Purpose | Version |
|------------|---------|---------|
| **Python** | Sensor simulator | 3.x |
| **requests** | HTTP client for API calls | Latest |

### Production Stack (Planned)
| Technology | Purpose |
|------------|---------|
| **AWS Lambda** | Serverless compute |
| **DynamoDB** | NoSQL database |
| **API Gateway** | API management |
| **CloudWatch** | Logging & monitoring |
| **SNS/SES** | Alerting system |

---

## 🌟 Project Highlights

### 1. **Production-Grade Code Quality**
- ✅ TypeScript for type safety
- ✅ Modular component architecture
- ✅ Clear separation of concerns
- ✅ Comprehensive error handling
- ✅ Clean, documented code

### 2. **Scalable Architecture**
- ✅ Stateless API design
- ✅ Batch processing support
- ✅ Optimized data structures
- ✅ Ready for horizontal scaling
- ✅ DynamoDB migration path defined

### 3. **Developer Experience**
- ✅ Fast development server with hot reload
- ✅ Clear project structure
- ✅ Detailed documentation (ARCHITECTURE.md)
- ✅ Easy setup and deployment
- ✅ Python simulator for testing

### 4. **Modern UI/UX**
- ✅ Dark theme for reduced eye strain
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Professional aesthetics
- ✅ Intuitive navigation

### 5. **IoT Best Practices**
- ✅ Time-series data handling
- ✅ Real-time processing
- ✅ Anomaly detection
- ✅ Batch operations
- ✅ Data enrichment

---

## 💼 Use Cases

### Current Implementation
1. **Fleet Management**: Monitor health of vehicle fleets in real-time
2. **Predictive Maintenance**: Detect issues before they become critical
3. **Operations Dashboard**: Central monitoring for fleet operators
4. **Demo/Prototype**: Showcase IoT monitoring capabilities

### Potential Extensions
1. **Logistics Companies**: Track delivery vehicle health
2. **Public Transportation**: Monitor buses, trains, trams
3. **Car Rental Services**: Ensure fleet readiness
4. **Construction Equipment**: Monitor heavy machinery
5. **Emergency Services**: Track ambulance, fire truck status
6. **Ride-Sharing Platforms**: Monitor driver vehicle health

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- Python 3.x
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Vehicle-Health-Monitoring-System.git
   cd Vehicle-Health-Monitoring-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Dashboard will be available at [http://localhost:3000](http://localhost:3000)

4. **Run the simulator** (in a new terminal)
   ```bash
   pip install requests
   python scripts/send-telemetry.py
   ```

5. **Watch the magic happen!** 🎉
   - Dashboard updates every 3 seconds
   - Vehicle statuses change based on sensor readings
   - Alerts appear for anomalies

### Manual Testing

Send data manually using curl:

```bash
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
```

---

## 📡 API Documentation

### Endpoints

#### POST `/api/telemetry`
Ingest a single vehicle telemetry reading.

**Request Body:**
```json
{
  "vehicle_id": "VEH-001",
  "engine_temp": 85.5,
  "brake_pressure": 92.3,
  "battery_voltage": 12.8,
  "timestamp": "2025-01-06T10:30:00Z",
  "status": "healthy"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vehicle_id": "VEH-001",
    "engine_temp": 85.5,
    "brake_pressure": 92.3,
    "battery_voltage": 12.8,
    "timestamp": "2025-01-06T10:30:00Z",
    "status": "healthy",
    "anomalies": [],
    "received_at": "2025-01-06T10:30:01.234Z"
  },
  "anomalies": []
}
```

#### POST `/api/telemetry/batch`
Ingest multiple vehicle readings in a single request.

**Request Body:**
```json
[
  {
    "vehicle_id": "VEH-001",
    "engine_temp": 85.5,
    "brake_pressure": 92.3,
    "battery_voltage": 12.8,
    "timestamp": "2025-01-06T10:30:00Z",
    "status": "healthy"
  },
  {
    "vehicle_id": "VEH-002",
    "engine_temp": 98.2,
    "brake_pressure": 65.5,
    "battery_voltage": 11.9,
    "timestamp": "2025-01-06T10:30:00Z",
    "status": "warning"
  }
]
```

**Response:**
```json
{
  "success": true,
  "processed": 2,
  "results": [
    {
      "success": true,
      "data": {...},
      "anomalies": []
    },
    {
      "success": true,
      "data": {...},
      "anomalies": ["High engine temperature", "Low battery voltage"]
    }
  ]
}
```

#### GET `/api/telemetry`
Retrieve latest telemetry readings.

**Query Parameters:**
- `vehicle_id` (optional): Filter by specific vehicle
- `limit` (optional): Maximum results to return (default: 50)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "vehicle_id": "VEH-001",
      "engine_temp": 85.5,
      "brake_pressure": 92.3,
      "battery_voltage": 12.8,
      "timestamp": "2025-01-06T10:30:00Z",
      "status": "healthy",
      "anomalies": [],
      "received_at": "2025-01-06T10:30:01.234Z"
    }
  ]
}
```

---

## 📊 Dashboard Features

### Fleet Overview Section
- **Total Vehicles**: Count of all monitored vehicles
- **Healthy Vehicles**: Vehicles with no anomalies (green indicator)
- **Warnings**: Vehicles with non-critical issues (yellow indicator)
- **Critical Alerts**: Vehicles requiring immediate attention (red indicator)

### Vehicle Cards Grid
Each card displays:
- **Vehicle ID**: Unique identifier
- **Status Badge**: Color-coded health status
- **Engine Temperature**: Current reading with visual indicator
- **Brake Pressure**: Current PSI reading
- **Battery Voltage**: Current voltage level
- **Alert Badges**: List of detected anomalies
- **Last Update**: Timestamp of latest reading

### Telemetry Charts
Three bar charts showing fleet-wide metrics:
1. **Engine Temperature**: All vehicles with threshold line at 95°C
2. **Brake Pressure**: All vehicles with threshold line at 70 PSI
3. **Battery Voltage**: All vehicles with threshold line at 12.0V

### Interactive Features
- **Manual Refresh**: Button to fetch latest data immediately
- **Auto-Refresh Toggle**: Enable/disable automatic 3-second refresh
- **Last Update Indicator**: Shows when data was last fetched
- **Loading States**: Spinner during data fetch
- **Empty State**: Helpful message when no data available

---

## 🔍 Anomaly Detection

### Detection Rules

The system implements real-time rule-based anomaly detection:

```typescript
// Engine Temperature
if (engine_temp > 100) → Critical
if (engine_temp > 95)  → Warning

// Brake Pressure
if (brake_pressure < 60) → Critical
if (brake_pressure < 70) → Warning

// Battery Voltage
if (battery_voltage < 11.8) → Critical
if (battery_voltage < 12.0) → Warning
```

### Status Determination

Vehicle overall status is determined by the highest severity anomaly:
- **Healthy**: No anomalies detected
- **Warning**: One or more warning-level anomalies
- **Critical**: One or more critical-level anomalies

### Alert Messages

Clear, actionable alert messages:
- "Critical: High engine temperature"
- "Warning: Engine temperature elevated"
- "Critical: Low brake pressure"
- "Warning: Brake pressure below normal"
- "Critical: Low battery voltage"
- "Warning: Battery voltage low"

---

## 🗺️ Production Roadmap

### Phase 1: Database Integration ✅ (Ready)
- [ ] Set up AWS DynamoDB table
- [ ] Implement DynamoDB client
- [ ] Migrate from in-memory to persistent storage
- [ ] Add indexes for efficient queries
- [ ] Implement data retention policies

### Phase 2: Serverless Deployment
- [ ] Package API routes as Lambda functions
- [ ] Set up API Gateway
- [ ] Configure environment variables
- [ ] Deploy frontend to Vercel
- [ ] Set up CloudWatch logging

### Phase 3: Real-Time Features
- [ ] Implement WebSocket support
- [ ] Add push notifications for alerts
- [ ] Real-time dashboard updates (no polling)
- [ ] Live connection status indicator

### Phase 4: Authentication & Security
- [ ] Add user authentication (NextAuth.js)
- [ ] Implement role-based access control
- [ ] API key management for simulators
- [ ] Rate limiting
- [ ] Input sanitization

### Phase 5: Advanced Analytics
- [ ] Historical data visualization
- [ ] Trend analysis
- [ ] Predictive maintenance ML models
- [ ] Custom alert rules
- [ ] Reporting dashboards

### Phase 6: Alerting System
- [ ] Email notifications (SendGrid/SES)
- [ ] SMS alerts (Twilio)
- [ ] Slack/Teams integration
- [ ] Alert escalation rules
- [ ] On-call scheduling

### Phase 7: Mobile Support
- [ ] Progressive Web App (PWA)
- [ ] React Native mobile app
- [ ] Push notifications
- [ ] Offline support

### Phase 8: CI/CD & DevOps
- [ ] GitHub Actions workflows
- [ ] Automated testing
- [ ] Deployment automation
- [ ] Infrastructure as Code (Terraform)
- [ ] Monitoring and observability

---

## 📁 Project Structure

```
Vehicle-Health-Monitoring-System/
├── app/
│   ├── api/
│   │   └── telemetry/
│   │       ├── route.ts              # Single telemetry endpoint
│   │       └── batch/
│   │           └── route.ts          # Batch telemetry endpoint
│   ├── page.tsx                      # Main dashboard page
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles & theme
│
├── components/
│   ├── vehicle-fleet-dashboard.tsx   # Main dashboard component
│   ├── vehicle-card.tsx              # Individual vehicle card
│   ├── telemetry-chart.tsx           # Chart visualization
│   └── ui/                           # shadcn/ui components
│       ├── card.tsx
│       ├── button.tsx
│       ├── badge.tsx
│       └── ...
│
├── scripts/
│   ├── vehicle-sensor-simulator.py   # Core simulator logic
│   └── send-telemetry.py             # API integration script
│
├── lib/
│   └── utils.ts                      # Utility functions
│
├── public/                           # Static assets
│
├── ARCHITECTURE.md                   # Detailed technical documentation
├── README.md                         # Getting started guide
├── SHOWCASE.md                       # This file
├── package.json                      # Node.js dependencies
└── tsconfig.json                     # TypeScript configuration
```

### Key Files

- **`app/api/telemetry/route.ts`**: Core API logic for data ingestion and retrieval
- **`components/vehicle-fleet-dashboard.tsx`**: Main dashboard with auto-refresh and state management
- **`scripts/vehicle-sensor-simulator.py`**: Realistic vehicle data generator with degradation modeling
- **`ARCHITECTURE.md`**: Comprehensive technical documentation

---

## 🤝 Contributing

We welcome contributions! Here are ways you can help:

### Areas for Contribution

1. **Additional Sensor Types**
   - Tire pressure monitoring
   - Oil level and quality
   - Fuel consumption
   - Coolant temperature
   - Transmission health

2. **Advanced Features**
   - Machine learning anomaly detection
   - Predictive maintenance models
   - Route optimization
   - Fuel efficiency analysis

3. **Integrations**
   - OBD-II device integration
   - GPS tracking
   - Weather API for context
   - Maintenance scheduling systems

4. **UI/UX Improvements**
   - Additional chart types
   - Dark/light theme toggle
   - Mobile app
   - Accessibility improvements

5. **Infrastructure**
   - Docker containerization
   - Kubernetes deployment
   - Terraform scripts
   - Automated testing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Detailed technical architecture, component breakdown, and design decisions
- **[README.md](./README.md)**: Quick start guide and basic usage instructions
- **[SHOWCASE.md](./SHOWCASE.md)**: This comprehensive project showcase

---

## 📝 License

This project is available under the MIT License. See the LICENSE file for details.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Recharts](https://recharts.org/) - Composable charting library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/johaankjis/Vehicle-Health-Monitoring-System/issues)
- **Discussions**: [GitHub Discussions](https://github.com/johaankjis/Vehicle-Health-Monitoring-System/discussions)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the Vehicle Health Monitoring Team

</div>
