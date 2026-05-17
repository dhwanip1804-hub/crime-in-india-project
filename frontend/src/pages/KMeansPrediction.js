import React, {
  useState,
  useEffect
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import backgroundImage from "../assets/background.jpg";

export default function KMeansPrediction() {

  const location = useLocation();

  const navigate = useNavigate();

  const data = location.state || {
    states: []
  };

  const [stateName, setStateName] =
    useState("");

  const [district, setDistrict] =
    useState("");

  const [districts, setDistricts] =
    useState([]);

  const [murder, setMurder] =
    useState("");

  const [rape, setRape] =
    useState("");

  const [kidnapping, setKidnapping] =
    useState("");

  const [theft, setTheft] =
    useState("");

  const [prediction, setPrediction] =
    useState("");

  // LOAD DISTRICTS

  useEffect(() => {

    if (!stateName) {

      setDistricts([]);

      return;

    }

    axios
      .get(
        `http://localhost:5000/districts/${encodeURIComponent(stateName)}`
      )
      .then((res) => {

        if (Array.isArray(res.data)) {

          setDistricts(res.data);

        } else {

          setDistricts([]);

        }

      })
      .catch((err) => {

        console.log(err);

        setDistricts([]);

      });

  }, [stateName]);

  // PREDICTION

  const handlePredict = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/predict",
        {
          MURDER: murder || 0,
          RAPE: rape || 0,
          KIDNAPPING: kidnapping || 0,
          THEFT: theft || 0
        }
      );

      setPrediction(response.data.prediction);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="relative overflow-hidden">

      {/* GLASS OVERLAY */}

      <div
        className="
          absolute
          inset-0
          z-0
          backdrop-blur-md
        "
        style={{
          background: "rgba(4, 8, 18, 0.38)"
        }}
      />

      <div
        className="
          min-h-screen
          text-white
          px-8
          py-8
          relative
          z-10
        "
        style={{
          backgroundImage: `
          linear-gradient(
      rgba(3,7,16,0.82),
      rgba(3,7,16,0.90)
      ),
      url(${backgroundImage})
      `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          filter: "blur(0px)",
          backgroundBlendMode: "darken",
        }}
      >

        {/* TOP */}

        <div className="flex justify-between items-center mb-10">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="
              bg-black/30
              border
              border-white/10
              px-5
              py-3
              rounded-2xl
              bg-black/45
              hover:bg-black/50
              transition-all
            "
          >
            ← Back To Dashboard
          </button>

          <div className="text-gray-400 tracking-[4px] text-sm">
            CRIME PREDICTION SYSTEM
          </div>

        </div>

        {/* HERO */}

        <div className="max-w-5xl mb-14">

          <p className="uppercase tracking-[6px] text-purple-300 mb-5 text-sm">
            Predictive Crime Intelligence
          </p>

          <h1
            className="text-[5rem] leading-[0.95] mb-8"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
              fontWeight: 500,
            }}
          >
            Crime Cluster Prediction
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            Predict district-level crime clustering
            patterns using trained K-Means machine
            learning analysis powered through
            processed NCRB crime datasets.
          </p>

        </div>

        {/* MAIN */}

        <div
          className="
          bg-black/55
            border
            border-white/10
            rounded-[36px]
            p-10
            bg-black/45
            backdrop-blur-xl
            max-w-7xl
            mx-auto
          "
        >

          {/* NAVIGATION BUTTONS */}

          

<div
  className="
    flex
    flex-wrap
    gap-4
    mb-10
  "
>

  <button
    onClick={() =>
      navigate("/dashboard")
    }
    className={navButtonStyle}
  >
    Home
  </button>

  <button
    onClick={() =>
      navigate("/prediction")
    }
    className={navButtonStyle}
  >
    Prediction
  </button>

  <button
    onClick={() =>
      navigate("/upload-csv")
    }
    className={navButtonStyle}
  >
    Upload CSV
  </button>

</div>

          {/* FORM GRID */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* LEFT */}

            <div
              className="
                bg-black/45
                border
                border-white/10
                rounded-[30px]
                p-8
              "
            >

              <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-5">
                Region Selection
              </p>

              {/* STATE */}

              <div className="mb-6">

                <p className="text-gray-400 mb-3 text-sm tracking-[3px] uppercase">
                  Select State
                </p>

                <select
                  value={stateName}
                  onChange={(e) => {

                    setStateName(e.target.value);

                    setDistrict("");

                  }}
                  className={selectStyle}
                >

                  <option value="">
                    Select State
                  </option>

                  {(data.states || []).map(
                    (state, index) => (

                      <option
                        key={index}
                        value={state}
                      >
                        {state}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* DISTRICT */}

              <div>

                <p className="text-gray-400 mb-3 text-sm tracking-[3px] uppercase">
                  Select District
                </p>

                <select
                  value={district}
                  onChange={(e) =>
                    setDistrict(e.target.value)
                  }
                  className={selectStyle}
                >

                  <option value="">
                    Select District
                  </option>

                  {districts.map((dist, index) => (

                    <option
                      key={index}
                      value={dist}
                    >
                      {dist}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            {/* RIGHT */}

            <div
              className="
                bg-black/55
                border
                border-white/10
                rounded-[30px]
                p-8
              "
            >

              <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-5">
                Crime Input Metrics
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="number"
                  placeholder="Murder Cases"
                  className={inputStyle}
                  onChange={(e) =>
                    setMurder(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Rape Cases"
                  className={inputStyle}
                  onChange={(e) =>
                    setRape(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Kidnapping Cases"
                  className={inputStyle}
                  onChange={(e) =>
                    setKidnapping(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Theft Cases"
                  className={inputStyle}
                  onChange={(e) =>
                    setTheft(e.target.value)
                  }
                />

              </div>

              {/* BUTTON */}

              <div className="mt-8">

                <button
                  onClick={handlePredict}
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    py-4
                    hover:bg-white/15
                    transition-all
                    text-white
                    tracking-[2px]
                  "
                >
                  Predict Crime Cluster
                </button>

              </div>

            </div>

          </div>

          {/* RESULT */}

          {prediction && (

            <div
              className="
                mt-10
                bg-black/45
                border
                border-white/10
                rounded-[30px]
                p-10
                text-center
              "
            >

              <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-4">
                Prediction Result
              </p>

              <h2
                className="text-6xl mb-5"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
              >
                {prediction}
              </h2>

              <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Prediction generated using trained
                K-Means clustering machine learning
                analysis based on entered crime
                metrics and NCRB dataset patterns.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

const navButtonStyle = `
  bg-white/5
  border
  border-white/10
  px-5
  py-3
  rounded-2xl
  text-white
  hover:bg-white/10
  transition-all
`;

const selectStyle = `
  w-full
  bg-black/40
  border
  border-white/10
  rounded-2xl
  px-5
  py-4
  outline-none
  text-white
`;

const inputStyle = `
  bg-black/40
  border
  border-white/10
  rounded-2xl
  px-5
  py-4
  outline-none
  text-white
`;