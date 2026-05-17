import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useParams
} from "react-router-dom";

import backgroundImage from "../assets/background.jpg";

import PredictionNavbar from "../components/PredictionNavbar";

export default function CrimePrediction() {

  const { crimeType } = useParams();

  const [year, setYear] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [prediction, setPrediction] = useState("");

  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);

  const [districts, setDistricts] = useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/datasets")
      .then(() => {

        return axios.post(
          "http://127.0.0.1:5000/load-dataset",
          {
            filename:
              "ipc_standardized.csv"
          }
        );

      })
      .then((res) => {

        setStates(res.data.states || []);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  useEffect(() => {

    if (!state) return;

    axios
      .get(
        `http://127.0.0.1:5000/districts/${state}`
      )
      .then((res) => {

        setDistricts(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, [state]);

  const handlePrediction = async () => {

    if (
      !year ||
      !state ||
      !district
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(

  "http://127.0.0.1:5000/predict",

  {

    MURDER: 10,

    RAPE: 5,

    KIDNAPPING: 7,

    THEFT: 20

  }

);

      setPrediction(
        response.data.prediction
      );

    } catch (error) {

      console.log(error);

      alert("Prediction failed");

    } finally {

      setLoading(false);

    }
  };

  const pageTitles = {

    murder: "Murder Crime Prediction",

    theft: "Theft Crime Prediction",

    rape: "Rape Crime Risk Analysis"

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

        backgroundAttachment: "fixed",

        padding: "40px",

        color: "white"
      }}
    >

      <PredictionNavbar />

      <div
        style={{

          maxWidth: "1200px",

          margin: "0 auto"
        }}
      >

        <h1
          style={{

            fontSize: "50px",

            marginBottom: "15px",

            color: "#f5f5f5"
          }}
        >
          {pageTitles[crimeType]}
        </h1>

        <p
          style={{

            color: "rgba(255,255,255,0.72)",

            marginBottom: "50px",

            maxWidth: "850px",

            lineHeight: "1.8"
          }}
        >
          Predict future crime trends and analyze
          uploaded dataset patterns using machine
          learning based forecasting models.
        </p>

        <div
          style={{

            background:
              "rgba(255,255,255,0.07)",

            border:
              "1px solid rgba(255,255,255,0.12)",

            borderRadius: "24px",

            padding: "40px",

            backdropFilter: "blur(12px)",

            boxShadow:
              "0 10px 35px rgba(0,0,0,0.32)"
          }}
        >

          <div
            style={{

              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px,1fr))",

              gap: "24px"
            }}
          >

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "10px"
                }}
              >
                Select Year
              </label>

              <input
                type="number"
                value={year}
                onChange={(e) =>
                  setYear(e.target.value)
                }

                placeholder="2026"

                style={inputStyle}
              />

            </div>

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "10px"
                }}
              >
                Select State
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }

                style={inputStyle}
              >

                <option value="">
                  Choose State
                </option>

                {states.map((s, index) => (

                  <option
                    key={index}
                    value={s}
                  >
                    {s}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "10px"
                }}
              >
                Select District
              </label>

              <select
                value={district}
                onChange={(e) =>
                  setDistrict(e.target.value)
                }

                style={inputStyle}
              >

                <option value="">
                  Choose District
                </option>

                {districts.map((d, index) => (

                  <option
                    key={index}
                    value={d}
                  >
                    {d}
                  </option>

                ))}

              </select>

            </div>

          </div>

          <button
            onClick={handlePrediction}

            style={{

              marginTop: "35px",

              background: "#c9a14a",

              color: "#071120",

              border: "none",

              padding: "14px 28px",

              borderRadius: "12px",

              fontWeight: "700",

              cursor: "pointer",

              fontSize: "16px"
            }}
          >

            {loading
              ? "Predicting..."
              : "Predict"}

          </button>

          {prediction && (

            <div
              style={{

                marginTop: "40px",

                background:
                  "rgba(255,255,255,0.06)",

                border:
                  "1px solid rgba(201,161,74,0.35)",

                borderRadius: "18px",

                padding: "30px"
              }}
            >

              <h2
                style={{

                  color: "#f5d58c",

                  marginBottom: "14px"
                }}
              >
                Prediction Result
              </h2>

              <p
                style={{

                  fontSize: "28px",

                  fontWeight: "700"
                }}
              >
                {prediction}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "14px",

  borderRadius: "12px",

  border:
    "1px solid rgba(255,255,255,0.15)",

  background:
    "rgba(255,255,255,0.08)",

  color: "black",

  outline: "none",

  fontSize: "15px"
};
