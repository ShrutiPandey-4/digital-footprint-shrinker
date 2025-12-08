import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsChart from "../components/StatsChart";
import ScanLoader from "../components/ScanLoader";

export default function Dashboard() {
  const navigate = useNavigate();

  // ================= AUTH GUARD =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  // ================= STATE =================
  const [activeTab, setActiveTab] = useState("overview");
  const [isScanning, setIsScanning] = useState(false);
  const [userName, setUserName] = useState("");
  const [history, setHistory] = useState([]);
  const [scanMessage, setScanMessage] = useState("");

  // ========== FETCH USER INFO (protected) ==========
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/protected", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user.fullName) {
          setUserName(data.user.fullName);
        }
      })
      .catch(err => console.log("Protected API Error:", err));
  }, []);

  // ========== FETCH SCAN HISTORY ==========
  const loadHistory = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/scan/history", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(data);
      })
      .catch(err => console.log("History load error:", err));
  };

  // Load history jab History tab open ho
  useEffect(() => {
    if (activeTab === "history") {
      loadHistory();
    }
  }, [activeTab]);

  // ========== RUN SCAN (backend call) ==========
  const startScan = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsScanning(true);
    setScanMessage("");

    fetch("/api/scan/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setIsScanning(false);
        if (data.scan) {
          setScanMessage(
            `Scan Completed! Risks found: ${data.scan.risksFound}`
          );
          // Latest scan add to top of history
          setHistory(prev => [data.scan, ...prev]);
        } else {
          setScanMessage("Scan failed. Try again.");
        }
      })
      .catch(err => {
        console.log("Scan error:", err);
        setIsScanning(false);
        setScanMessage("Scan failed. Try again.");
      });
  };

  // ========== LOGOUT ==========
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ========== SIDEBAR ========== */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">DFS Dashboard</h2>

        <nav className="space-y-3">
          <button
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "overview"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "scan"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("scan")}
          >
            Run Scan
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>

          <button
            className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* ========== MAIN AREA ========== */}
      <div className="flex-1 p-10">
        {/* Greeting */}
        <h1 className="text-3xl font-bold mb-4">
          Welcome{userName ? `, ${userName} 🚀` : " to your Dashboard 🚀"}
        </h1>

        {/* ========= OVERVIEW ========= */}
        {activeTab === "overview" && (
          <div>
            <p className="text-gray-700 mb-6">Your digital activity summary:</p>
            <StatsChart />
          </div>
        )}

        {/* ========= SCAN ========= */}
        {activeTab === "scan" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Run Digital Footprint Scan
            </h1>

            {!isScanning ? (
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
                onClick={startScan}
              >
                Start Scan
              </button>
            ) : (
              <ScanLoader />
            )}

            {scanMessage && (
              <p className="mt-4 text-lg font-medium text-gray-800">
                {scanMessage}
              </p>
            )}
          </div>
        )}

        {/* ========= HISTORY ========= */}
        {activeTab === "history" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Scan History</h1>

            <div className="bg-white shadow p-6 rounded-lg">
              {history.length === 0 ? (
                <p className="text-gray-500">No scans yet.</p>
              ) : (
                <ul className="space-y-3">
                  {history.map((scan, index) => (
                    <li key={scan._id || index} className="border-b pb-2">
                      ✔ Scan — Risks found:{" "}
                      <b>{scan.risksFound}</b> &nbsp; | &nbsp;
                      <span className="text-sm text-gray-500">
                        {new Date(scan.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
