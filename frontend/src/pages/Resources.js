
import backgroundImage from "../assets/background.jpg";
import React, {
  useEffect,
  useMemo,
  useState
} from "react";
export default function Resources() {

  const [resources, setResources] = useState([]);

  

  const [search, setSearch] = useState("");
  
  const [visibleResources, setVisibleResources] = useState([]);


  useEffect(() => {

  fetch("http://localhost:5001/api/resources")
    .then((res) => res.json())
    .then((data) => {
      setResources(data);
    })
    .catch((err) => {
      console.error(err);
    });

}, []);

useEffect(() => {

  if (resources.length === 0) return;

  const shuffled = [...resources].sort(
    () => 0.5 - Math.random()
  );

  setVisibleResources(
    shuffled.slice(0, 3)
  );

}, [resources]);

  
  const filteredResources = useMemo(() => {

  return visibleResources.filter((item) =>
    item.title.toLowerCase().includes(
      search.toLowerCase()
    ) ||
    item.category.toLowerCase().includes(
      search.toLowerCase()
    )
  );

}, [visibleResources, search]);

  return (

    <div
  className="min-h-screen text-white px-8 py-8 bg-cover bg-center bg-fixed"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(6,10,18,0.38),
        rgba(6,10,18,0.52)
      ),
      url(${backgroundImage})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
  }}
>

    

      <div className="max-w-5xl mb-14">

  <p className="uppercase tracking-[6px] text-orange-300 mb-5 text-sm">
    National Crime Archive
  </p>

  <h1
    className="text-[5rem] leading-[0.95] mb-8"
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 500,
      color: "rgba(255,255,255,0.96)",
    }}
  >
    Evidence &
    <br />
    Intelligence Archive
  </h1>

  <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
    Access processed NCRB datasets, forensic intelligence
    records, district crime archives, and classified
    analytical resources extracted from national crime
    databases.
  </p>

</div>

<div
  className="
    flex
    flex-col
    lg:flex-row
    lg:items-center
    justify-between
    gap-6
    mb-14
    bg-black/20
    border
    border-white/10
    rounded-[30px]
    p-6
    backdrop-blur-xl
  "
>

  <input
    type="text"
    placeholder="Search datasets, intelligence archives..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      bg-white/5
      border
      border-white/10
      rounded-2xl
      px-5
      py-3
      outline-none
      w-full
      max-w-xl
      text-white
      placeholder:text-gray-500
    "
  />

  <button
  className="
    px-6
    py-3
    rounded-2xl
    bg-white/10
    border
    border-white/10
    hover:bg-white/15
    transition-all
  "
>
  Search
</button>



  <div
    className="
      border
      border-white/10
      bg-white/5
      rounded-2xl
      px-5
      py-3
      text-gray-300
      text-sm
    "
  >
    {resources.length} Intelligence Archives
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

  {filteredResources.map((item) => (

    <div
      key={item.id}
      className="
        min-h-[320px]
        flex
        flex-col
        justify-between
        bg-[rgba(10,14,22,0.72)]
        border
        border-white/10
        rounded-[28px]
        p-7
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.28)]
        hover:-translate-y-1
        hover:border-orange-400/20
        transition-all
        duration-500
        relative
        overflow-hidden
      "
    >

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.03]
          via-transparent
          to-orange-300/[0.02]
          pointer-events-none
        "
      />

      <div className="relative z-10">

        <div className="flex justify-between items-start mb-7">

          <div className="flex items-center gap-3">

            <div className="w-2 h-2 rounded-full bg-orange-400/70" />

            <p className="text-[11px] tracking-[4px] uppercase text-gray-500">
              Archived Evidence
            </p>

          </div>

          <div className="flex flex-col items-end gap-2">

            <span className="text-orange-300 text-sm font-medium">
              {item.type}
            </span>

            <span className="text-gray-500 text-xs">
              {item.category}
            </span>

          </div>

        </div>

        <h2
          className="text-[2rem] leading-tight mb-5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
          }}
        >
          {item.title}
        </h2>

        <p className="text-gray-400 leading-relaxed text-[15px]">
          {item.description}
        </p>

      </div>

      <div className="flex gap-4 mt-8 relative z-10">

        <a
          href={`http://localhost:5000${item.file}`}
          target="_blank"
          rel="noreferrer"
          className="
            px-5
            py-3
            rounded-2xl
            bg-white/10
            hover:bg-white/15
            transition-all
            border
            border-white/10
          "
        >
          Open
        </a>

        <a
  href={`http://localhost:5000${item.file}`}
  download
  onClick={() => {

    fetch("http://localhost:5001/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileName: item.title
      })
    });

  }}
  className="
    px-5
    py-3
    rounded-2xl
    bg-transparent
    border
    border-white/10
    hover:bg-white/5
    transition-all
  "
>
  Download
</a>

      </div>

    </div>

  ))}

</div>

</div>


   
   </div>

    
  );
}