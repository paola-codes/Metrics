import React from "react";
import { Workers } from "./Workers/Workers";
import { Hours } from "./Hours/Hours";
import { Shifts } from "./Shifts/Shifts";

export const GeneralStats = (props) => {
    
  // Setting up main data sources
  let workers = props.workers;
  let shifts = props.shifts;

  // Return ----------------------------------------------------------------------------------------------------

  return (
    <div className="row d-flex flex-column">
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
            id="nav-workers-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-workers"
            role="tab"
            type="button"
            aria-controls="nav-workers"
            aria-selected="false"
          >
            <h2>Workers</h2>
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
          tabindex="0"
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
          tabindex="0"
          aria-labelledby="nav-hours-tab"
        >
          <Hours shifts={shifts} />
        </div>
        {/* Hours Tab Ends */}

        {/* Workers Tab Starts */}
        <div
          className="tab-pane fade"
          id="nav-workers"
          role="tabpanel"
          tabindex="0"
          aria-labelledby="nav-workers-tab"
        >
          <Workers shifts={shifts} workers={workers} />
        </div>
        {/* Workers Tab Ends */}
      </div>
      {/* Tabs Content Ends */}
    </div>
  );
};
