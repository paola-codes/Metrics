import React, { useState, useEffect } from "react";
import { BarChart } from "../../../assets/Charts";
import { ShiftsDataGenerator } from "./ShiftsData";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import DatePicker from "react-multi-date-picker";
import moment from "moment";

/**
 * @function
 * @description Creates a page with a table and a graph of all the shift statuses.
 * @since 10.28.22 by Paola Sanchez
 * @author Paola Sanchez
 * @requires BarChart
 * @requires ShiftsDataGenerator
 * @param {object} props - Contains an array of all the shifts.
 */
export const Shifts = (props) => {

  /* Variables ---------------------------------------------------  */

  /* Putting props into variable */
  let shiftProps = props.shifts;

  /* Start of given time period */
  const [start, setStart] = useState(moment().format("MM-DD-YYYY"));

  /* End of given time period */
  const [end, setEnd] = useState(moment().format("MM-DD-YYYY"));

  /* Variables to store selected time period */
  const [period, setPeriod] = useState();

  /* Variables to store selected dates */
  const [day, setDay] = useState(new Date());
  const [week, setWeek] = useState([
    new Date(),
    new Date()
  ])
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());

  /* Variables to store date defaults*/
  const [defaultDay, setDefaultDay] = useState(new Date().toLocaleDateString());
  const [defaultWeek, setDefaultWeek] = useState(
    new Date().toLocaleDateString()
  );

  const [defaultMonth, setDefaultMonth] = useState(
    new Date().toLocaleDateString("en-us", { month: "long", year: "numeric" })
  );

  const [defaultYear, setDefaultYear] = useState(new Date().getFullYear());

  /* Handlers ---------------------------------------------------  */

  /* Day Handler */
  const handleDay = (day) => {
    setDay(day);
    setDefaultDay(day);
  };

  /* Week Handler */
  const handleWeek = (week) => {
    setWeek(week);
    setDefaultWeek(week);
  };

  /* Month Handler */
  const handleMonth = (month) => {
    setMonth(month);
    setDefaultMonth(month);
  };

  /* Year Handler */
  const handleYear = (year) => {
    setYear(year);
    setDefaultYear(year);
  };

  /* Calculate start and end of day */
  const startEndOfDay = () => {
    // Transforming day value into string
    let dayAsString = defaultDay.toString();

    // Replacing "/" with "-"
    const search = "/";
    const replaceWith = "-";
    const dayFormatted = dayAsString.split(search).join(replaceWith);

    // Setting start and end
    setStart(dayFormatted);
    setEnd(dayFormatted);
  };

  /* Calculate start and end of week */
  const startEndOfWeek = () => {
    // Transforming week value into string
    let weekAsString = defaultWeek.toString();

    let weeks = weekAsString.split(",");

    let endOfWeekPlaceholder = moment().isoWeekday(7).format("MM-DD-YYYY");

    if (weeks.length === 1) {
      weeks.push(endOfWeekPlaceholder);
    }

    // Replacing "/" with "-"
    const search = "/";
    const replaceWith = "-";
    //const weekStart = weeks[0].split(search).join(replaceWith);
    const weekEnd = weeks[1].split(search).join(replaceWith);

    let weekStartF = moment(weekEnd).isoWeekday(1).format("MM-DD-YYYY");
    let weekEndF = moment(weekEnd).isoWeekday(7).format("MM-DD-YYYY");

    // Setting start and end
    setStart(weekStartF);
    setEnd(weekEndF);
  };

  /* Calculate start and end of month */
  const startEndOfMonth = () => {
    // Transforming month value into string
    let monthAsString = defaultMonth.toString();

    // Listing all months by number
    const months = [
      { name: "January", number: "01" },
      { name: "February", number: "02" },
      { name: "March", number: "03" },
      { name: "April", number: "04" },
      { name: "May", number: "05" },
      { name: "June", number: "06" },
      { name: "July", number: "07" },
      { name: "August", number: "08" },
      { name: "September", number: "09" },
      { name: "October", number: "10" },
      { name: "November", number: "11" },
      { name: "December", number: "12" }
    ];

    // Determining year (number) of month value
    let yearOfMonth = monthAsString.slice(-4);

    // Determining month (number) of month value
    let monthOfMonth = "";

    months.forEach((eachMonth) => {
      if (monthAsString.includes(eachMonth.name)) {
        monthOfMonth += eachMonth.number;
      }
    });

    // Completing start of month
    let completeMonthStart = `${yearOfMonth}-${monthOfMonth}-01`;

    // Setting up start
    let startOfMonth = moment(completeMonthStart)
      .startOf("month")
      .format("MM-DD-YYYY");
    setStart(startOfMonth);

    // Setting up end
    let endOfMonth = moment(startOfMonth).endOf("month").format("MM-DD-YYYY");
    setEnd(endOfMonth);
  };

  /* Calculate start and end of year */
  const startEndOfYear = () => {
    // Transforming year value into string
    let yearAsString = defaultYear.toString()

    // Calculating start and end
    let startOfYear = moment(`01-01-${yearAsString}`).format("MM-DD-YYYY")
    let endOfYear = moment(`12-31-${yearAsString}`).format("MM-DD-YYYY")

    // Setting up start and end
    setStart(startOfYear)
    setEnd(endOfYear)
  };

  /* 
    Variables with the current start and end values
    of day, week month, and year
  */
  let currentDay = moment().format("MM-DD-YYYY");
  let currentWeekStart = moment().isoWeekday(1).format("MM-DD-YYYY");
  let currentWeekEnd = moment().isoWeekday(7).format("MM-DD-YYYY");
  let currentMonthStart = moment().startOf("month").format("MM-DD-YYYY");
  let currentMonthEnd = moment().endOf("month").format("MM-DD-YYYY");
  let currentYearStart = moment().startOf("year").format("MM-DD-YYYY");
  let currentYearEnd = moment().endOf("year").format("MM-DD-YYYY");

  /*
    UseEffect for the first render of
    the page
  */
  useEffect(() => {
    setPeriod("Day");
    setStart(currentDay);
    setEnd(currentDay);
  }, []);

  /* 
    Use effects that get triggered
    when the period value changes
  */
  useEffect(() => {
    if (period === "Day") {
      setStart(currentDay);
      setEnd(currentDay);
    } else if (period === "Week") {
      setStart(currentWeekStart);
      setEnd(currentWeekEnd);
    } else if (period === "Month") {
      setStart(currentMonthStart);
      setEnd(currentMonthEnd);
    } else if (period === "Year") {
      setStart(currentYearStart);
      setEnd(currentYearEnd);
    }
  }, [period]);

  /* 
    Use effects that get triggered
    when the default values change
  */
  useEffect(() => {
    startEndOfDay();
  }, [defaultDay]);

  useEffect(() => {
    startEndOfWeek();
  }, [defaultWeek]);

  useEffect(() => {
    startEndOfMonth();
  }, [defaultMonth]);

  useEffect(() => {
    startEndOfYear();
  }, [defaultYear]);

  /* 
    Function that filters shifts based on the 
    start and end of the selected date 
  */
  const filterShifts = () => {

    // Array for filtered shifts
    let filteredShifts = [];

    // Keeping shifts that exist within the selected dates
    shiftProps?.forEach((shift) => {
      let shiftStart = moment(shift.starting_at).format("MM-DD-YYYY");
      let shiftEnd = moment(shift.ending_at).format("MM-DD-YYYY");

      let shiftYear = shiftStart.slice(-4);
      let startAndEndYear = start.slice(-4);

      if (shiftYear === startAndEndYear) {
        if (
          shiftStart >= start &&
          shiftStart <= end &&
          shiftEnd >= start &&
          shiftEnd <= end
        ) {
          filteredShifts.push(shift);
        }
      }
    });

    // Returning filtered shifts
    return filteredShifts;
  };

  // Capturing filtered shifts
  let shiftsFiltered = filterShifts();

  // Setting up main data source for chart and table
  let ShiftsData = ShiftsDataGenerator(shiftsFiltered);

  // Data for bar chart -------------------------------------------------------------------------------------

  // Colors
  const purple = "#5c00b8";
  const lightTeal = "#00ebeb";
  const darkTeal = "#009e9e";
  const lightPink = "#eb00eb";
  const darkPink = "#b200b2";

  // Taking out the "Totals" from the chart view
  let barData = ShiftsData.filter((item) => {
    return item.description !== "Total Shifts Posted ";
  }); // Taking out the "Totals" from the chart view

  // Preparing data to be passed to the chart component
  const shiftsData = {
    labels: barData.map((data) => data.description),
    datasets: [
      {
        label: "Shifts",
        data: barData.map((data) => data.qty),
        backgroundColor: [purple, darkPink, lightPink, lightTeal, darkTeal]
      }
    ]
  };

  // Return ----------------------------------------------------------------------------------------------------

  return (
    <div className="p-0 m-0 pt -3 d-flex flex-column">
      <div className="row mx-3 mb-4">
        <div className="col p-0 d-flex d-inline-flex justify-content-between">
          {/* Time period Announcer */}
          <div className="p-0 pt-1 text-start">
            <h3 className="m-0">Start: {start}</h3>
            <h3 className="m-0">End: {end}</h3>
          </div>

          {/* Dropdown */}
          <div className="p-0 pt-1 text-start">
            <DropdownButton id="dropdown-basic-button" title="Select Period" variant="dark" size="lg">
              <Dropdown.Item
                className="dropdown-item"
                type="button"
                onClick={() => setPeriod("Day")}
              >
                Day
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item"
                type="button"
                onClick={() => setPeriod("Week")}
              >
                Week
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item"
                type="button"
                onClick={() => setPeriod("Month")}
              >
                Month
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item"
                type="button"
                onClick={() => setPeriod("Year")}
              >
                Year
              </Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="p-0 d-flex d-inline-flex justify-content-between text-end">
            {/* DatePicker Conditional Rendering Starts */}
            <>
              {period === "Day" ? (
                <div>
                  <div className="mb-2">
                    <h3>{`${period}: ${defaultDay}`}</h3>
                  </div>

                  <DatePicker
                    plugins={[weekends()]}
                    value={day}
                    onChange={handleDay}
                    format="MM-DD-YYYY"
                  />
                </div>
              ) : period === "Week" ? (
                <div>
                  <div className="mb-2">
                    <h3>{`${period}: ${defaultWeek}`}</h3>
                  </div>

                  <DatePicker
                    plugins={[weekends()]}
                    value={week}
                    onChange={handleWeek}
                    weekPicker
                    format="MM-DD-YYYY"
                  />
                </div>
              ) : period === "Month" ? (
                <div>
                  <div className="mb-2">
                    <h3>{`${period}: ${defaultMonth}`}</h3>
                  </div>

                  <DatePicker
                    plugins={[weekends()]}
                    value={month}
                    onChange={handleMonth}
                    onlyMonthPicker
                    format="MMMM YYYY"
                  />
                </div>
              ) : period === "Year" ? (
                <div>
                  <div className="mb-2">
                    <h3>{`${period}: ${defaultYear}`}</h3>
                  </div>

                  <DatePicker
                    plugins={[weekends()]}
                    value={year}
                    onChange={handleYear}
                    onlyYearPicker
                  />
                </div>
              ) : null}
            </>
            {/* DatePicker Conditional Rendering Ends */}
          </div>
        </div>
      </div>

      <div
        className="row d-flex d-inline-flex justify-content-between"
        style={{ width: "100%" }}
      >
        {/* Left Column Starts */}
        <div className="col">
          <div className="row d-flex flex-column justify-content-between">
            {/* Shifts Table Starts */}
            <div className="col text-center">
              <h2 className="mb-4">Shifts Table</h2>

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
                  {ShiftsData.map((item, i) => {
                    return item.description === "Total Shifts Posted" ? (
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
            {/* Shifts Table Ends */}
          </div>
        </div>
        {/* Left Column Ends */}

        {/* Right Column Starts */}
        <div className="col">
          <div className="row">
            {/* Shifts Chart Starts*/}
            <div className="col text-center">
              <h2 className="mb-3">Shifts Chart</h2>

              <div style={{ height: "20rem" }}>
                <BarChart barData={shiftsData} />
              </div>
            </div>
            {/* Shifts Chart Ends*/}
          </div>
        </div>
        {/* Right Column Ends */}
      </div>
    </div>
  );
};