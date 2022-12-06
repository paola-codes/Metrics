import React from "react";

import { ShiftsData } from "../assets/data/ShiftsData";
import { WorkersData } from "../assets/data/WorkersData";

import { Queue } from "../components/Queue/Queue";
import { Punctuality } from "../components/Punctuality/Punctuality";
import { Ratings } from "../components/Ratings/Ratings";
import { GeneralStats } from "../components/GeneralStats/GeneralStats";

/**
 * @description Creates the view for Metrics page, which renders 4 tabs with different components being called inside each one.
 * @since 09.28.22 by Paola Sanchez
 * @author Paola Sanchez
 * @requires Punctuality
 * @requires Ratings
 * @requires GeneralStats
 * @requires Queue
 */
export const Home = () => {
    
  // List of workers
  let workersList = WorkersData;

  // List of shifts
  let shiftsList = ShiftsData;

  // Return -----------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="py-4 px-5">
      {/* Title of the Page*/}
      <div className="mb-3">
        <h1><strong>Metrics</strong></h1>
      </div>

      <div className="row d-flex flex-column">
        {/* Tabs Controller Starts */}
        <nav>
          <div className="nav nav-tabs nav-fill" role="tablist">
            <button
              className="nav-link"
              id="nav-general-stats-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-general-stats"
              role="tab"
              type="button"
              aria-controls="nav-general-stats"
              aria-selected="true"
            >
              <h2>General Stats</h2>
            </button>
            <button
              className="nav-link"
              id="nav-punctuality-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-punctuality"
              role="tab"
              type="button"
              aria-controls="nav-punctuality"
              aria-selected="false"
            >
              <h2>Punctuality</h2>
            </button>
            <button
              className="nav-link"
              id="nav-ratings-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-ratings"
              role="tab"
              type="button"
              aria-controls="nav-ratings"
              aria-selected="false"
            >
              <h2>Ratings</h2>
            </button>
            <button
              className="nav-link active"
              id="nav-queue-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-queue"
              role="tab"
              type="button"
              aria-controls="nav-queue"
              aria-selected="false"
            >
              <h2>Queue</h2>
            </button>
          </div>
        </nav>
        {/* Tabs Controller Ends */}

        {/* Tabs Content Starts */}
        <div className="tab-content mt-5" id="nav-tabContent">
          {/* General Stats Tab Starts */}
          <div
            className="tab-pane fade"
            id="nav-general-stats"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="nav-general-stats-tab"
          >
            <GeneralStats workers={workersList} shifts={shiftsList} />
          </div>
          {/* General Stats Tab Ends */}

          {/* Punctuality Tab Starts */}
          <div
            className="tab-pane fade"
            id="nav-punctuality"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="nav-punctuality-tab"
          >
            <Punctuality shifts={shiftsList} />
          </div>
          {/* Punctuality Tab Ends */}

          {/* Ratings Tab Starts */}
          <div
            className="tab-pane fade"
            id="nav-ratings"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="nav-ratings-tab"
          >
            <Ratings workers={workersList} />
          </div>
          {/* Ratings Tab Ends */}

          {/* Queue Tab Starts */}
          <div
            className="tab-pane fade show active"
            id="nav-queue"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="nav-queue-tab"
          >
            <Queue workers={workersList} shifts={shiftsList} />
          </div>
          {/* Queue Tab Ends */}
        </div>
        {/* Tabs Content Ends */}
      </div>
    </div>
  );
};