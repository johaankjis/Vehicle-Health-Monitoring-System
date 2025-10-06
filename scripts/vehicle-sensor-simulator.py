"""
Vehicle Sensor Simulator
Generates real-time telemetry data for multiple vehicles
Simulates: engine temperature, brake pressure, battery voltage
"""

import json
import random
import time
from datetime import datetime
from typing import Dict, List
import sys

class VehicleSensor:
    """Simulates sensor readings for a single vehicle"""
    
    def __init__(self, vehicle_id: str):
        self.vehicle_id = vehicle_id
        # Initialize baseline values
        self.engine_temp = random.uniform(70, 85)  # Celsius
        self.brake_pressure = random.uniform(80, 100)  # PSI
        self.battery_voltage = random.uniform(12.4, 13.2)  # Volts
        
        # Simulate gradual degradation for some vehicles
        self.degradation_factor = random.choice([0, 0, 0, 1])  # 25% chance of issues
        
    def generate_reading(self) -> Dict:
        """Generate a single sensor reading with realistic variations"""
        
        # Normal fluctuations
        self.engine_temp += random.uniform(-2, 3)
        self.brake_pressure += random.uniform(-3, 2)
        self.battery_voltage += random.uniform(-0.2, 0.1)
        
        # Apply degradation if vehicle has issues
        if self.degradation_factor:
            self.engine_temp += random.uniform(0, 1.5)
            self.brake_pressure -= random.uniform(0, 1)
            self.battery_voltage -= random.uniform(0, 0.05)
        
        # Keep values within realistic bounds
        self.engine_temp = max(60, min(120, self.engine_temp))
        self.brake_pressure = max(40, min(110, self.brake_pressure))
        self.battery_voltage = max(10.5, min(14.5, self.battery_voltage))
        
        return {
            "vehicle_id": self.vehicle_id,
            "engine_temp": round(self.engine_temp, 2),
            "brake_pressure": round(self.brake_pressure, 2),
            "battery_voltage": round(self.battery_voltage, 2),
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "status": self._calculate_status()
        }
    
    def _calculate_status(self) -> str:
        """Determine overall vehicle health status"""
        warnings = []
        
        if self.engine_temp > 100:
            warnings.append("engine_overheating")
        if self.brake_pressure < 60:
            warnings.append("brake_pressure_low")
        if self.battery_voltage < 11.8:
            warnings.append("battery_weak")
            
        if len(warnings) >= 2:
            return "critical"
        elif len(warnings) == 1:
            return "warning"
        else:
            return "healthy"


class FleetSimulator:
    """Manages multiple vehicle sensors"""
    
    def __init__(self, num_vehicles: int = 5):
        self.vehicles = [
            VehicleSensor(f"VEH-{str(i+1).zfill(3)}") 
            for i in range(num_vehicles)
        ]
        
    def generate_fleet_data(self) -> List[Dict]:
        """Generate readings for all vehicles"""
        return [vehicle.generate_reading() for vehicle in self.vehicles]
    
    def run_simulation(self, interval: float = 2.0, duration: int = 60):
        """
        Run continuous simulation
        
        Args:
            interval: Seconds between readings
            duration: Total simulation duration in seconds (0 for infinite)
        """
        print(f"[v0] Starting vehicle sensor simulation...")
        print(f"[v0] Monitoring {len(self.vehicles)} vehicles")
        print(f"[v0] Update interval: {interval}s")
        print("-" * 80)
        
        start_time = time.time()
        iteration = 0
        
        try:
            while True:
                iteration += 1
                fleet_data = self.generate_fleet_data()
                
                # Print summary
                print(f"\n[Iteration {iteration}] {datetime.now().strftime('%H:%M:%S')}")
                
                for reading in fleet_data:
                    status_icon = {
                        "healthy": "✓",
                        "warning": "⚠",
                        "critical": "✗"
                    }.get(reading["status"], "?")
                    
                    print(f"  {status_icon} {reading['vehicle_id']}: "
                          f"Engine={reading['engine_temp']}°C, "
                          f"Brake={reading['brake_pressure']}PSI, "
                          f"Battery={reading['battery_voltage']}V "
                          f"[{reading['status'].upper()}]")
                
                # Output JSON for API consumption
                print(f"\n[JSON OUTPUT]")
                print(json.dumps(fleet_data, indent=2))
                print("-" * 80)
                
                # Check duration
                if duration > 0 and (time.time() - start_time) >= duration:
                    print(f"\n[v0] Simulation completed after {duration}s")
                    break
                
                time.sleep(interval)
                
        except KeyboardInterrupt:
            print(f"\n[v0] Simulation stopped by user")
            print(f"[v0] Total iterations: {iteration}")


def main():
    """Main entry point"""
    # Configuration
    NUM_VEHICLES = 5
    UPDATE_INTERVAL = 2.0  # seconds
    DURATION = 0  # 0 = run indefinitely
    
    # Create and run simulator
    simulator = FleetSimulator(num_vehicles=NUM_VEHICLES)
    simulator.run_simulation(interval=UPDATE_INTERVAL, duration=DURATION)


if __name__ == "__main__":
    main()
