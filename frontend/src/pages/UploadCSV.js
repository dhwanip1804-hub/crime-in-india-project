import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../assets/background.jpg";

export default function UploadCSV() {

  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {

    axios
      .get("http://localhost:5000/datasets")
      .then((res) => {
        setDatasets(res.data);
      });

  }, []);

  const handleUpload = async () => {

    if (!selectedFile) return;

    const response = await axios.post(
      "http://localhost:5000/load-dataset",
      {
        filename: selectedFile
      }
    );

    navigate("/csv-preview", {
      state: response.data
    });

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(5,10,20,0.84),
            rgba(5,10,20,0.9)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >

      <div
        style={{
          width: "920px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "55px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "45px",
          }}
        >

          <Upload
            size={42}
            color="rgba(255,255,255,0.85)"
          />

          <h1
            style={{
              color: "white",
              fontSize: "3.2rem",
              fontWeight: "500",
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            Upload Crime Dataset
          </h1>

        </div>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "65px",
            textAlign: "center",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >

          <Database
            size={62}
            color="rgba(255,255,255,0.8)"
            style={{
              marginBottom: "28px"
            }}
          />

          <h2
            style={{
              color: "white",
              marginBottom: "14px",
              fontSize: "2.4rem",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}
          >
            Select Standardized Dataset
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              marginBottom: "40px",
              fontSize: "1.15rem",
              lineHeight: "1.8",
              maxWidth: "650px",
              marginInline: "auto",
            }}
          >
            Upload cleaned NCRB datasets prepared for
            K-Means clustering, prediction analysis,
            and future machine learning workflows.
          </p>

          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            style={{
              width: "82%",
              padding: "18px",
              borderRadius: "14px",
              background: "rgba(15,15,20,0.82)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "34px",
              fontSize: "16px",
              outline: "none",
              backdropFilter: "blur(10px)",
            }}
          >

            <option
              value=""
              style={{
                background: "#111827",
                color: "white"
              }}
            >
              Select Dataset
            </option>

            {datasets.map((file, index) => (

              <option
                key={index}
                value={file}
                style={{
                  background: "#111827",
                  color: "white"
                }}
              >
                {file}
              </option>

            ))}

          </select>

          <br />

          <button
            onClick={handleUpload}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "15px 42px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "500",
              letterSpacing: "0.5px",
              backdropFilter: "blur(10px)",
              transition: "0.3s ease",
            }}
          >
            Upload Dataset
          </button>

        </div>

      </div>

    </div>

  );
}