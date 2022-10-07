/* eslint-disable */
import React, { useEffect, useState } from "react";
import { PieChart, BarChart } from "../../../assets/Charts";
import {
  WorkersDataGenerator,
  NewWorkersDataGenerator
} from "./WorkersData";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

export const Workers = (props) => {
  // Use state to hold list of workers and list of shifts
  const [workersList, setWorkersList] = useState([]);
  const [shifsList, setShiftsList] = useState([]);

  // Receiving the props that contain the lists we need
  const handleProps = async () => {
    // Catching the props when they arrive
    let propsObj = await props;

    // Checking length of lists before save them
    if (propsObj.workers.length > 0) {
      // Saving list of workers
      setWorkersList(propsObj.workers);
      // Saving list of shifts
      setShiftsList(propsObj.shifts);
    } else {
      // Handling error with a message
      console.log("Waiting for props to arrive");
    }
  };

  // Triggering handleProps when props change/arrive
  useEffect(() => {
    handleProps();
  }, [props]);

  // DatePicker -------------------------------------------------------------------------------------------------

  // Date selected through the DatePicker
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Monday of X week (default: current week)
  const [start, setStart] = useState(
    moment().startOf("isoWeek").format("YYYY-MM-DD")
  );

  // Sunday of X week (default: current week)
  const [end, setEnd] = useState(
    moment().endOf("isoWeek").format("YYYY-MM-DD")
  );

  // Function that filters shifts based on the Monday and Sunday of the selected date --------------------------
  const filterShifts = () => {
    // Array for filtered shifts
    let filteredShifts = [];

    // Keeping shifts that exist within the selected dates
    shifsList?.forEach((shift) => {
      let shiftStart = moment(shift.starting_at).format("YYYY-MM-DD");
      let shiftEnd = moment(shift.ending_at).format("YYYY-MM-DD");

      if (
        shiftStart >= start &&
        shiftStart <= end &&
        shiftEnd >= start &&
        shiftEnd <= end
      ) {
        filteredShifts.push(shift);
      }
    });

    // Returning filtered shifts
    return filteredShifts;
  };

  // UseEffect to update Mondays and Sundays when a new date is selected --------------------------------------

  useEffect(() => {
    // Setting up the new Monday
    let formattedStart = moment(selectedDate)
      .startOf("isoWeek")
      .format("YYYY-MM-DD");

    setStart(formattedStart);

    // Setting up the new Sunday
    let formattedEnd = moment(selectedDate)
      .endOf("isoWeek")
      .format("YYYY-MM-DD");

    setEnd(formattedEnd);
  }, [selectedDate]);

  if (workersList.length > 0) {
    let specialShifts = filterShifts();
    console.log(specialShifts);

    // Setting up main data sources
    let WorkersData = WorkersDataGenerator(shifsList, workersList);
    let NewWorkersData = NewWorkersDataGenerator(workersList);

    // Data for pie chart -------------------------------------------------------------------------------------

    // Colors
    const purple = "#5c00b8";
    const lightPink = "#eb00eb";
    const darkTeal = "#009e9e";
    const green = "#06ff05";

    // Taking out the "Totals" from the chart view
    let pieData = WorkersData.filter((item) => {
      return item.description !== "Total Workers";
    }); // Taking out the "Totals" from the chart view

    // Preparing data to be passed to the chart component
    const workersData = {
      labels: pieData.map((data) => data.description),
      datasets: [
        {
          label: "Workers",
          data: pieData.map((data) => data.qty),
          backgroundColor: [purple, lightPink]
        }
      ]
    };

    // Data for bar chart -------------------------------------------------------------------------------------

    // Preparing data to be passed to the chart component
    const newWorkersData = {
      labels: NewWorkersData.map((data) => data.description),
      datasets: [
        {
          label: "New Workers",
          data: NewWorkersData.map((data) => data.qty),
          backgroundColor: [darkTeal, green]
        }
      ]
    };

    // Return ----------------------------------------------------------------------------------------------------

    return (
      <div className="p-0 m-0 d-flex flex-column">
        <div className="row mx-3 mb-4">
          <div className="col p-0 pt-2 d-flex d-inline-flex justify-content-start">
            <div className="me-3">
              <h3 className="m-0">Select a day of the desired week: </h3>
            </div>

            {/* Calendar/DatePicker */}
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="row d-flex d-inline-flex justify-content-between w-100">
          {/* Left Column Starts */}
          <div className="col">
            <div className="row d-flex flex-column justify-content-between mb-5">
              {/* Workers Table Starts */}
              <div className="col text-center">
                <h2 className="mb-4">Workers Table</h2>

                <table className="table table-bordered border-dark text-center">
                  <thead className="table-dark">
                    {/* Table columns */}
                    <tr>
                      <th scope="col">
                        <h3 className="m-0">Description</h3>
                      </th>
                      <th scope="col">
                        <h3 className="m-0">Quantity</h3>
                      </th>
                      <th scope="col">
                        <h3 className="m-0">Percentages</h3>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Mapping the data to diplay it as table rows */}
                    {WorkersData.map((item, i) => {
                      return item.description === "Total Workers" ? (
                        <tr
                          key={i}
                          style={{ background: "rgba(107, 107, 107, 0.35)" }}
                        >
                          <th scope="row">
                            <h3 className="m-0">{item.description}</h3>
                          </th>
                          <td>
                            <h3 className="m-0">{item.qty}</h3>
                          </td>
                          <td>
                            <h3 className="m-0">{`${item.pct}%`}</h3>
                          </td>
                        </tr>
                      ) : (
                        <tr key={i}>
                          <th scope="row">
                            <h3 className="m-0">{item.description}</h3>
                          </th>
                          <td>
                            <h3 className="m-0">{item.qty}</h3>
                          </td>
                          <td>
                            <h3 className="m-0">{`${item.pct}%`}</h3>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Workers Table Ends */}
            </div>

            <div className="row d-flex flex-column justify-content-between mb-5">
              {/* New Workers Table Starts */}
              <div className="col text-center">
                <h2 className="mb-4">New Workers Table</h2>

                <table className="table table-bordered border-dark text-center">
                  <thead className="table-dark">
                    {/* Table columns */}
                    <tr>
                      <th scope="col">
                        <h3 className="m-0">Description</h3>
                      </th>
                      <th scope="col">
                        <h3 className="m-0">Quantity</h3>
                      </th>
                      <th scope="col">
                        <h3 className="m-0">Percentages</h3>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Mapping the data to diplay it as table rows */}
                    {NewWorkersData.map((item, i) => {
                      return item.description === "Total Workers" ? (
                        <tr
                          key={i}
                          style={{ background: "rgba(107, 107, 107, 0.35)" }}
                        >
                          <th scope="row">
                            <h3 className="m-0">{item.description}</h3>
                          </th>
                          <td>
                            <h3 className="m-0">{item.qty}</h3>
                          </td>
                          <td>
                            <h3 className="m-0">{`${item.pct}%`}</h3>
                          </td>
                        </tr>
                      ) : (
                        <tr key={i}>
                          <th scope="row">
                            <h3 className="m-0">{item.description}</h3>
                          </th>
                          <td>
                            <h3 className="m-0">{item.qty}</h3>
                          </td>
                          <td>
                            <h3 className="m-0">{`${item.pct}%`}</h3>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* New Workers Table Ends */}
            </div>
          </div>
          {/* Left Column Ends */}

          {/* Right Column Starts */}
          <div className="col">
            <div className="row">
              {/* Workers Chart Starts*/}
              <div className="col text-center mb-5">
                <h2 className="mb-3">Workers Chart</h2>

                <div style={{ height: "13.90rem" }} className="mx-auto">
                  <PieChart pieData={workersData} />
                </div>
              </div>
              {/* Workers Chart Ends*/}
            </div>

            <div className="row">
              {/* New Workers Chart Starts*/}
              <div className="col text-center">
                <h2 className="mb-3">New Workers Chart</h2>

                <div style={{ height: "13.90rem" }} className="mx-auto">
                  <BarChart barData={newWorkersData} />
                </div>
              </div>
              {/* New Workers Chart Ends*/}
            </div>
          </div>
          {/* Right Column Ends */}
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};