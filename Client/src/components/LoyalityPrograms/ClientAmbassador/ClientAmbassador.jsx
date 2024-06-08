import React from "react";
import Layout from "../../Layout/Layout";
("use client");
import { useEffect, useRef, useState} from "react";
import Select from "react-select";
import {Textarea } from "flowbite-react";
import "../../fontAwsomeIcons/index.js";
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import '../css/flags.css';
import { CAmbService } from '../Service/CAmbService.jsx';
import { Button, Checkbox } from 'flowbite-react';
import { FaRegTrashAlt } from "react-icons/fa";
import SidebarCampaign from "../../Layout/SidebarCampaign.jsx";
const ClientAmbassador = () => {
  const [clientAmbassador, setClientAmbassador] = useState([]);
  const [selectedClientAmbassadors, setSelectedClientAmbassadors] = useState([]);
  
  useEffect(() => {
      CAmbService.getCAmb().then((data) => setClientAmbassador(data));
  }, []);
  
  const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      age: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      gender: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      amount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  
    });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  
  const getGenderColor=(gender) => {
      switch (gender) {
          case 'Male':
              return '#02B0F0';
          case 'Female':
              return '#F75B95';
          default:
              return 'black';
      }
  };
  
  const genderBodyTemplate = (rowData) => {
      return <Tag value={rowData.gender} style={{ 'color': getGenderColor(rowData.gender), backgroundColor: 'transparent',fontSize: '14px' }} />;
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
              <h4 className="mx-3">Client Ambassadors</h4>
              <div className="relative">
                  <InputText className="p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                  <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pi pi-search" />
              </div>
          </div>
      </div>
      
      );
  };
  const actionBodyTemplate = () => {
    return (
      <div className="flex items-center justify-center space-x-3">
        {/* <button className="rounded-full bg-orange-500 text-white p-2 transition duration-100 hover:bg-white hover:text-orange-500">
          <FaPencilAlt className="h-4 w-4" />
        </button> */}
        <button className="rounded-full bg-red-500 text-white p-2 transition duration-100 hover:bg-white hover:text-red-500">
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
      <>
            
        <div className="flex justify-center h-screen mt-20 mx-4">
        <div className="card" style={{ width: '60rem' }}>
            <DataTable value={clientAmbassador} showGridlines paginator header={header} rows={25} datakey="id"
                    scrollable scrollHeight="100vh"
                    removableSort selectionMode="multiple" selection={selectedClientAmbassadors} onSelectionChange={(e) => setSelectedClientAmbassadors(e.value)} dragSelection
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} filters={filters}
                    globalFilterFields={['name','age','gender','email','amount']}
                    emptyMessage="No client ambassadors found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="name" frozen sortable style={{ minWidth: '10rem' }} header="Name"/>
                <Column field="email" sortable style={{ minWidth: '10rem' }} header="Email"/>
                <Column field="age" sortable style={{ minWidth: '5rem' }} dataType="numeric" header="Age"/>
                <Column field="gender" sortable style={{ minWidth: '8rem' }} header="Gender" body={genderBodyTemplate}/>
                <Column field="amount" sortable style={{ minWidth: '8rem' }} header="Amount"/>
                <Column  header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '4rem' }}/>           
                </DataTable>
        </div>
        </div>
      </>
    }
  />

  )  
}

export default ClientAmbassador