import React, { useState } from "react";

const Table = ({ data, onDelete, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on the search term
  const filteredData = data.filter((config) =>
    config.config_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8 p-4 bg-main-bg rounded-lg shadow-lg">
      <h1 className="text-2xl font-display mb-4">Configurations</h1>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <table className="min-w-full border border-color">
        <thead className="bg-secondary-dark-bg text-white">
          <tr>
            <th className="border-b border-color px-4 py-2">ID</th>
            <th className="border-b border-color px-4 py-2">Type</th>
            <th className="border-b border-color px-4 py-2">Values</th>
            <th className="border-b border-color px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 dark:text-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((config) => (
              <tr key={config._id} className="hover:bg-light-gray">
                <td className="border-b border-color px-4 py-2">{config._id}</td>
                <td className="border-b border-color px-4 py-2">{config.config_type}</td>
                <td className="border-b border-color px-4 py-2">
                  {config.config_values.map((value) => (
                    <div key={value._id}>{value.type}</div>
                  ))}
                </td>
                <td className="border-b border-color px-4 py-2">
                  <button
                    onClick={() => onUpdate(config._id, { /* updated values */ })}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(config._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center border-b border-color px-4 py-2">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
