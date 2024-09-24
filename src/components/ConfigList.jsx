// src/ConfigList.js

import React, { useEffect, useState } from "react";
import Table from "./Table.jsx"; // Adjust the path as needed
import { fetchConfigs, deleteConfig, updateConfig } from "../Actions/api.js"; // Adjust the path as needed

const ConfigList = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <Table data={configs} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default ConfigList;
