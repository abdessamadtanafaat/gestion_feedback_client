/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Layout from "../../Layout/Layout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../css/flags.css";
("use client");
import { Button, Checkbox } from "flowbite-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import SidebarCampaign from "../../Layout/SidebarCampaign";
import { useParams } from "react-router-dom";
import { getListOfWinnersByGroup } from "../../../services/loyaltyProgrammes/programmesService";
import useAuthContext from "../../../hooks/useAuthContext";
const PromoCode = () => {
  const {user} = useAuthContext();
  const {couponGroupId} = useParams();
  const [coupon, setCoupon] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const fetchCouponCodesWinners = async()=>{
    try {
        const response = await getListOfWinnersByGroup(user,couponGroupId);
        setCoupon(response);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchCouponCodesWinners();
}, [user,couponGroupId]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    reference: {
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
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    used: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getGenderColor = (gender) => {
    switch (gender) {
      case "Male":
        return "#02B0F0";
      case "Female":
        return "#F75B95";
      default:
        return "black";
    }
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

  const usedBodyTemplate = (rowData) => {
    return rowData.used === true ? (
      <IoMdCheckmarkCircleOutline className="cursor-not-allowed w-4 h-4 text-green-500" />
    ) : (
      <RxCrossCircled className="cursor-not-allowed w-4 h-4 text-red-500" />
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center dark:bg-[#273945] dark:p-2 dark:rounded">
        <div className="flex items-center dark:text-[#fafaf9]">
          <h4 className="mx-3">Customers et Coupons</h4>
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
        {/* <div className="flex gap-2">
                <FbTooltip content="Download as Excel" placement="bottom" animation="duration-150">
                    <Button className="p-2 rounded-full bg-green-500 text-white dark:text-[#0c0c09]" type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                </FbTooltip>
                <FbTooltip content="Download as PDF" placement="bottom" animation="duration-150">
                    <Button className="p-2 rounded-full bg-red-500 text-white dark:text-[#0c0c09]" type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
                </FbTooltip>
            </div> */}
      </div>
    );
  };
  const header = renderHeader();

  return (
    <Layout
      sidebarCampaign={SidebarCampaign}
      content={
        <div className="bg-[#EBF0F7] dark:bg-[#273945]">
          {/* ----------------------------BUTTONS------------------------- */}
          <div className="flex justify-end pt-20 px-4 ">
            <Button color="light">
              <Link to="/promo-codes-list" className="text-base">
                All Promo Codes
              </Link>
              <FaArrowCircleRight className="pt-1 pb-1 pl-2 h-6 w-6" />
            </Button>
          </div>
          {/* ----------------------TABLE--------------------------- */}

          <div className="flex justify-center h-screen pt-8 px-4 ">
            <div className="card" style={{ width: "60rem" }}>
              <DataTable
                value={coupon}
                className="rounded-md border-inherit border-2"
                showGridlines
                paginator
                header={header}
                rows={25}
                datakey="id"
                scrollable
                scrollHeight="100vh"
                removableSort
                selectionMode="multiple"
                selection={selectedCoupons}
                onSelectionChange={(e) => setSelectedCoupons(e.value)}
                dragSelection
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                globalFilterFields={[
                  "name",
                  "reference",
                  "age",
                  "gender",
                  "email",
                  "used",
                ]}
                emptyMessage="No coupons found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              >
                <Column
                  field="name"
                  frozen
                  sortable
                  style={{ minWidth: "10rem" }}
                  header="Name"
                />
                <Column
                  field="discountCodeReference"
                  sortable
                  style={{ minWidth: "8rem" }}
                  header="Ref"
                />
               
                <Column
                  field="email"
                  sortable
                  style={{ minWidth: "15rem" }}
                  header="Email"
                />
                <Column
                  field="tel"
                  sortable
                  style={{ minWidth: "8rem" }}
                  header="Tel"
                  
                />
                <Column
                  field="used"
                  header="Used"
                  dataType="boolean"
                  headerStyle={{ width: "3rem" }}
                  body={usedBodyTemplate}
                />
              </DataTable>
            </div>
          </div>
        </div>
      }
    />
  );
};
export default PromoCode;
