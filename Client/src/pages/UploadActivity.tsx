import React, { useEffect, useRef, useState } from "react";
import { Download, Upload, FileText } from "lucide-react";
import { uploadActivity } from "@/api/uploadActivity.api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadActivity = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ❄️ Optimized snowflakes (lightweight) */
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    setSnowflakes(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  /* ---------------- FILE VALIDATION ---------------- */
  const validateAndSetFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Only CSV files are allowed");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be under 5MB");
      return;
    }

    setUploadedFile(file);
  };

  /* ---------------- EVENT HANDLERS ---------------- */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  /* ---------------- TEMPLATE DOWNLOAD ---------------- */
const downloadTemplate = () => {
  const csvContent =
    "Category,Value,Unit,Date,Department\n" +
    "electricity,1200,kWh,01-01-2024,Operations\n" +
    "electricity,3500,kWh,01-01-2024,Engineering\n" +
    "transportation,120,liters,01-01-2024,Logistics\n" +
    "fuel,180,liters,01-01-2024,Operations\n" +
    "waste,350,kg,01-01-2024,Admin\n" +
    "manufacturing,1500,kg,01-01-2024,Engineering\n";

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "carbon_activity_template.csv";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


  /* ---------------- UPLOAD ---------------- */
  const handleUploadAndProcess = async () => {
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("csvFile", uploadedFile);

    try {
      setLoading(true);
      await uploadActivity(formData);

      alert("Upload successful!");
      setUploadedFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center px-6">
      
      {/* ❄️ Snowflakes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {snowflakes.map((i) => (
          <span
            key={i}
            className="snowflake absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      <style>{`
        .snowflake {
          top: -10%;
          font-size: 14px;
          animation: snowfall linear infinite;
        }
        @keyframes snowfall {
          to {
            transform: translateY(120vh) rotate(360deg);
          }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Upload Carbon Activity Data
            </h1>
            <p className="text-gray-600 mt-1">
              Upload CSV-based activity data for emission calculation
            </p>
          </div>

          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            <Download size={20} />
            Download CSV Template
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
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
            <FileText size={48} className="text-green-600" />

            {uploadedFile ? (
              <div>
                <p className="font-semibold">{uploadedFile.name}</p>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-red-600 text-sm mt-2"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <p className="font-semibold">Drag & drop your CSV file</p>
                <button
                  onClick={handleBrowseClick}
                  className="text-green-600 underline"
                >
                  Browse from system
                </button>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUploadAndProcess}
            disabled={!uploadedFile || loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-50"
          >
            <Upload size={22} />
            {loading ? "Uploading..." : "Upload & Process Data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadActivity;
