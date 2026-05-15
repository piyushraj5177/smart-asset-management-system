import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import MainLayout from "../layouts/MainLayout";

function Labs() {

  const navigate = useNavigate();

  const [labs, setLabs] = useState([]);

  const [editingLabId, setEditingLabId] =
    useState(null);

  const [formData, setFormData] = useState({
    lab_name: "",
    lab_code: "",
    room_number: "",
    department: "",
    description: "",
  });

  const [extraFields, setExtraFields] =
    useState([]);

  // FETCH LABS
  const fetchLabs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/labs"
      );

      setLabs(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchLabs();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD EXTRA FIELD
  const addExtraField = () => {

    setExtraFields([
      ...extraFields,
      {
        key: "",
        value: "",
      },
    ]);
  };

  // HANDLE EXTRA FIELD CHANGE
  const handleExtraFieldChange = (
    index,
    field,
    value
  ) => {

    const updatedFields = [...extraFields];

    updatedFields[index][field] = value;

    setExtraFields(updatedFields);
  };

  // DELETE EXTRA FIELD
  const deleteExtraField = (index) => {

    const updatedFields =
      extraFields.filter(
        (_, i) => i !== index
      );

    setExtraFields(updatedFields);
  };

  // CREATE OR UPDATE LAB
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const filteredExtraFields =
        extraFields.filter(
          (item) =>
            item.key?.trim() &&
            item.value?.trim()
        );

      // UPDATE LAB
      if (editingLabId) {

        await axios.put(
          `http://localhost:5000/api/labs/${editingLabId}`,
          {
            ...formData,
            extra_details:
              filteredExtraFields,
          }
        );

        alert("Lab Updated Successfully");

      }

      // CREATE LAB
      else {

        await axios.post(
          "http://localhost:5000/api/labs",
          {
            ...formData,
            extra_details:
              filteredExtraFields,
          }
        );

        alert("Lab Created Successfully");
      }

      fetchLabs();

      // RESET FORM
      setFormData({
        lab_name: "",
        lab_code: "",
        room_number: "",
        department: "",
        description: "",
      });

      setExtraFields([]);

      setEditingLabId(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  // DELETE LAB
  const handleDeleteLab = async (labId) => {

    const confirmDelete = window.confirm(
      "Delete Entire Lab And All Assets?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/labs/${labId}`
      );

      alert("Lab Deleted Successfully");

      fetchLabs();

    } catch (error) {

      console.log(error);

      alert("Failed To Delete Lab");
    }
  };

  // EDIT LAB
  const handleEditLab = (lab) => {

    setEditingLabId(lab.id);

    setFormData({
      lab_name: lab.lab_name || "",
      lab_code: lab.lab_code || "",
      room_number: lab.room_number || "",
      department: lab.department || "",
      description: lab.description || "",
    });

    try {

      const parsedDetails =
        typeof lab.extra_details === "string"
          ? JSON.parse(lab.extra_details)
          : lab.extra_details || [];

      setExtraFields(parsedDetails);

    } catch {

      setExtraFields([]);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">
        Labs Management
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-10"
      >

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="lab_name"
            placeholder="Lab Name"
            className="border p-3 rounded-lg"
            value={formData.lab_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lab_code"
            placeholder="Lab Code"
            className="border p-3 rounded-lg"
            value={formData.lab_code}
            onChange={handleChange}
          />

          <input
            type="text"
            name="room_number"
            placeholder="Room Number"
            className="border p-3 rounded-lg"
            value={formData.room_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="border p-3 rounded-lg"
            value={formData.department}
            onChange={handleChange}
          />

        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 rounded-lg w-full mt-4"
          value={formData.description}
          onChange={handleChange}
        />

        {/* EXTRA DETAILS */}

        {extraFields.map((field, index) => (

          <div
            key={index}
            className="flex gap-3 mt-4"
          >

            <input
              type="text"
              placeholder="Detail Name"
              className="border p-3 rounded-lg w-full"
              value={field.key}
              onChange={(e) =>
                handleExtraFieldChange(
                  index,
                  "key",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Detail Value"
              className="border p-3 rounded-lg w-full"
              value={field.value}
              onChange={(e) =>
                handleExtraFieldChange(
                  index,
                  "value",
                  e.target.value
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                deleteExtraField(index)
              }
              className="bg-red-600 text-white px-4 rounded-lg"
            >
              Delete
            </button>

          </div>

        ))}

        {/* BUTTONS */}

        <div className="flex gap-4 mt-5">

          <button
            type="button"
            onClick={addExtraField}
            className="bg-gray-700 text-white px-5 py-3 rounded-lg"
          >
            Add More Details
          </button>

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            {editingLabId
              ? "Update Lab"
              : "Create Lab"}
          </button>

        </div>

      </form>

      {/* LABS */}

      <div className="grid grid-cols-3 gap-6">

        {labs.map((lab) => (

          <div
            key={lab.id}
            className="bg-white p-6 rounded-xl shadow-md"
          >

            <h2 className="text-2xl font-bold text-blue-700">
              {lab.lab_name}
            </h2>

            <p className="mt-2">
              <strong>Code:</strong>{" "}
              {lab.lab_code}
            </p>

            <p>
              <strong>Room:</strong>{" "}
              {lab.room_number}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {lab.department}
            </p>

            <p className="mt-3 text-gray-600">
              {lab.description}
            </p>

            {/* EXTRA DETAILS */}

            {lab.extra_details &&

              (() => {

                try {

                  const details =
                    typeof lab.extra_details ===
                    "string"
                      ? JSON.parse(
                          lab.extra_details
                        )
                      : lab.extra_details;

                  return details.map(
                    (detail, index) => {

                      if (
                        !detail.key?.trim() ||
                        !detail.value?.trim()
                      ) {
                        return null;
                      }

                      return (
                        <p
                          key={index}
                          className="mt-1"
                        >
                          <strong>
                            {detail.key}:
                          </strong>{" "}
                          {detail.value}
                        </p>
                      );
                    }
                  );

                } catch {

                  return null;
                }
              })()}

            {/* ACTION BUTTONS */}

            <div className="flex flex-wrap gap-3 mt-5">

              <button
                onClick={() =>
                  handleEditLab(lab)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit Lab
              </button>

              <button
                onClick={() =>
                  handleDeleteLab(lab.id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete Lab
              </button>

              <button
                onClick={() =>
                  navigate(`/labs/${lab.id}`)
                }
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Open Lab
              </button>

            </div>

            {/* QR CODE */}

            <div className="mt-6 flex justify-center">

              <QRCodeCanvas
                value={`http://localhost:5173/labs/${lab.id}`}
                size={140}
              />

            </div>

          </div>

        ))}

      </div>

    </MainLayout>
  );
}

export default Labs;