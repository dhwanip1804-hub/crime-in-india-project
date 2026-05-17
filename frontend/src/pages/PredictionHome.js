import React from "react";

import { Link } from "react-router-dom";

import backgroundImage from "../assets/background.jpg";

import PredictionNavbar from "../components/PredictionNavbar";

export default function PredictionHome() {

  const predictionCards = [

    {
      title: "Murder Crime",
      description:
        "Predict future murder crime rates using Random Forest Regression.",
      route: "/prediction/murder"
    },

    {
      title: "Theft Crime",
      description:
        "Forecast future theft crime trends using Linear Regression.",
      route: "/prediction/theft"
    },

    {
      title: "Rape Crime",
      description:
        "Classify future rape crime risk levels using Gaussian Naive Bayes.",
      route: "/prediction/rape"
    },

    {
      title: "Analysis",
      description:
        "Visualize uploaded crime datasets using dynamic charts and graphs.",
      route: "/analysis"
    }

  ];

  return (

    <div
      className="relative min-h-screen overflow-hidden text-white"
    >

      {/* BLURRED BACKGROUND */}

      <div
        className="absolute inset-0"
        style={{

          backgroundImage: `
            linear-gradient(
              rgba(5,10,18,0.62),
              rgba(5,10,18,0.74)
            ),
            url(${backgroundImage})
          `,

          backgroundSize: "cover",

          backgroundPosition: "center",

          backgroundAttachment: "fixed",

          filter: "blur(10px) scale(1.05)",

          transform: "scale(1.04)",

        }}
      />

      {/* DARK OVERLAY */}

      <div
        className="absolute inset-0 bg-[#060b14]/55"
      />

      {/* CONTENT */}

      <div className="relative z-10 px-8 py-8">

        {/* TOP */}

        <div className="flex justify-between items-center mb-12">

          <div>

            <p className="uppercase tracking-[6px] text-purple-300 mb-4 text-sm">
              
            </p>

            <h1
              className="text-[5.2rem] leading-[0.92]"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontWeight: 500,
              }}
            >
              Future Crime
              <br />
              Prediction
            </h1>

          </div>

          <div className="text-gray-400 tracking-[4px] text-sm">
            
          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="max-w-4xl mb-12">

          <p className="text-gray-300 text-lg leading-relaxed">
            Explore future crime forecasting models,
            predictive intelligence systems, and machine
            learning based analytical tools developed
            using processed NCRB crime datasets across
            multiple crime categories.
          </p>

        </div>

        {/* NAVBAR */}

        <div className="mb-14">
          <PredictionNavbar />
        </div>

        {/* CARDS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {predictionCards.map((card, index) => (

            <Link
              key={index}
              to={card.route}
              style={{
                textDecoration: "none"
              }}
            >

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-white/10
                  bg-white/[0.045]
                  backdrop-blur-2xl
                  p-8
                  h-full
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:bg-white/[0.07]
                "
              >

                {/* SOFT GLOW */}

                <div
                  className="
                    absolute
                    top-[-80px]
                    right-[-60px]
                    w-[180px]
                    h-[180px]
                    rounded-full
                    bg-violet-500/10
                    blur-[90px]
                  "
                />

                <div className="relative z-10">

                  <p className="uppercase tracking-[4px] text-purple-300 text-xs mb-5">
                    Prediction Module
                  </p>

                  <h2
                    className="text-[2.8rem] leading-[0.95] mb-6"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                      fontWeight: 500,
                    }}
                  >
                    {card.title}
                  </h2>

                  <p className="text-gray-300 leading-relaxed text-[15px]">
                    {card.description}
                  </p>

                  <div
                    className="
                      mt-10
                      text-yellow-300
                      tracking-[1px]
                      text-sm
                    "
                  >
                    Explore →
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );
}

