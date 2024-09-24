// components/DynamicTable.js
import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

const DynamicTable = ({ data, columns, toolbarOptions, editing }) => {
  console.log("sss",data);
  return (
    <div className="container mx-auto mt-8">
      {/* Card Structure */}
      <div className="bg-white rounded-lg ">
        <GridComponent
          dataSource={data}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
          height="auto"
        >
          <ColumnsDirective>
            {columns.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default DynamicTable;
