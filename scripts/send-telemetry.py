"""
Send telemetry data to the API endpoint
This script demonstrates how to send the simulated data to your Next.js API
"""

import requests
import json
import time
from vehicle_sensor_simulator import FleetSimulator

API_URL = "http://localhost:3000/api/telemetry/batch"

def send_telemetry_to_api():
    """Send simulated telemetry data to the API"""
    simulator = FleetSimulator(num_vehicles=5)
    
    print("[v0] Starting telemetry transmission to API...")
    print(f"[v0] Target: {API_URL}")
    print("-" * 80)
    
    iteration = 0
    
    try:
        while True:
            iteration += 1
            fleet_data = simulator.generate_fleet_data()
            
            try:
                response = requests.post(
                    API_URL,
                    json=fleet_data,
                    headers={"Content-Type": "application/json"},
                    timeout=5
                )
                
                if response.status_code == 200:
                    result = response.json()
                    print(f"[Iteration {iteration}] ✓ Sent {len(fleet_data)} readings - Status: {response.status_code}")
                else:
                    print(f"[Iteration {iteration}] ✗ Error: {response.status_code}")
                    
            except requests.exceptions.RequestException as e:
                print(f"[Iteration {iteration}] ✗ Connection error: {e}")
            
            time.sleep(3)  # Send every 3 seconds
            
    except KeyboardInterrupt:
        print(f"\n[v0] Stopped after {iteration} iterations")

if __name__ == "__main__":
    send_telemetry_to_api()
