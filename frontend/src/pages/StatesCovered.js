import React, {
  useEffect,
  useState
} from "react";

import indiaMap from "../assets/india-map.png";



export default function StatesCovered() {

  const [data, setData] = useState(null);

useEffect(() => {

  fetch("http://localhost:5001/api/states")
    .then((res) => res.json())
    .then((result) => {
      setData(result);
    })
    .catch((err) => {
      console.error(err);
    });

}, []);





  const states = data
  ? Object.keys(data.states)
  : [];

  const [selectedState, setSelectedState] = useState("");

  const districts =
  data &&
  data.states[selectedState]
    ? Object.keys(data.states[selectedState])
    : [];

  const [selectedDistrict, setSelectedDistrict] =
  useState("");

  useEffect(() => {

  if (states.length > 0 && !selectedState) {

    setSelectedState(states[0]);

    const firstDistrict =
      Object.keys(data.states[states[0]])[0];

    setSelectedDistrict(firstDistrict);
  }

}, [data, selectedState]);

    if (!data) {
  return (
    <div className="min-h-screen bg-[#07111f]" />
  );
}

  const districtData =
  data &&
  data.states[selectedState] &&
  data.states[selectedState][selectedDistrict]
    ? data.states[selectedState][selectedDistrict]
    : {};

  return (

    <div
      className="min-h-screen text-white px-8 py-8"
      style={{
        backgroundImage: `
  linear-gradient(
    rgba(6,10,18,0.28),
    rgba(6,10,18,0.42)
  ),
        url("/background.jpg")
`       ,
        
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >

      {/* TOP */}

      <div className="flex justify-between items-center mb-10">

        <button
          onClick={() => (
            window.location.href = "/dashboard"
          )}
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
          INTERACTIVE STATE EXPLORER
        </div>

      </div>

      {/* HERO */}

      <div className="max-w-5xl mb-14">

        <p className="uppercase tracking-[6px] text-purple-300 mb-5 text-sm">
          Geographic Intelligence System
        </p>

        <h1
          className="text-[5rem] leading-[0.95] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
          }}
        >
          States Crime
          <br />
          Explorer
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
          Interactive geographic crime intelligence system
          developed using NCRB dataset records. Explore
          states, districts, and crime patterns directly
          from processed dataset analysis.
        </p>

      </div>

      {/* MAIN */}

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-8">

        {/* MAP SECTION */}

        <div
          className="
            bg-black/25
            border
            border-white/10
            rounded-[36px]
            p-10
            bg-black/45
            flex
            items-center
            justify-center
            overflow-hidden
            relative
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              w-[500px]
              h-[500px]
              rounded-full
              bg-violet-500/10
              blur-[140px]
            "
          />

          {/* MAP */}

          <img
            src={indiaMap}
            alt="India Map"
            className="
              relative
              z-10
              max-w-[720px]
              w-full
              opacity-90
              select-none
              drop-shadow-[0_0_45px_rgba(168,85,247,0.16)]
            "
            style={{
              filter:
                "brightness(0.88) contrast(1.08) saturate(1.08)",
            }}
          />

        </div>

        {/* RIGHT PANEL */}

        <div className="flex flex-col gap-6">

          {/* STATE PANEL */}

          <div
            className="
              bg-black/25
              border
              border-white/10
              rounded-[36px]
              p-8
              bg-black/25
            "
          >

            <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-4">
              Selected Region
            </p>

            <h2
              className="text-5xl mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {selectedState}
            </h2>

            {/* STATE SELECT */}

            <div className="mb-6">

              <p className="text-gray-400 mb-3 text-sm tracking-[3px] uppercase">
                Select State
              </p>

              <select
                value={selectedState}
                onChange={(e) => {

                  const state = e.target.value;

                  setSelectedState(state);

                  const firstDistrict =
                    Object.keys(data.states[state])[0];

                  setSelectedDistrict(firstDistrict);
                }}
                className="
                  w-full
                  bg-black/40
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-white
                "
              >

                {states.map((state) => (

                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>

                ))}

              </select>

            </div>

            {/* DISTRICT SELECT */}

            <div>

              <p className="text-gray-400 mb-3 text-sm tracking-[3px] uppercase">
                Select District
              </p>

              <select
                value={selectedDistrict}
                onChange={(e) =>
                  setSelectedDistrict(e.target.value)
                }
                className="
                  w-full
                  bg-black/40
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-white
                "
              >

                {districts.map((district) => (

                  <option
                    key={district}
                    value={district}
                  >
                    {district}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* DISTRICT DATA */}

          <div
            className="
              bg-black/45
              border
              border-white/10
              rounded-[36px]
              p-8
              backdrop-blur-xl
            "
          >

            <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-4">
              District Intelligence
            </p>

            <h2
              className="text-4xl mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {selectedDistrict}
            </h2>

            <div className="space-y-5">

              {/* TOTAL */}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">
                  Total Crime Records
                </p>

                <h3 className="text-3xl text-purple-300">
                  {districtData.total_crime
                  ? districtData.total_crime.toLocaleString()
                  : "0"}
                </h3>

              </div>

              {/* CRIME TYPE */}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">
                  Dominant Crime Type
                </p>

                <h3 className="text-2xl text-orange-300">
                  {districtData.top_crime || "Unavailable"}
                </h3>

              </div>

              {/* OBSERVATION */}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 mb-3">
                  Intelligence Observation
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Dataset records indicate concentrated crime
                  activity within {selectedDistrict}, showing
                  significant contribution to the overall
                  regional crime distribution across{" "}
                  {selectedState}.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}