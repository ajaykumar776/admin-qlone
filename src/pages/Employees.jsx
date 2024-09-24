// pages/Employees.js
import React from "react";
import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import DynamicTable from "../components/DynamicTable";

const Employees = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div>
      <Header category="Page" title="Employees" />
      <DynamicTable 
        data={employeesData} 
        columns={employeesGrid} 
        toolbarOptions={toolbarOptions} 
        editing={editing} 
      />
    </div>
  );
};

export default Employees;
