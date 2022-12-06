import React from "react";
import { JobSeekers } from "./JobSeekers/JobSeekers";
import { Hours } from "./Hours/Hours";
import { Shifts } from "./Shifts/Shifts";

/**
 * @function
 * @description Creates a page with 3 tabs that show metrics about Shifts, Punctuality, and Hours.
 * @since 09.29.22 by Paola Sanchez
 * @author Paola Sanchez
 * @requires Hours
 * @requires Shifts
 * @requires JobSeekers
 * @param {object} props - Contains an array of all shifts, and an array of all the workers.
 */
export const GeneralStats = (props) => {

    // Setting up main data sources
    let workers = props.workers
    let shifts = props.shifts

    // Return ----------------------------------------------------------------------------------------------------

    return (
        <div className="row d-flex flex-column mx-2">
            {/* Tabs Controller Starts */}
      <nav>
        <div className="nav nav-tabs nav-fill" role="tablist">
          <button
            className="nav-link active"
            id="nav-shifts-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-shifts"
            role="tab"
            type="button"
            aria-controls="nav-shifts"
            aria-selected="true"
          >
            <h2>Shifts</h2>
          </button>
          <button
            className="nav-link"
            id="nav-hours-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-hours"
            role="tab"
            type="button"
            aria-controls="nav-hours"
            aria-selected="false"
          >
            <h2>Hours</h2>
          </button>
          <button
            className="nav-link"
            id="nav-job-seekers-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-job-seekers"
            role="tab"
            type="button"
            aria-controls="nav-job-seekers"
            aria-selected="false"
          >
            <h2>Job Seekers</h2>
          </button>
        </div>
      </nav>
      {/* Tabs Controller Ends */}

           {/* Tabs Content Starts */}
       <div className="tab-content mt-5" id="nav-tabContent">
         {/* Shifts Tab Starts */}
         <div
           className="tab-pane fade show active"
           id="nav-shifts"
           role="tabpanel"
           tabIndex="0"
           aria-labelledby="nav-shifts-tab"
         >
           <Shifts shifts={shifts} />
         </div>
         {/* Shifts Tab Ends */}

         {/* Hours Tab Starts */}
         <div
           className="tab-pane fade"
           id="nav-hours"
           role="tabpanel"
           tabIndex="0"
           aria-labelledby="nav-hours-tab"
         >
           <Hours shifts={shifts} />
         </div>
         {/* Hours Tab Ends */}

         {/* JobSeekers Tab Starts */}
         <div
           className="tab-pane fade"
           id="nav-job-seekers"
           role="tabpanel"
           tabIndex="0"
           aria-labelledby="nav-job-seekers-tab"
         >
           <JobSeekers shifts={shifts} workers={workers} />
         </div>
         {/* JobSeekers Tab Ends */}
       </div>
       {/* Tabs Content Ends */}
        </div>
    )
}
