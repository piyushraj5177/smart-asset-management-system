import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

import jsPDF from "jspdf";

import MainLayout from "../layouts/MainLayout";

function AssetDetails() {

  const { id } = useParams();

  const [asset, setAsset] = useState(null);

  const [maintenance, setMaintenance] = useState([]);

  const [maintenanceData, setMaintenanceData] = useState({
    issue_description: "",
    maintenance_status: "",
    technician_name: "",
    remarks: "",
  });





  // FETCH ASSET
  const fetchAsset = async () => {

    try {

      const response = await axios.get(
        `https://smart-asset-backend-1629.onrender.com/api/assets/details/${id}`
      );

      setAsset(response.data);

    } catch (error) {

      console.log(error);
    }
  };





  // FETCH MAINTENANCE
  const fetchMaintenance = async () => {

    try {

      const response = await axios.get(
        `https://smart-asset-backend-1629.onrender.com/api/maintenance/${id}`
      );

      setMaintenance(response.data);

    } catch (error) {

      console.log(error);
    }
  };





  useEffect(() => {

    fetchAsset();

    fetchMaintenance();

  }, []);





  // HANDLE MAINTENANCE INPUT
  const handleMaintenanceChange = (e) => {

    setMaintenanceData({
      ...maintenanceData,
      [e.target.name]: e.target.value,
    });
  };





  // ADD MAINTENANCE
  const addMaintenance = async () => {

    try {

      await axios.post(
        "https://smart-asset-backend-1629.onrender.com/api/maintenance/add",
        {
          asset_id: asset.id,
          ...maintenanceData,
        }
      );





      alert("Maintenance Added Successfully");





      setMaintenanceData({
        issue_description: "",
        maintenance_status: "",
        technician_name: "",
        remarks: "",
      });





      fetchMaintenance();

    } catch (error) {

      console.log(error);

      alert("Failed To Add Maintenance");
    }
  };


const deleteMaintenanceRecord = async (maintenanceId) => {

  try {

    await axios.delete(
      `https://smart-asset-backend-1629.onrender.com/api/maintenance/delete/${maintenanceId}`
    );





    alert("Maintenance Deleted");





    fetchMaintenance();

  } catch (error) {

    console.log(error);

    alert("Failed To Delete Maintenance");
  }
};


  // DOWNLOAD PDF
  const downloadAssetPDF = () => {

    const doc = new jsPDF();





    doc.setFontSize(22);

    doc.text(
      "Asset Details Report",
      20,
      20
    );





    doc.setFontSize(14);

    doc.text(
      `Asset Name: ${asset.asset_name}`,
      20,
      40
    );

    doc.text(
      `Asset Code: ${asset.asset_code}`,
      20,
      52
    );

    doc.text(
      `Processor: ${asset.processor}`,
      20,
      64
    );

    doc.text(
      `RAM: ${asset.ram}`,
      20,
      76
    );

    doc.text(
      `Storage: ${asset.storage}`,
      20,
      88
    );

    doc.text(
      `Brand: ${asset.brand}`,
      20,
      100
    );

    doc.text(
      `Model: ${asset.model}`,
      20,
      112
    );

    doc.text(
      `Serial Number: ${asset.serial_number}`,
      20,
      124
    );

    doc.text(
      `Condition: ${asset.asset_condition}`,
      20,
      136
    );

    doc.text(
      `Status: ${asset.asset_status}`,
      20,
      148
    );

    doc.text(
      `Purchase Date: ${asset.purchase_date}`,
      20,
      160
    );





    doc.save(
      `${asset.asset_name}_Details.pdf`
    );
  };





  // LOADING
  if (!asset) {

    return (
      <MainLayout>
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </MainLayout>
    );
  }






  return (
    <MainLayout>

      {/* ASSET DETAILS CARD */}

      <div className="bg-white p-10 rounded-xl shadow-md">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          {asset.asset_name}
        </h1>





        {/* QR CODE */}

        <div className="flex justify-center mb-10">

          <QRCodeCanvas
            value={`http://localhost:5173/asset/${asset.id}`}
            size={220}
          />

        </div>





        {/* ASSET DETAILS */}

        <div className="grid grid-cols-2 gap-6 text-lg">

          <p>
            <strong>Asset Code:</strong> {asset.asset_code}
          </p>

          <p>
            <strong>Processor:</strong> {asset.processor}
          </p>

          <p>
            <strong>RAM:</strong> {asset.ram}
          </p>

          <p>
            <strong>Storage:</strong> {asset.storage}
          </p>

          <p>
            <strong>Brand:</strong> {asset.brand}
          </p>

          <p>
            <strong>Model:</strong> {asset.model}
          </p>

          <p>
            <strong>Serial Number:</strong> {asset.serial_number}
          </p>

          <p>
            <strong>Status:</strong> {asset.asset_status}
          </p>

          <p>
            <strong>Condition:</strong> {asset.asset_condition}
          </p>

          <p>
            <strong>Purchase Date:</strong> {asset.purchase_date}
          </p>

        </div>





        {/* DOWNLOAD PDF */}

        <button
          onClick={downloadAssetPDF}
          className="bg-red-700 text-white px-6 py-3 rounded-lg mt-10 hover:bg-red-800"
        >
          Download Asset PDF
        </button>

      </div>






      {/* MAINTENANCE SECTION */}

      <div className="bg-white p-8 rounded-xl shadow-md mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Maintenance Management
        </h2>





        {/* MAINTENANCE FORM */}

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="issue_description"
            placeholder="Issue Description"
            className="border p-3 rounded-lg"
            value={maintenanceData.issue_description}
            onChange={handleMaintenanceChange}
          />





          <input
            type="text"
            name="maintenance_status"
            placeholder="Maintenance Status"
            className="border p-3 rounded-lg"
            value={maintenanceData.maintenance_status}
            onChange={handleMaintenanceChange}
          />





          <input
            type="text"
            name="technician_name"
            placeholder="Technician Name"
            className="border p-3 rounded-lg"
            value={maintenanceData.technician_name}
            onChange={handleMaintenanceChange}
          />





          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            className="border p-3 rounded-lg"
            value={maintenanceData.remarks}
            onChange={handleMaintenanceChange}
          />

        </div>





        {/* ADD BUTTON */}

        <button
          onClick={addMaintenance}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-orange-700"
        >
          Add Maintenance
        </button>





        {/* MAINTENANCE HISTORY */}

        <div className="mt-10">

          <h3 className="text-2xl font-bold mb-4">
            Maintenance History
          </h3>





          {maintenance.length === 0 ? (

            <p className="text-gray-500">
              No Maintenance Records Found
            </p>

          ) : (

            maintenance.map((item) => (

              <div
                key={item.id}
                className="border p-4 rounded-lg mb-4"
              >

                <p>
                  <strong>Issue:</strong>
                  {" "}
                  {item.issue_description}
                </p>

                <p>
                  <strong>Status:</strong>
                  {" "}
                  {item.maintenance_status}
                </p>

                <p>
                  <strong>Technician:</strong>
                  {" "}
                  {item.technician_name}
                </p>

                <p>
                  <strong>Remarks:</strong>
                  {" "}
                  {item.remarks}
                </p>

                <p>
                  <strong>Date:</strong>
                  {" "}
                  {item.maintenance_date}
                </p>
                <button
  onClick={() =>
    deleteMaintenanceRecord(item.id)
  }
  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700"
>
  Delete Maintenance
</button>

              </div>

            ))

          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default AssetDetails;