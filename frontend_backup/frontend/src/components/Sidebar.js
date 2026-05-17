import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-full p-4">
      <h2 className="text-2xl font-bold mb-6">Crime Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/prediction">Prediction</Link>
        <Link to="/map">Crime Map</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
