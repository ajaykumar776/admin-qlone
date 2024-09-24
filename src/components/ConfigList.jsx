import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import DynamicTable from "./DynamicTable"; // Import the dynamic table component
import { fetchConfigs, deleteConfig, updateConfig } from "../Actions/api"; // Adjust the path as needed

const ConfigList = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    const getConfigs = async () => {
      try {
        const response = await fetchConfigs();
        setConfigs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getConfigs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteConfig(id);
      setConfigs((prev) => prev.filter((config) => config._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updatedConfig) => {
    try {
      await updateConfig(id, updatedConfig);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredConfigs = configs.filter((config) =>
    config.config_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "_id", headerText: "ID", width: "150", textAlign: "Center" },
    { field: "config_type", headerText: "Type", width: "200" },
    {
      field: "config_values",
      headerText: "Values",
      width: "250",
      template: (rowData) => (
        <div>
          {rowData.config_values.map((value) => (
            <div key={value._id}>{value.type}</div>
          ))}
        </div>
      ),
    },
    {
      field: "actions",
      headerText: "Actions",
      width: "150",
      template: (rowData) => (
        <div>
          <button
            onClick={() => handleUpdate(rowData._id, { /* updated values */ })}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(rowData._id)}
            className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-display mb-4">Configurations</h1>

      {/* Add Configuration Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/add-config')} // Use navigate to go to the Add Config Form
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Configuration
        </button>
      </div>

      {/* Card Structure for DynamicTable */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <DynamicTable 
          data={filteredConfigs} 
          columns={columns} 
          toolbarOptions={["Search"]} 
          editing={{ allowDeleting: true, allowEditing: true }} 
        />
      </div>
    </div>
  );
};

export default ConfigList;
