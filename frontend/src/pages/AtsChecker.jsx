import React, { useState } from "react";
import axios from "axios";

const AtsChecker = () => {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [improvementPoints, setImprovementPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setAtsScore(null);
    setImprovementPoints([]);
    setLoading(true);

    if (!file) {
      setError("Please upload a PDF resume.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/ats/check_ats",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAtsScore(response.data.ats_score);
      setImprovementPoints(response.data.improvement_points || []);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-error";
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-200 py-10">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">ATS Resume Checker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload your resume (PDF)</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Analyzing...
              </>
            ) : (
              "Check ATS Score"
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}

        {atsScore !== null && (
          <div className="mt-8">
            {/* Score Meter */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">ATS Score</h3>
              <div className="radial-progress text-primary" style={{ "--value": atsScore }} role="progressbar">
                {atsScore} / 100
              </div>
              <p className={`text-lg font-medium mt-2 ${getScoreColor(atsScore)}`}>
                {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good, but can improve" : "Needs significant improvement"}
              </p>
            </div>

            {/* Improvement Suggestions */}
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Improvement Points</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvementPoints.map((point, index) => (
                <div key={index} className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h4 className="card-title text-md font-semibold">{index + 1}. {point.title}</h4>
                    <p className="text-sm text-gray-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {improvementPoints.length === 0 && (
              <div className="alert alert-info mt-4">
                <span>No specific improvement points provided with this score.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsChecker;
