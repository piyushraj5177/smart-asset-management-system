import {
  LayoutDashboard,
  Building2,
  Boxes,
  QrCode,
  Users,
  Wrench,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();



  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged Out");

    window.location.href = "/";
  };



  return (

    <div className="w-[280px] min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white p-6 shadow-2xl">

      {/* LOGO */}

      <div className="flex flex-col items-center mb-12">

        <img
          src="/tata-logo.png"
          alt="TATA Logo"
          className="w-24 h-24 object-contain mb-3"
        />



        <h1 className="text-3xl font-extrabold text-center leading-tight">

          TATA STEEL

        </h1>



        <p className="text-sm text-blue-200 mt-2 text-center">

          Smart Asset Management

        </p>

      </div>



      {/* MENU */}

      <div className="space-y-4">

        {/* DASHBOARD */}

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-4 hover:bg-blue-700 p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <LayoutDashboard size={22} />
          <span className="text-lg">Dashboard</span>
        </div>



        {/* LABS */}

        <div
          onClick={() => navigate("/labs")}
          className="flex items-center gap-4 hover:bg-blue-700 p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Building2 size={22} />
          <span className="text-lg">Labs</span>
        </div>



        {/* ASSETS */}

        <div
          className="flex items-center gap-4 hover:bg-blue-700 p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Boxes size={22} />
          <span className="text-lg">Assets</span>
        </div>



        {/* QR CODES */}

        <div
          className="flex items-center gap-4 hover:bg-blue-700 p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <QrCode size={22} />
          <span className="text-lg">QR Codes</span>
        </div>



        {/* USERS */}

        <div
          className="flex items-center gap-4 hover:bg-blue-700 p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Users size={22} />
          <span className="text-lg">Users</span>
        </div>



        {/* MAINTENANCE */}

        <div
          className="flex items-center gap-4 hover:bg-blue-700 p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Wrench size={22} />
          <span className="text-lg">Maintenance</span>
        </div>

      </div>



      {/* FOOTER */}

      <div className="mt-16 border-t border-blue-700 pt-6">

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 bg-red-600 px-4 py-4 rounded-2xl w-full hover:bg-red-700 transition duration-300 text-lg font-semibold"
        >
          <LogOut size={22} />
          Logout
        </button>



        <p className="text-center text-xs text-blue-200 mt-6">

          Developed By

        </p>



        <p className="text-center text-sm font-bold text-white">

          Piyush (VT0526850162)

        </p>

      </div>

    </div>
  );
}

export default Sidebar;