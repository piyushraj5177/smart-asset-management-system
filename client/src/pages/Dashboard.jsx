import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Dashboard() {

  const [labsCount, setLabsCount] = useState(0);

  const [assetsCount, setAssetsCount] = useState(0);

  const [maintenanceCount, setMaintenanceCount] = useState(0);



  const fetchDashboardData = async () => {

    try {

      // FETCH LABS
      const labsResponse = await axios.get(
        "https://smart-asset-backend-1629.onrender.com/api/labs"
      );

      setLabsCount(labsResponse.data.length);



      // CALCULATE TOTAL ASSETS
      let totalAssets = 0;

      labsResponse.data.forEach((lab) => {

        if (lab.asset_count) {

          totalAssets += Number(lab.asset_count);
        }
      });

      setAssetsCount(totalAssets);



      // FETCH MAINTENANCE
      try {

        const maintenanceResponse = await axios.get(
          "https://smart-asset-backend-1629.onrender.com/api/maintenance"
        );

        setMaintenanceCount(
          maintenanceResponse.data.length
        );

      } catch {

        setMaintenanceCount(0);
      }

    } catch (error) {

      console.log(error);
    }
  };



  useEffect(() => {

    fetchDashboardData();

  }, []);



  return (

    <MainLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div className="bg-white p-8 rounded-3xl shadow-md border-l-[10px] border-blue-900">

          <div className="flex items-center gap-6">

            <img
              src="/tata-logo.png"
              alt="TATA Logo"
              className="w-24 h-24 object-contain"
            />



            <div>

              <h1 className="text-5xl font-extrabold text-blue-900">
                TATA STEEL LIMITED
              </h1>

              <p className="text-2xl text-gray-700 mt-3 font-semibold">
                Smart Asset Management System
              </p>

              <p className="text-lg text-gray-500 mt-1">
                Welcome Admin
              </p>

            </div>

          </div>

        </div>



        {/* DASHBOARD */}

        <div className="bg-white p-10 rounded-3xl shadow-md">

          <h1 className="text-4xl font-bold text-blue-800 mb-10">
            Dashboard Overview
          </h1>



          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* TOTAL LABS */}

            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

              <h2 className="text-3xl font-bold text-blue-900">
                Total Labs
              </h2>

              <p className="text-6xl mt-6 font-extrabold text-blue-700">
                {labsCount}
              </p>

            </div>



            {/* TOTAL ASSETS */}

            <div className="bg-gradient-to-r from-green-100 to-green-200 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

              <h2 className="text-3xl font-bold text-green-900">
                Total Assets
              </h2>

              <p className="text-6xl mt-6 font-extrabold text-green-700">
                {assetsCount}
              </p>

            </div>



            {/* MAINTENANCE */}

            <div className="bg-gradient-to-r from-red-100 to-red-200 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

              <h2 className="text-3xl font-bold text-red-900">
                Maintenance
              </h2>

              <p className="text-6xl mt-6 font-extrabold text-red-700">
                {maintenanceCount}
              </p>

            </div>

          </div>



          {/* FOOTER */}

          <div className="mt-16 border-t pt-6 text-center">

            <p className="text-gray-700 font-semibold text-lg">
              © 2026 TATA STEEL LIMITED | Smart Asset Management System
            </p>



            <p className="text-blue-800 font-bold mt-2">
              Developed By Piyush (VT0526850162)
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;