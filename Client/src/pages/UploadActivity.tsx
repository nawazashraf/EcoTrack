import React, { useState, useRef } from "react";
import { Download, Upload, FileText } from "lucide-react";
import { uploadActivity } from "@/api/uploadActivity.api";
import { CATEGORIES } from "@/constants/activity.constants";

//TODO Remove Category Input field

const UploadActivity = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  React.useEffect(() => {
    const flakes = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 4 + 3,
      animationDelay: Math.random() * 5,
      size: Math.random() * 12 + 8,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setSnowflakes(flakes);
  }, []);

  /* ---------------- FILE HANDLERS ---------------- */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    if (file.name.endsWith(".csv") && file.size <= 5 * 1024 * 1024) {
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
      "electricity,1200,kWh,2024-01-01,Operations\n" +
      "electricity,3500,kWh,2024-01-02,Engineering\n" +
      "transportation,120,liters,2024-01-01,Logistics\n" +
      "transportation,260,liters,2024-01-02,Logistics\n" +
      "waste,350,kg,2024-01-01,Admin\n" +
      "manufacturing,1500,kg,2024-01-01,Engineering\n";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "carbon_activity_template.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  /* Handling Uploading CSV File */
  const handleUploadAndProcess = async () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    if (!uploadedFile) {
      alert("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", uploadedFile);

    try {
      await uploadActivity(formData);
      alert("Upload successful");
      setUploadedFile(null);
      setSelectedCategory("");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-cyan-50 to-white p-6 flex items-center justify-center relative overflow-hidden">
      {/* Snowflakes */}
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
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>

      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Upload Carbon Activity Data
            </h1>
            <p className="text-gray-600">
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

        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Category <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
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
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
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
