/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./css/flags.css";
("use client");
import { Tooltip as FbTooltip } from "flowbite-react";
import useAuthContext from "../../hooks/useAuthContext";
import { getAllCostumers } from "../../services/clientsManagement/clientsManagementService.jsx";
import{getCampaignsOverView} from "../../services/workspace/workspaceService.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SidebarCampaign from "../Layout/SidebarCampaign.jsx";
import { useParams } from "react-router-dom";

const CustomersTable = () => {
  const { user } = useAuthContext();
  const { campaignId } = useParams();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getAllCostumers(user,campaignId);
        setCustomers(customersData);
      } catch (error) {
        console.error( error);
        setCustomers([]);
      }
    };
    fetchCustomers();

  }, [user,campaignId]);


  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    age: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    gender: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    tel: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    satisfaction: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  

  const getSeverity = (satisfaction) => {
    const satisfactionValue = parseFloat(satisfaction);
    if (satisfactionValue < 4) {
      return "danger";
    } else if (satisfactionValue >= 4 && satisfactionValue < 6) {
      return "warning";
    } else if (satisfactionValue >= 6 && satisfactionValue < 8) {
      return "info";
    } else if (satisfactionValue >= 8) {
      return "success";
    } else {
      return null;
    }
  };
  const getGenderColor = (gender) => {
    switch (gender) {
      case "male":
        return "#02B0F0";
      case "Male":
        return "#02B0F0";
      case "female":
        return "#F75B95";
      case "Female":
        return "#F75B95";
      default:
        return "black";
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  //bodyStyles------------------------------------------
  const satisfactionBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.satisfaction}
        severity={getSeverity(rowData.satisfaction)}
      />
    );
  };
  const genderBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.gender}
        style={{
          color: getGenderColor(rowData.gender),
          backgroundColor: "transparent",
          fontSize: "14px",
        }}
      />
    );
  };
  //export----------------------------------------------
  // const dt = useRef(null);
  const cols = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "age", header: "Age" },
    { field: "gender", header: "Gender" },
    { field: "tel", header: "Telephone" },
    { field: "satisfaction", header: "Satisfaction" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, customers);
        doc.save("customers.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(customers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "customers");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  // search bar ---------------------------------------
  const renderHeader = () => {
    return (

      <div className="flex flex-wrap gap-2 justify-between items-center  dark:bg-[#273945] dark:p-2 dark:rounded">
        <div className="flex items-center dark:text-[#fafaf9]">
          <h4 className="mx-3">Customers</h4>
          <div className="relative">
            <InputText
              className="p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
            <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pi pi-search" />
          </div>
        </div>
        <div className="flex gap-2">
          <FbTooltip
            content="Download as Excel"
            placement="bottom"
            animation="duration-150"
          >
            <Button
              className="p-2 rounded-full bg-green-500 text-white dark:text-[#0c0c09]"
              type="button"
              icon="pi pi-file-excel"
              severity="success"
              rounded
              onClick={exportExcel}
              data-pr-tooltip="XLS"
            />
          </FbTooltip>
          <FbTooltip
            content="Download as PDF"
            placement="bottom"
            animation="duration-150"
          >
            <Button
              className="p-2 rounded-full bg-red-500 text-white dark:text-[#0c0c09]"
              type="button"
              icon="pi pi-file-pdf"
              severity="warning"
              rounded
              onClick={exportPdf}
              data-pr-tooltip="PDF"
            />
          </FbTooltip>
        </div>
      </div>
    );
  };
  const header = renderHeader();
 
  return (
    <Layout
    sidebarCampaign={SidebarCampaign}
      content={
        <>
          <div className="bg-[#EBF0F7]  dark:bg-[#273945]">

          <div className=" bg-[#F9F9F4] flex justify-center h-screen pt-24 px-4 ">
            <div className="card w-11/12 " >
              <Tooltip target=".export-buttons>button" position="bottom" />
              <DataTable
                value={customers}
                className="rounded-md border-2 border-inherit"
                showGridlines
                paginator
                header={header}
                rows={25}
                datakey="id"
                scrollable
                scrollHeight="100vh"
                removableSort
                selectionMode="multiple"
                selection={selectedCustomers}
                onSelectionChange={(e) => setSelectedCustomers(e.value)}
                dragSelection
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                globalFilterFields={[
                  "id",
                  "name",
                  "email",
                  "age",
                  "gender",
                  "tel",
                  "satisfaction",
                ]}
                emptyMessage="No customers found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              >
                {/* <Column field='id'  header="Id" sortable style={{ width: '5rem' }} /> */}
                <Column
                  field="name"
                  frozen
                  header="Name"
                  sortable
                  
                />
                <Column
                  field="email"
                  header="Email"
                  sortable
                 
                />
                <Column
                  field="age"
                  header="Age"
                  sortable
                  dataType="numeric"
                  
                />
                <Column
                  field="gender"
                  header="Gender"
                  sortable
                  
                  body={genderBodyTemplate}
                />
                <Column
                  field="tel"
                  header="Telephone"
                  sortable
                 
                />
                <Column
                  field="satisfaction"
                  header="Satisfaction"
                  sortable
                  
                  body={satisfactionBodyTemplate}
                />
              </DataTable>
            </div>
          </div>
          </div>
        </>
      }
    />
  );
};
export default CustomersTable;
