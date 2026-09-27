import os
import sys
import numpy as np

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    print("[PASS] Health endpoint passed.")

def test_metrics_summary():
    response = client.get("/api/v1/jobs/metrics/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_signals" in data
    assert "mean_confidence" in data
    print("[PASS] Metrics summary endpoint passed:", data)

def test_signal_upload_and_processing():
    # Generate 1024 complex64 synthetic IQ samples
    num_samples = 1024
    t = np.linspace(0, 0.001, num_samples, endpoint=False)
    # Carrier + Quadrature
    iq = np.cos(2 * np.pi * 10000 * t) + 1j * np.sin(2 * np.pi * 10000 * t)
    iq = iq.astype(np.complex64)
    raw_bytes = iq.tobytes()

    test_filename = "test_synthetic_qpsk.cfile"

    response = client.post(
        "/api/v1/upload",
        files={"file": (test_filename, raw_bytes, "application/octet-stream")},
        data={
            "sample_rate": 2048000.0,
            "center_freq": 100000000.0,
            "dtype": "complex64"
        }
    )
    assert response.status_code == 200, f"Upload failed: {response.text}"
    job_data = response.json()
    job_id = job_data["id"]
    print(f"[PASS] Upload succeeded. Job ID: {job_id}")

    # Fetch job status
    res = client.get(f"/api/v1/jobs/{job_id}")
    assert res.status_code == 200
    status_data = res.json()
    print(f"[PASS] Job status: {status_data['status']}, Progress: {status_data['progress']}%")

    # Fetch visualization results
    res_viz = client.get(f"/api/v1/jobs/{job_id}/results")
    assert res_viz.status_code == 200
    viz_data = res_viz.json()
    assert "results" in viz_data
    print("[PASS] Job visualization endpoint returned valid payload.")

if __name__ == "__main__":
    print("Running Phase 1 Infrastructure Verification Tests...")
    test_health()
    test_metrics_summary()
    test_signal_upload_and_processing()
    print("All Phase 1 tests passed successfully!")
