/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Layout from "../../Layout/Layout";
("use client");
import { FaPlus } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "flowbite-react";
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
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import useAuthContext from "../../../hooks/useAuthContext.jsx";
import SidebarCampaign from "../../Layout/SidebarCampaign.jsx";
import { useParams } from "react-router-dom";
import {
  getMysteryBoxConfigs,
  deletePrizeConfig,
  addMysteryBoxConfig,
  updateMysteryBoxConfig,
} from "../../../services/loyaltyProgrammes/programmesService.jsx";

const MysteryBox = () => {
  const { user } = useAuthContext();

  const { campaignId } = useParams();
  const navigateTo = useNavigate();

  const [prizeConfigs, setPrizeConfigs] = useState([]);
  const [config, setConfig] = useState({
    mysteryBoxPrize: "",
    prizeQuantity: "",
    prizeFrequency: "",
    gender: "",
    minAge: "",
    maxAge: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useRef(null);
  const toast2 = useRef(null);
  const imageRef = useRef();
  const titleRef = useRef();
  const winsConfigRef = useRef();
  const qteRef = useRef();
  const genderRef = useRef();
  const selectedRangeAgeRef = useRef();
  const descRef = useRef();

  const getPrizeConfigs = async () => {
    try {
      const response = await getMysteryBoxConfigs(user, campaignId);
      setPrizeConfigs(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      setPrizeConfigs([]);
    }
  };

  const deleteMysteryBoxConfig = async () => {
    try {
      const response = await deletePrizeConfig(user, prizeId);
      console.log(response);
      getPrizeConfigs();
      setModal2Visible(false);
      showDeleteSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMysteryBox = async () => {
    try {
      const response = await updateMysteryBoxConfig(user, prizeId, config);
      console.log(response);
      getPrizeConfigs();
      setModal3Visible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

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
        setConfig(rowData);
        break;
      default:
        // Handle unexpected cases
        break;
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "New MysteryBox added Successfully.",
      life: 3000,
    });
  };
  const showDeleteSuccess = () => {
    toast2.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Mystery Box deleted Successfully.",
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

  const handleAddMysteryBox = async () => {
    try {
      console.log(config);
      const response = await addMysteryBoxConfig(user, campaignId, config);
      console.log(response);
      setConfig({
        mysteryBoxPrize: "",
        prizeQuantity: "",
        prizeFrequency: "",
        gender: "",
        minAge: "",
        maxAge: "",
      });
      getPrizeConfigs();
      setModal1Visible(false);
      showSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrizeConfigs();
  }, [user, campaignId]);

  useEffect(() => {}, [
    imageRef,
    titleRef,
    winsConfigRef,
    qteRef,
    genderRef,
    selectedRangeAgeRef,
    descRef,
  ]);

  //----------------------TRAITEMENT TABLE--------------

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: {
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
    quantity: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    winConfiguration: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
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
          <h4 className="mx-3">Mystery Boxes</h4>
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

  const [prizeId, setPrizeId] = useState("");

  const actionBodyTemplate = (rowData) => {
    const { id } = rowData;
    setPrizeId(id);
    return (
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => handleToggleModal(3, rowData)}
          className="rounded-full bg-orange-500 text-white p-2 transition duration-100 hover:bg-white hover:text-orange-500"
        >
          <FaPencilAlt className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleToggleModal(2)}
          className="rounded-full bg-red-500 text-white p-2 transition duration-100 hover:bg-white hover:text-red-500"
        >
          <FaRegTrashAlt className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <Layout
      sidebarCampaign={SidebarCampaign}
      content={
        <div className="bg-[#EBF0F7]">
          {/* ----------------------------BUTTONS------------------------- */}
          <div className="flex justify-end pt-20 px-4 ">
            <Button.Group outline>
              <Button
                color="success"
                className="text-lg"
                type="button"
                onClick={() => handleToggleModal(1)}
              >
                <span className="text-base">Add a Mystery Box</span>
                <FaPlus className="pt-1 pb-1 pl-2 h-6 w-6" />
              </Button>

              <Button
                color="light"
                onClick={() => navigateTo(`/mistery-box-winners/${campaignId}`)}
              >
                <span className="text-base">See All Winners</span>
                <TfiCup className="pt-1 pb-1 pl-2 h-6 w-6" />
              </Button>
            </Button.Group>
          </div>
          {/* ----------------------TABLE--------------------------- */}

          <div className="flex justify-center h-screen pt-8 px-4">
            <div className="card" style={{ width: "60rem" }}>
              <DataTable
                value={prizeConfigs}
                className="rounded-md border-inherit border-2"
                paginator
                header={header}
                rows={25}
                dataKey="id"
                scrollable
                scrollHeight="100vh"
                removableSort
                selectionMode="multiple"
                dragSelection
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                emptyMessage="No Mystery boxes found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              >
                <Column
                  field="mysteryBoxPrize"
                  header="Prize"
                  sortable
                  className="text-center"
                  body={(rowData) => (
                    <div className="flex items-center justify-center">
                      <img
                        src="/src/assets/mysterybox.jpeg" // Replace with the actual path to your image
                        alt="Prize"
                        className="w-10 h-10 rounded-full mr-2" // Adjust the size as needed, mr-2 adds margin to the right
                      />
                      <span className="font-semibold">
                        {rowData.mysteryBoxPrize}
                      </span>{" "}
                      {/* Display the prize text with font-semibold */}
                    </div>
                  )}
                />
                <Column
                  field="minAge"
                  header="Min Age"
                  sortable
                  className="text-center"
                />
                <Column
                  field="maxAge"
                  header="Max Age"
                  sortable
                  className="text-center"
                />
                <Column
                  field="gender"
                  header="Gender"
                  sortable
                  className="text-center"
                />
                <Column
                  field="prizeQuantity"
                  header="Quantity"
                  sortable
                  className="text-center"
                />
                <Column
                  field="prizeFrequency"
                  header="Frequency"
                  sortable
                  className="text-center"
                />
                <Column
                  header="Action"
                  body={actionBodyTemplate}
                  exportable={false}
                  className="text-center"
                />
              </DataTable>
            </div>
          </div>
          {/* MODAL OF ADD MysteryBOX--------------------------------- */}
          {modal1Visible && (
            <div
              aria-hidden="true"
              class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center  w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50"
            >
              <div class="relative p-4 w-full max-w-xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Add MysteryBox
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    <div className="space-y-3">
                      <label for="pdp" class="relative cursor-pointer">
                        <div class="relative">
                          <input type="file" id="pdp" class="hidden" />
                          <img
                            class="w-28 h-auto rounded-full"
                            src="src\assets\addImage.png"
                            alt="profile"
                            ref={imageRef}
                            // value={image}
                            // onChange={(e) => setImage(e.target.value)}
                            required
                          />
                          <span class="top-0 left-15 absolute w-9 h-9 bg-[#18A94D] border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                            <FaPlus className="w-4 h-4" />
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col mt-3">
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Add a title"
                            ref={titleRef}
                            value={config?.mysteryBoxPrize}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                mysteryBoxPrize: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="winsConfig"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Wins Configuration
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Every n person"
                            ref={winsConfigRef}
                            value={config?.prizeFrequency}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                prizeFrequency: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="qte"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter available quantity"
                            ref={qteRef}
                            value={config?.prizeQuantity}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                prizeQuantity: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
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
                            value={config?.gender}
                            onChange={(e) =>
                              setConfig({ ...config, gender: e.target.value })
                            }
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Min Age
                          </label>
                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="the minimum age "
                            ref={winsConfigRef}
                            value={config?.minAge}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                minAge: e.target.value,
                              })
                            }
                            required
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
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="the maximum age "
                            ref={winsConfigRef}
                            value={config?.maxAge}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                maxAge: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description
                          </label>
                          <div className="max-w-md">
                            <Textarea
                              id="desc"
                              placeholder="MysteryBox description"
                              rows={4}
                              ref={descRef}
                              // value={desc}
                              // onChange={(e) => setDesc(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <Toast ref={toast} />
                    <Button
                      gradientMonochrome="success"
                      onClick={handleAddMysteryBox}
                    >
                      <FaPlus className="pt-1 pb-1 pr-1 h-5 w-5" />
                      Add new MysteryBox
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {/* -----------------------------------------------------delete Mystery box modal--------------------------------------------------------- */}
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
                      Are you sure you want to delete this prize config?
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
                      onClick={deleteMysteryBoxConfig}
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

          {/* MODAL OF update MysteryBOX--------------------------------- */}
          {modal3Visible && config && (
            <div
              aria-hidden="true"
              class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center  w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50"
            >
              <div class="relative p-4 w-full max-w-xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Update MysteryBox
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    <div className="space-y-3">
                      <label for="pdp" class="relative cursor-pointer">
                        <div class="relative">
                          <input type="file" id="pdp" class="hidden" />
                          <img
                            class="w-28 h-auto rounded-full"
                            src="src\assets\addImage.png"
                            alt="profile"
                            ref={imageRef}
                            // value={image}
                            // onChange={(e) => setImage(e.target.value)}
                            required
                          />
                          <span class="top-0 left-15 absolute w-9 h-9 bg-[#18A94D] border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                            <FaPlus className="w-4 h-4" />
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col mt-3">
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Add a title"
                            ref={titleRef}
                            value={config?.mysteryBoxPrize}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                mysteryBoxPrize: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="winsConfig"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Wins Configuration
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Every n person"
                            ref={winsConfigRef}
                            value={config?.prizeFrequency}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                prizeFrequency: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="qte"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter available quantity"
                            ref={qteRef}
                            value={config?.prizeQuantity}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                prizeQuantity: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
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
                            value={config?.gender}
                            onChange={(e) =>
                              setConfig({ ...config, gender: e.target.value })
                            }
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Min Age
                          </label>
                          <input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="the minimum age "
                            ref={winsConfigRef}
                            value={config?.minAge}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                minAge: e.target.value,
                              })
                            }
                            required
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
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="the maximum age "
                            ref={winsConfigRef}
                            value={config?.maxAge}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                maxAge: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description
                          </label>
                          <div className="max-w-md">
                            <Textarea
                              id="desc"
                              placeholder="MysteryBox description"
                              rows={4}
                              ref={descRef}
                              // value={desc}
                              // onChange={(e) => setDesc(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <Toast ref={toast} />
                    <Button
                      gradientMonochrome="success"
                      onClick={handleUpdateMysteryBox}
                    >
                      <FaPlus className="pt-1 pb-1 pr-1 h-5 w-5" />
                      update MysteryBox
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

export default MysteryBox;
