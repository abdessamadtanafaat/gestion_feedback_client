import React from "react";
import Layout from "../../Layout/Layout";
("use client");
import { Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState} from "react";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { Label, Textarea } from "flowbite-react";
import "../../fontAwsomeIcons/index.js";
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';


const AddModal = () => {
    const [selectedRangeAge, setSelectedRangeAge] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [winsConfig, setWinsConfig] = useState("");
    const [qte, setQte] = useState("");
    const [gender, setGender] = useState("");
    const [desc, setDesc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const toast = useRef(null);
    const imageRef = useRef();
    const titleRef = useRef();
    const winsConfigRef = useRef();
    const qteRef = useRef();
    const genderRef = useRef();
    const selectedRangeAgeRef = useRef();
    const descRef = useRef();
  
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success!', detail:'New MisteryBox added Successfully.', life: 3000});
    }
  
    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error occured!', detail:message, life: 3000});
    }
    // useEffect(() => {
    //   titleRef.current.focus();
    // }, []);

    useEffect(() => {
    }, [imageRef,titleRef,winsConfigRef,qteRef,genderRef,selectedRangeAgeRef,descRef]);
  
    const handleAddMisteryBox = () => {
    if (
        //image === "" ||
        title === "" //||
        //isNaN(winsConfig) === "" ||
        //isNaN(qte) === "" ||
        //!(selectedRangeAge || selectedRangeAge.length) === 0 ||
        //desc.trim() === ""
      ) {//-----------------------------------------AJOUTER AUTRES CND
          setErrorMessage("Please fill All Fields!");
          showError(errorMessage);
      }
         else {
          showSuccess();
          clearInputFields();


         }
    };
    const clearInputFields = () => {
            //setSelectedRangeAge("");
            //setImage("");
            setTitle("");
            // setWinsConfig("");
            // setQte("");
            // setGender("");
            // setDesc("");
            // setErrorMessage("");
    };
  
    const options = [];
    for (let i = 1; i <= 100; i++) {
      options.push({ value: i, label: i.toString() });
    }
  
    const handleChange = (selectedOptions) => {
      if (selectedOptions.length > 2) {
        selectedOptions.shift(); 
      }
      setSelectedRangeAge(selectedOptions);
    };
  return (<>
  

<Button data-modal-target="AddMBox-modal" data-modal-toggle="AddMBox-modal" color="success" className="text-lg" type="button">
    <span className="text-base">Add a Mistery Box</span>
    <FaPlus className="pt-1 pb-1 pl-2 h-6 w-6" />
</Button>
<div id="AddMBox-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Add misteryBox
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="AddMBox-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
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
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={winsConfig}
                      onChange={(e) => setWinsConfig(e.target.value)}
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
                      value={qte}
                      onChange={(e) => setQte(e.target.value)}
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
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age
                    </label>
                    <Select
                      value={selectedRangeAge}
                      onChange={handleChange}
                      options={options}
                      isMulti
                      placeholder="Enter the range of ages"
                      ref={selectedRangeAgeRef}
                      required
                    />
                    {/* <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter the range of ages of participants"
                    /> */}
                  </div>
                </div>

                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <div className="max-w-md">
                      <Textarea id="desc" placeholder="MisteryBox description"
                      rows={4}
                      ref={descRef}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required 
                      />
                    </div>
                  </div>
                </div>

              </div>
              <Toast ref={toast} /> 
              <Button gradientMonochrome="success" onClick={handleAddMisteryBox}>
              <FaPlus className="pt-1 pb-1 pr-1 h-5 w-5" />Add new MisteryBox
              </Button>
            </form>
        </div>
    </div>
</div> 

</>
  )
}

export default AddModal

