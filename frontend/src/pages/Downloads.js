import React, {
  useEffect,
  useState
} from "react";

export default function Downloads() {

  const [downloads, setDownloads] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/downloads")
      .then((res) => res.json())
      .then((data) => {
        setDownloads(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  const totalDownloads = downloads.length;

  const weeklyMap = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  };

  downloads.forEach((item) => {

    const date = new Date(item.time);

    const day =
      ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][
        date.getDay()
      ];

    weeklyMap[day]++;

  });

  const weeklyData = Object.keys(weeklyMap).map(
    (day) => ({
      day,
      count: weeklyMap[day]
    })
  );

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
          DOWNLOAD ANALYTICS
        </div>

      </div>

      {/* HERO */}

      <div className="max-w-5xl mb-14">

        <p className="uppercase tracking-[6px] text-purple-300 mb-5 text-sm">
          Dataset Intelligence System
        </p>

        <h1
          className="text-[5rem] leading-[0.95] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
          }}
        >
          Times
          <br />
          Downloaded
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
          Track total dataset downloads, resource usage,
          and platform engagement statistics across
          crime intelligence datasets.
        </p>

      </div>

      {/* MAIN SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* DOWNLOAD CARD */}

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

          <p className="uppercase tracking-[5px] text-purple-300 text-sm mb-4">
            Download Statistics
          </p>

          <h2
            className="text-5xl mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {totalDownloads}
          </h2>

          <div className="space-y-5">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-gray-400 mb-2">
                Secure Download Tracking
              </p>

              <h3 className="text-2xl text-orange-300">
                Dataset identities hidden
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                Download analytics are securely monitored
                without exposing specific archive names.
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-gray-400 mb-3">
                Platform Observation
              </p>

              <p className="text-gray-300 leading-relaxed">
                Download activity indicates strong engagement
                with crime intelligence resources and analytical
                datasets used for academic research and regional
                crime pattern studies.
              </p>

            </div>

          </div>

        </div>

        {/* GRAPH CARD */}

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
            Weekly Download Activity
          </p>

          <div className="flex items-end gap-5 h-[320px]">

            {weeklyData.map((item, index) => (

              <div
                key={index}
                className="flex flex-col items-center flex-1"
              >

                <div
                  className="
                    w-full
                    rounded-t-xl
                    bg-gradient-to-t
                    from-purple-500
                    to-orange-300
                    transition-all
                  "
                  style={{
                    height: `${item.count * 45 + 25}px`
                  }}
                />

                <p className="text-gray-400 text-xs mt-4">
                  {item.day}
                </p>

                <p className="text-white text-sm">
                  {item.count}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}