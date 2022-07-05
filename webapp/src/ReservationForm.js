import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Axios from "axios";
import moment from "moment";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm = () => {
  const [listAllReservations, setListAllReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [disabledTimes, setDisabledTimes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getReservations").then((response) => {
      let sortReservations = response.data;
      sortReservations.sort(function (a, b) {
        return a.time.localeCompare(b.time);
      });
      setListAllReservations(sortReservations);
    });
  }, []);

  const renderDayContents = (day, date) => {
    let tooltipText = "";
    listAllReservations.forEach((reservation) => {
      if (
        moment(reservation.time).format("YYYY-MM-DD") ===
        moment(date).format("YYYY-MM-DD")
      ) {
        tooltipText +=
          moment(reservation.time).format("HH:mm") +
          " - " +
          reservation.name +
          " " +
          reservation.surname +
          "\n";
      }
    });
    return <span title={tooltipText}>{moment(date).format("DD")}</span>;
  };

  const returnDayClassName = (date) => {
    let isReservations = false;
    listAllReservations.forEach((reservation) => {
      if (
        moment(reservation.time).format("YYYY-MM-DD") ===
        moment(date).format("YYYY-MM-DD")
      ) {
        isReservations = true;
      }
    });
    return isReservations ? "reserved" : "";
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleDateChange = (date) => {
    const disabledTimes = listAllReservations
      .filter(
        (reservation) =>
          moment(reservation.time).format("YYYY MM DD") ===
          moment(date).format("YYYY MM DD")
      )
      .map((reservation) => new Date(reservation.time));
    setDisabledTimes(disabledTimes);
    setReservationDate(date);
  };

  const createReservation = () => {
    const dublicatedTime = listAllReservations.filter(
      (reservation) => reservation.time === reservationDate
    );
    const dublicatedPatient = listAllReservations.filter(
      (reservation) =>
        reservation.name === name && reservation.surname === surname
    );
    let cannotRegisterSameWeek = false;

    if (dublicatedPatient) {
      dublicatedPatient.forEach((reservation) => {
        const reservedTime = moment(reservation.time).week();
        const thisTime = moment(reservationDate).week();
        if (reservedTime === thisTime) {
          cannotRegisterSameWeek = true;
          alert("You can only register once a week");
        }
      });
    }

    if (dublicatedTime.length > 0) {
      alert("This time is already taken, please choose another time.");
    } else if (
      !name ||
      !surname ||
      !reservationDate ||
      moment(reservationDate).format("HH:mm") === "00:00"
    ) {
      alert("Please fill in the form correctly");
    } else if (!cannotRegisterSameWeek) {
      Axios.post("http://localhost:3001/createReservation", {
        name: name,
        surname: surname,
        time: reservationDate,
      }).then((response) => {
        setListAllReservations([
          ...listAllReservations,
          { name: name, surname: surname, time: reservationDate },
        ]);
        setReservationDate(null);
        setName("");
        setSurname("");
        alert(
          "Dear " +
            name +
            ",\nRegistration was successful, your time is: " +
            moment(reservationDate).format("YYYY-MM-DD, HH:mm") +
            "."
        );
      });
    }
  };

  return (
    <Form>
      <FormGroup>
        <Label for="patientName">Name</Label>
        <Input
          value={name}
          id="patientName"
          name="patientName"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="patientSurname">Surname</Label>
        <Input
          value={surname}
          id="patientSurname"
          name="patientSurname"
          type="text"
          onChange={(event) => {
            setSurname(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="patientSurname">Date</Label>
        <DatePicker
          selected={reservationDate}
          onChange={(date) => handleDateChange(date)}
          showTimeSelect
          minDate={moment().toDate()}
          filterDate={isWeekday}
          excludeTimes={disabledTimes}
          dateFormat="yyyy MM dd, HH:mm"
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 0), 17)}
          calendarStartDay={1}
          timeFormat={"HH:mm"}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          renderDayContents={renderDayContents}
          dayClassName={returnDayClassName}
        />
      </FormGroup>
      <Button color="primary" onClick={createReservation}>
        Submit
      </Button>
    </Form>
  );
};

export default ReservationForm;
