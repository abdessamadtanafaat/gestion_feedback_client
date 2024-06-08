/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function SelectDate() {
    const [date, setDate] = useState(null);

    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} touchUI showIcon placeholder="select a Date" className="bg-gray-50 p-border-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"

                      />
        </div>            
    )
}
        