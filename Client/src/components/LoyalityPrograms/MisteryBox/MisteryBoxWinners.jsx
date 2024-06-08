/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Layout from "../../Layout/Layout";
("use client");
import { Button, Checkbox, Modal } from "flowbite-react";
import { useEffect, useRef, useState} from "react";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { Label, Textarea } from "flowbite-react";
import "../../fontAwsomeIcons/index.js";
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { MBWinnersService } from "../Service/MBWinnersService.jsx";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import SidebarCampaign from "../../Layout/SidebarCampaign.jsx";
import {getMysteryBoxWinners} from '../../../services/loyaltyProgrammes/programmesService.jsx'
import useAuthContext from "../../../hooks/useAuthContext.jsx";
import { useParams } from "react-router-dom";

const MisteryBoxWinners = () => {

  const { user } = useAuthContext();
  const { campaignId } = useParams();



  const [winners, setWinners] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState([]);

  const getWinners = async ()=>{
    try {
        const response = await getMysteryBoxWinners(user,campaignId);
        setWinners(response);
        console.log(response);
    } catch (error) {
        console.log(error);
        setWinners([]);
    }
  }

  useEffect(() => {
      getWinners();
  }, [user,campaignId]);

  const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      winner: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      prize: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      tel: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      winDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      pickedUp: { value: null, matchMode: FilterMatchMode.EQUALS }

    });
  const [globalFilterValue, setGlobalFilterValue] = useState('');


  const pickedUpBodyTemplate = (rowData) => {
      return rowData.pickedUp === true ? <IoMdCheckmarkCircleOutline className="cursor-not-allowed w-4 h-4 text-green-500" /> : <RxCrossCircled className="cursor-not-allowed w-4 h-4 text-red-500"/>;
      }; 
  const prizeBodyTemplate = (rowData) => {
    const prize = rowData.prize;
        return (
            <div className="flex align-items-center gap-2">
                <img alt={prize} src='src\assets\car.png' width="35" />
                <span>{prize}</span>
            </div>
        );
      };

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };

  const renderHeader = () => {
      return (
          <div className="flex flex-wrap gap-2 justify-between items-center dark:bg-[#273945] dark:p-2 dark:rounded">
          <div className="flex items-center dark:text-[#fafaf9]">
              <h4 className="mx-3">MisteryBox Winners</h4>
              <div className="relative">
                  <InputText className="p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
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
        <div className="bg-[#EBF0F7]">
          <div className="flex justify-center h-screen pt-20 px-4">
        <div className="card" style={{ width: '60rem' }}>
            <DataTable value={winners} showGridlines paginator header={header} rows={25} datakey="id"
                    scrollable scrollHeight="100vh" 
                    className="rounded-md border-inherit border-2"
                    removableSort selectionMode="multiple" selection={selectedWinners} onSelectionChange={(e) => setSelectedWinners(e.value)} dragSelection
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} filters={filters}
                    globalFilterFields={['winner','prize','email','tel','winDate','pickedUp']}
                    emptyMessage="No winners found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="name" frozen sortable style={{ minWidth: '8rem' }} header="Winner"/>
                <Column field="mysteryBoxPrize" sortable style={{ minWidth: '12rem' }} header="Prize" />
                <Column field="email" sortable style={{ minWidth: '5rem' }} header="Email"/>
                <Column field="tel" sortable style={{ minWidth: '10rem' }} header="Telephone"/>
                <Column field="winningDate" style={{ minWidth: '8rem' }} header="Win Date"/>
                {/* <Column field="pickedUp" header="Picked Up" dataType="boolean"headerStyle={{ width: '3rem' }} body={pickedUpBodyTemplate}/>            */}
                </DataTable>
        </div>
        </div>
        </div>
      }
    />
  );
};

export default MisteryBoxWinners;
