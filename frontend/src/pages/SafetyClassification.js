import React from "react";
import backgroundImage from "../assets/background.jpg";

export default function SafetyClassification() {

  const safetyLevels = [
    {
      label: "Low Risk",
      score: "0 - 35",
      color: "from-emerald-400 to-green-600",
      glow: "shadow-[0_0_45px_rgba(52,211,153,0.28)]",
      height: "160px",
      description:
        "Lower crime density with relatively stable regional safety indicators."
    },
    {
      label: "Medium Risk",
      score: "36 - 70",
      color: "from-orange-300 to-amber-500",
      glow: "shadow-[0_0_45px_rgba(251,191,36,0.30)]",
      height: "250px",
      description:
        "Moderate incident concentration requiring continuous monitoring."
    },
    {
      label: "High Risk",
      score: "71 - 100",
      color: "from-rose-400 to-red-700",
      glow: "shadow-[0_0_55px_rgba(244,63,94,0.32)]",
      height: "340px",
      description:
        "High regional crime activity with elevated threat observations."
    }
  ];

  return (

    <div
      className="min-h-screen text-white px-8 py-8"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(6,10,18,0.28),
            rgba(6,10,18,0.46)
          ),
          url(${backgroundImage})
        `,
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
          SAFETY CLASSIFICATION
        </div>

      </div>

      {/* HERO */}

      <div className="max-w-5xl mb-16">

        <p className="uppercase tracking-[6px] text-purple-300 mb-5 text-sm">
          Crime Intelligence Model
        </p>

        <h1
          className="text-[5rem] leading-[0.95] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
          }}
        >
          Safety
          <br />
          Classification
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
          The safety intelligence model classifies regions
          into Low Risk, Medium Risk, and High Risk zones
          based on historical crime intensity, frequency,
          and regional threat concentration extracted from
          NCRB datasets.
        </p>

      </div>

      {/* MAIN SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8">

        {/* LEFT SIDE */}

        <div
          className="
            bg-black/45
            border
            border-white/10
            rounded-[36px]
            p-10
            backdrop-blur-xl
          "
        >

          <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-8">
            Classification Levels
          </p>

          <div className="space-y-6">

            {safetyLevels.map((item, index) => (

              <div
                key={index}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-[28px]
                  p-6
                "
              >

                <div className="flex items-center justify-between mb-5">

                  <h2
                    className="text-3xl"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {item.label}
                  </h2>

                  <div
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      bg-gradient-to-r
                      ${item.color}
                    `}
                  >
                    Score {item.score}
                  </div>

                </div>

                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          className="
            bg-black/45
            border
            border-white/10
            rounded-[36px]
            p-10
            backdrop-blur-xl
            relative
            overflow-hidden
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              w-[420px]
              h-[420px]
              rounded-full
              bg-purple-500/10
              blur-[150px]
              top-[-100px]
              right-[-100px]
            "
          />

          <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-10 relative z-10">
            Risk Visualization
          </p>

          {/* PREMIUM RADIAL GRAPH */}

          <div className="relative flex items-center justify-center h-[520px]">

            {/* OUTER RINGS */}

            <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5" />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5" />
            <div className="absolute w-[210px] h-[210px] rounded-full border border-white/5" />

            {/* LOW RISK */}

            <div
              className="
                absolute
                rounded-full
                border-[24px]
                border-emerald-400/90
                border-r-transparent
                border-b-transparent
                rotate-[18deg]
                shadow-[0_0_55px_rgba(16,185,129,0.25)]
              "
              style={{
                width: "180px",
                height: "180px",
              }}
            />

            {/* MEDIUM RISK */}

            <div
              className="
                absolute
                rounded-full
                border-[28px]
                border-orange-400/90
                border-l-transparent
                border-b-transparent
                rotate-[52deg]
                shadow-[0_0_65px_rgba(251,146,60,0.28)]
              "
              style={{
                width: "290px",
                height: "290px",
              }}
            />

            {/* HIGH RISK */}

            <div
              className="
                absolute
                rounded-full
                border-[32px]
                border-rose-500/90
                border-r-transparent
                border-t-transparent
                rotate-[18deg]
                shadow-[0_0_85px_rgba(244,63,94,0.35)]
              "
              style={{
                width: "410px",
                height: "410px",
              }}
            />

            {/* CENTER */}

            <div
              className="
                absolute
                w-[90px]
                h-[90px]
                rounded-full
                bg-black/70
                border
                border-white/10
                backdrop-blur-xl
                flex
                items-center
                justify-center
                text-center
              "
            >

              <div>

                <p className="text-[10px] tracking-[3px] text-gray-500 mb-1">
                  
                </p>

                <p
                  className="text-lg"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  SAFE
                </p>

              </div>

            </div>

          </div>

          {/* BOTTOM INFO */}

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-[28px]
              p-6
              relative
              z-10
            "
          >

            <p className="text-gray-400 mb-3">
              Classification Logic
            </p>

            <p className="text-gray-300 leading-relaxed">
              The model compares crime frequency, incident
              severity, and regional concentration patterns
              to estimate overall safety classification of
              a district or city into Low, Medium, or High
              Risk zones.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}