/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import React from "react";
import Layout from "../../Layout/Layout";
("use client");
import { useEffect, useRef, useState } from "react";
import "../../fontAwsomeIcons/index.js";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../css/flags.css";
import { Button, Checkbox } from "flowbite-react";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { InputSwitch } from "primereact/inputswitch";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  getCouponCodeConfigByCampaign,
  addCouponCodeConfig,
  deleteCouponCodeConfig,
  updateCouponCodeConfig
} from "../../../services/loyaltyProgrammes/programmesService.jsx";
import useAuthContext from "../../../hooks/useAuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SidebarCampaign from "../../Layout/SidebarCampaign.jsx";
import { useParams } from "react-router-dom";

const PromoCodeList = () => {
  const { user } = useAuthContext();

  const { campaignId } = useParams();
  const [discountConfigs, setDiscountConfigs] = useState([]);
  const [discountConfigData, setDiscountConfigData] = useState({
    couponCode: "",
    couponValue: "",
    couponCodeStatus: "",
    minAge: "",
    maxAge: "",
    gender: "",
  });
  const [couponId, setCouponId] = useState("");
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const toast = useRef(null);
  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success!",
  //     detail: "New Coupon Code added Successfully.",
  //     life: 3000,
  //   });
  // };

  const handleToggleModal = (modalNumber, rowData) => {
    switch (modalNumber) {
      case 1:
        setModal1Visible(!modal1Visible);
        break;
      case 2:
        setModal2Visible(!modal2Visible);
        break;
      case 3:
        setModal3Visible(!modal3Visible);
        setDiscountConfigData(rowData);
        break;
      default:
        // Handle unexpected cases
        break;
    }
  };

  const getCouponConfig = async () => {
    try {
      const response = await getCouponCodeConfigByCampaign(user, campaignId);
      setDiscountConfigs(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      setDiscountConfigs([]);
    }
  };

  const handleAddCouponCode = async () => {
    try {
      const response = await addCouponCodeConfig(
        user,
        campaignId,
        discountConfigData
      );
      console.log(response);
      setDiscountConfigData({
        couponCode: "",
        couponValue: "",
        couponCodeStatus: "",
        minAge: "",
        maxAge: "",
        gender: "",
      });
      getCouponConfig();
      setModal1Visible(false);
      
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCouponGroup = async () => {
    try {
      const response = await deleteCouponCodeConfig(user, couponId);
      console.log(response);
      getCouponConfig();
      setModal2Visible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCouponCode = async ()=>{
    try {
      const response = await updateCouponCodeConfig(user, couponId,discountConfigData);
      console.log(response);
      getCouponConfig();
      setModal3Visible(false);
      toast.current.show({ severity: "success", summary: 'success', detail: 'Coupon Code updated Successfully.', life: 3000 });
    } catch (error) {
      console.log(error);
    }

  }

  

  const [errorMessage, setErrorMessage] = useState("");
  
  const toast2 = useRef(null);

  const nameRef = useRef();
  const reductionRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const statusRef = useRef();

 
  const showDeleteSuccess = () => {
    toast2.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Coupon Code deleted Successfully.",
      life: 3000,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error occured!",
      detail: message,
      life: 3000,
    });
  };
  useEffect(() => {
    getCouponConfig();
    nameRef.current?.focus();
  }, [user, campaignId]);

  useEffect(() => {}, [nameRef, reductionRef, genderRef, ageRef, statusRef]);

  // ---------------------------------------------------TABLE----------------------------

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
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
    reduction: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getGenderColor = (gender) => {
    switch (gender) {
      case "Male":
        return "#02B0F0";
      case "male":
        return "#02B0F0";
      case "Female":
        return "#F75B95";
      case "female":
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
          <h4 className="mx-3">Promo Codes</h4>
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
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    const { id } = rowData;
    setCouponId(id);
    return (
      <>
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => handleToggleModal(3, rowData)}
            className="rounded-full bg-orange-500 text-white p-2 transition duration-100 hover:bg-white hover:text-orange-500"
          >
            <FaPencilAlt className="h-4 w-4" />
          </button>
          <button
            className="rounded-full bg-red-500 text-white p-2 transition duration-100 hover:bg-white hover:text-red-500"
            onClick={() => handleToggleModal(2)}
          >
            <FaRegTrashAlt className="h-4 w-4" />
          </button>
        </div>
      </>
    );
  };

  const reductionBodyTemplate = (rowData) => {
    const reduction = rowData.couponValue;
    return (
      <div className="text-green-500">
        <span>{reduction}%</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    const status = rowData.couponCodeStatus;
    return (
      <div className="flex align-items-center">
        {status === true ? (
          <FaToggleOn className="cursor-not-allowed w-8 h-auto text-green-500" />
        ) : (
          <FaToggleOff className="cursor-not-allowed w-8 h-auto text-gray-500" />
        )}
      </div>
    );
  };
  const header = renderHeader();

  const navigate = useNavigate();
  const handleRowClick = (rowData) => {
    console.log(rowData.data);
    const id = rowData.data.id;
    console.log("id:", id);
    navigate(`/promo-code/${id}`);
  };

  return (
    <Layout
      sidebarCampaign={SidebarCampaign}
      content={
        <div className="bg-[#EBF0F7]  dark:bg-[#273945]">
          {/* ----------------------------BUTTONS------------------------- */}
          <div className="relative flex  justify-end pt-20 w-11/12 mx-auto ">
            <button
              className=""
              type="button"
              onClick={() => handleToggleModal(1)}
            >
              <span className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  bg-success text-white mb-2">
                <span className="mr-2">Add a PromoCode</span>
                <FaPlus />
              </span>
            </button>
            <Toast ref={toast} />
          </div>
          {/* ----------------------TABLE--------------------------- */}
          <div className="flex justify-center h-screen pt-8">
            <div className="card w-11/12">
              <DataTable
                value={discountConfigs} // Wrap the discountConfigData in an array if you only have one object
                className="rounded-md border-2 border-inherit"
                showGridlines
                scrollable
                scrollHeight="100vh"
                onRowClick={(rowData) => handleRowClick(rowData)}
                paginator
                header={header}
                rows={25}
                datakey="id"
                removableSort
                selectionMode="multiple"
                dragSelection
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                globalFilterFields={[
                  "minAge",
                  "maxAge",
                  "gender",
                  "couponCode",
                  "couponValue",
                  "couponCodeStatus",
                ]}
                emptyMessage="No Promo Codes found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              >
                <Column field="couponCode" header="Coupon Code" sortable/>
                <Column
                  field="couponValue"
                  style={{ minWidth: "3rem" }}
                  header="Reduction"
                  className="text-center"
                  body={reductionBodyTemplate}
                  sortable
                />

                <Column
                  field="minAge"
                  header="Min Age"
                  className="text-center"
                  sortable
                />
                <Column
                  field="maxAge"
                  header="Max Age"
                  className="text-center"
                  sortable
                />
                <Column
                  field="gender"
                  header="Gender"
                  body={genderBodyTemplate}
                  sortable
                />
                <Column
                  field="couponCodeStatus"
                  style={{ minWidth: "3rem" }}
                  header="Status"
                  body={statusBodyTemplate}
                  
                />
                <Column
                  header="Action"
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "6rem" }}
                  className="text-center"
                />
              </DataTable>
            </div>
          </div>
          {/* ----------------------MODAL--------------------------- */}
          {modal1Visible && (
            <div
              aria-hidden="true"
              class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50"
            >
              <div class="relative p-4 w-full max-w-xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Add promoCode
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleToggleModal(1)}
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form class="p-4 md:p-5">
                    <div className="flex flex-col mt-3">
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Add a name"
                            ref={nameRef}
                            value={discountConfigData?.couponCode}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                couponCode: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="reduction"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Reduction
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Add value of reduction"
                            ref={reductionRef}
                            value={discountConfigData.couponValue}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                couponValue: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="gender"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Gender
                          </label>
                          <select
                            name="gender"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            ref={genderRef}
                            value={discountConfigData.gender}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                gender: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Min Age
                          </label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter the minimum age"
                            ref={ageRef}
                            value={discountConfigData.minAge}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                minAge: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Max Age
                          </label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter the maximum age"
                            ref={ageRef}
                            value={discountConfigData.maxAge}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                maxAge: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Status
                          </label>

                          <label class="inline-flex items-center mb-5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={discountConfigData.couponCodeStatus} // Use 'checked' instead of 'value'
                              onChange={(e) =>
                                setDiscountConfigData({
                                  ...discountConfigData,
                                  couponCodeStatus: e.target.checked, // Use 'checked' to get the checked state
                                })
                              }
                              className="sr-only peer" // Use 'className' instead of 'class'
                            />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                              disabled / enabled{" "}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <Toast ref={toast} />
                    <Button
                      gradientMonochrome="success"
                      onClick={handleAddCouponCode}
                    >
                      <FaPlus className="pt-1 pb-1 pr-1 h-5 w-5" />
                      Add new coupon code
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {/* -----------------------------------------------------delete promo code modal--------------------------------------------------------- */}
          {modal2Visible && (
            <div
              aria-hidden="true"
              class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50"
            >
              <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleToggleModal(2)}
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-4 md:p-5 text-center">
                    <svg
                      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this Promo Code?
                    </h3>
                    <Toast ref={toast2} />
                    {/* <button data-modal-hide="delete-item-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleDeletePromoCode}>
                    Yes, I'm sure
                </button> */}
                    <Button
                      label="Danger"
                      data-modal-hide="delete-item-modal"
                      severity="danger"
                      className="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-2 py-1 text-center"
                      onClick={deleteCouponGroup}
                    >
                      Yes, I'm sure
                    </Button>
                    <button
                      onClick={() => handleToggleModal(2)}
                      type="button"
                      class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------update MODAL--------------------------- */}
          {modal3Visible && discountConfigData && (
            <div
              aria-hidden="true"
              class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50"
            >
              <div class="relative p-4 w-full max-w-xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      update promoCode
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleToggleModal(3)}
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form class="p-4 md:p-5">
                    <div className="flex flex-col mt-3">
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            ref={nameRef}
                            value={discountConfigData.couponCode}  
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="reduction"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Reduction
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Add value of reduction"
                            ref={reductionRef}
                            value={discountConfigData.couponValue}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                couponValue: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="gender"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Gender
                          </label>
                          <select
                            name="gender"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            ref={genderRef}
                            value={discountConfigData.gender}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                gender: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Min Age
                          </label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter the minimum age"
                            ref={ageRef}
                            value={discountConfigData.minAge}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                minAge: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Max Age
                          </label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter the maximum age"
                            ref={ageRef}
                            value={discountConfigData.maxAge}
                            onChange={(e) =>
                              setDiscountConfigData({
                                ...discountConfigData,
                                maxAge: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Status
                          </label>

                          <label class="inline-flex items-center mb-5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={discountConfigData.couponCodeStatus} // Use 'checked' instead of 'value'
                              onChange={(e) =>
                                setDiscountConfigData({
                                  ...discountConfigData,
                                  couponCodeStatus: e.target.checked, // Use 'checked' to get the checked state
                                })
                              }
                              className="sr-only peer" // Use 'className' instead of 'class'
                            />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            
                          </label>
                        </div>
                      </div>
                    </div>
                    <Toast ref={toast} />
                    <Button
                      gradientMonochrome="success"
                      onClick={handleUpdateCouponCode}
                    >
                      <FaPlus className="pt-1 pb-1 pr-1 h-5 w-5" />
                      update coupon code
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};

export default PromoCodeList;
