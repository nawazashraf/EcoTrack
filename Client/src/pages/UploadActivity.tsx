import React, { useState, useRef } from "react";
import { Download, Upload, FileText } from "lucide-react";
import { uploadActivity } from "@/api/uploadActivity.api";

const UploadActivity = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [snowflakes, setSnowflakes] = useState([]);

  React.useEffect(() => {
    const flakes = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 4 + 3,
      animationDelay: Math.random() * 5,
      size: Math.random() * 12 + 8, // Bigger snowflakes: 8-20px
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setSnowflakes(flakes);
  }, []);

  const departments = ["Electricity", "Transport", "Waste", "Manufacturing"];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv") && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert("Please upload a valid CSV file (max 5MB)");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".csv") && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert("Please upload a valid CSV file (max 5MB)");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const downloadTemplate = () => {
    const csvContent =
      "Category,Value,Unit,Date,Department\n" +
      // ================= ELECTRICITY =================
      "Electricity,1200,kWh,2024-01-01,Electricity\n" +
      "Electricity,3500,kWh,2024-01-02,Electricity\n" +
      // ================= TRANSPORT =================
      "Transport,120,liters,2024-01-01,Transport\n" +
      "Transport,260,liters,2024-01-02,Transport\n" +
      // ================= WASTE =================
      "Waste,350,kg,2024-01-01,Waste\n" +
      "Waste,180,kg,2024-01-02,Waste\n" +
      // ================= MANUFACTURING =================
      "Manufacturing,1500,kg,2024-01-01,Manufacturing\n" +
      "Manufacturing,4200,kWh,2024-01-02,Manufacturing\n";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "carbon_activity_template.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleUploadAndProcess = async () => {
    if (!uploadedFile) {
      alert("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", uploadedFile);

    try {
      const res = await uploadActivity(formData);

      alert("Upload successful");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-6 flex items-center justify-center relative overflow-hidden">
      {/* Snowflake Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute"
            style={{
              left: `${flake.left}%`,
              top: "-20px",
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `fall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
              textShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>

      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative z-10 border border-blue-100">
        {/* Frost overlay effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(191, 219, 254, 0.15), transparent 60%), radial-gradient(circle at bottom left, rgba(165, 243, 252, 0.15), transparent 60%)",
            boxShadow: "inset 0 0 60px rgba(191, 219, 254, 0.1)",
          }}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Upload Carbon Activity Data
            </h1>
            <p className="text-gray-600">
              Upload department-wise activity data using a standard CSV format.
            </p>
          </div>

          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all hover:shadow-lg"
          >
            <Download size={20} />
            Download CSV Template
          </button>
        </div>

        {/* Department */}
        <div className="mb-6 relative z-10">
          <label className="block text-gray-700 font-medium mb-2">
            Select Department <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all relative z-10 ${
            isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <FileText size={48} className="text-green-600" />
            </div>

            {uploadedFile ? (
              <div>
                <p className="font-semibold text-gray-800">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-red-600 hover:text-red-700 text-sm mt-2 font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800">
                  Drag & drop your CSV file
                </h3>
                <p className="text-gray-500">or</p>
                <button
                  onClick={handleBrowseClick}
                  className="text-green-600 hover:text-green-700 underline font-medium"
                >
                  Browse from system
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Accepted format: .csv | Max file size: 5MB
        </p>

        {/* Submit */}
        <div className="mt-8 flex justify-center relative z-10">
          <button
            onClick={handleUploadAndProcess}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Upload size={22} />
            Upload & Process Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadActivity;
