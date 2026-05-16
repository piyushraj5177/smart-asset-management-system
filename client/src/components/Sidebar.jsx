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

    <div className="w-full md:w-[280px] bg-gradient-to-b from-blue-950 to-blue-900 text-white p-4 md:p-6 shadow-2xl">

      {/* LOGO */}

      <div className="flex flex-col items-center mb-8 md:mb-12">

        <img
          src="/tata-logo.png"
          alt="TATA Logo"
          className="w-20 h-20 md:w-24 md:h-24 object-contain mb-3"
        />

        <h1 className="text-2xl md:text-3xl font-extrabold text-center leading-tight">

          TATA STEEL

        </h1>

        <p className="text-xs md:text-sm text-blue-200 mt-2 text-center">

          Smart Asset Management

        </p>

      </div>

      {/* MENU */}

      <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:space-y-4">

        {/* DASHBOARD */}

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 hover:bg-blue-700 p-3 md:p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <LayoutDashboard size={20} />
          <span className="text-sm md:text-lg">
            Dashboard
          </span>
        </div>

        {/* LABS */}

        <div
          onClick={() => navigate("/labs")}
          className="flex items-center gap-3 hover:bg-blue-700 p-3 md:p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Building2 size={20} />
          <span className="text-sm md:text-lg">
            Labs
          </span>
        </div>

        {/* ASSETS */}

        <div
          className="flex items-center gap-3 hover:bg-blue-700 p-3 md:p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Boxes size={20} />
          <span className="text-sm md:text-lg">
            Assets
          </span>
        </div>

        {/* QR CODES */}

        <div
          className="flex items-center gap-3 hover:bg-blue-700 p-3 md:p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <QrCode size={20} />
          <span className="text-sm md:text-lg">
            QR Codes
          </span>
        </div>

        {/* USERS */}

        <div
          className="flex items-center gap-3 hover:bg-blue-700 p-3 md:p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Users size={20} />
          <span className="text-sm md:text-lg">
            Users
          </span>
        </div>

        {/* MAINTENANCE */}

        <div
          className="flex items-center gap-3 hover:bg-blue-700 p-3 md:p-4 rounded-2xl cursor-pointer transition duration-300"
        >
          <Wrench size={20} />
          <span className="text-sm md:text-lg">
            Maintenance
          </span>
        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-10 md:mt-16 border-t border-blue-700 pt-6">

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 bg-red-600 px-4 py-3 md:py-4 rounded-2xl w-full hover:bg-red-700 transition duration-300 text-base md:text-lg font-semibold"
        >
          <LogOut size={20} />
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