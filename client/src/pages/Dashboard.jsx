import { useState } from "react";
import StatsChart from "../components/StatsChart";
import ScanLoader from "../components/ScanLoader";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      alert("Scan Completed! Risks found: 1");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">DFS Dashboard</h2>

        <nav className="space-y-3">
          <button
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "overview" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "scan" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("scan")}
          >
            Run Scan
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "history" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>

          <button
            className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-100"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 p-10">

        {/* ========= OVERVIEW ========= */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold">Welcome to your Dashboard 🚀</h1>
            <p className="text-gray-700 mb-6">Your digital activity summary:</p>

            <StatsChart />
          </div>
        )}

        {/* ========= SCAN ========= */}
        {activeTab === "scan" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Run Digital Footprint Scan</h1>

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
          </div>
        )}

        {/* ========= HISTORY ========= */}
        {activeTab === "history" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Scan History</h1>

            <div className="bg-white shadow p-6 rounded-lg">
              <ul className="space-y-4">
                <li className="border-b pb-2">✔ Scan #1 — Risks found: 2</li>
                <li className="border-b pb-2">✔ Scan #2 — Risks found: 0</li>
                <li className="border-b pb-2">✔ Scan #3 — Risks found: 1</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
