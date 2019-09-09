// import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React , { useState , useEffect } from "react"
import axios from "axios"

const storeHours = {
  0: {
    isOpen: false,
    openMessage: "",
    closedMessage: "Closed Today"
  },
  1: {
    isOpen: true,
    timeOpen: ["11.00", "16.30"],
    timeClosed: ["14.30", "21.00"],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  2: {
    isOpen: true,
    timeOpen: [11, 16.3],
    timeClosed: [14.3, 21],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  3: {
    isOpen: true,
    timeOpen: [11, 16.3],
    timeClosed: [14.3, 21],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  4: {
    isOpen: true,
    timeOpen: [11, 16.3],
    timeClosed: [14.3, 21],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  5: {
    isOpen: true,
    timeOpen: [11, 16.3],
    timeClosed: [14.3, 21.3],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:30PM"
  },
  6: {
    isOpen: true,
    timeOpen: [11.3, 16.3],
    timeClosed: [14.3, 21.3],
    closedMessage: "11:30AM - 2:30PM, 4:00PM - 9:30PM"
  },
}


const StoreStatus = () => {
  const [ statusColor, setStatusColor ] = useState ();
  const [ storeStatus , setStoreStatus ] = useState ();
  const [ helperStatus, setHelperStatus ] = useState ();

  useEffect(() => {
    const getCurrentTime = () => {
      axios
      .get(`http://worldclockapi.com/api/json/pst/now`)
      .then(response => { 
        console.log(response.data);
        setStatus(response.data.currentDateTime);
      })
      .catch(error => {
        console.log(error);
      })
    };
    getCurrentTime();
  }, []);

  const handleOpen = () => {
    setStatusColor("green");
    setStoreStatus("Open");
  };

  const handleClosed = () =>{
    setStatusColor("red");
    setStoreStatus("Closed");
  };

  const handleOpenCloseStatus = (today, hour, minute) =>{
    const currentTime = `${hour}.${minute}`;
    // const currentTime = 17;
    const timeOpen = today.timeOpen;
    const timeClosed = today.timeClosed;

    console.log(currentTime);    

    if(today.isOpen){
      for(let i = 0; i < timeOpen.length; i++){
        console.log(i);
        if(currentTime > timeOpen[i] && currentTime < timeClosed[i]){
          console.log("I am open");
          handleOpen();
          handleHelperMessage(2, currentTime, today, timeClosed[i]);
          break;
        } else if(!(i+1 < timeOpen.length)){
          if(currentTime < timeOpen[0]){
            console.log("Not open yet");
            handleClosed();
          }else if(currentTime > timeClosed[timeClosed.length-1]){
            console.log("closed for the day");
            handleClosed();
          }else {
            console.log("closed until");
            handleClosed();
          }
        }
      }
    } else {
      handleClosed();
      handleHelperMessage(1, currentTime)
    }
  };

  const handleHelperMessage = (status, currentTime, today, closeTime) => {
    console.log(closeTime);
    const hour = closeTime.toString().split(".")[0];
    const minute = closeTime.toString().split(".")[1];

    console.log(hour);
    console.log(minute);
    const hour12 = hour > 11 ? hour - 12 : hour;
    console.log(hour12);
    const ampm = hour > 11 ? "PM" : "AM";

    switch(status){
      case 1: 
        setHelperStatus(today.closedMessage);
      case 2: {
        setHelperStatus(`until ${hour12}:${minute}${ampm}`)
      }
      case 3: {

      }
    }
  };

  const setStatus = (currentTime) => {
    const dayTime = new Date(currentTime);
    const day = dayTime.getDay();
    const hour = dayTime.getHours();
    const minute = dayTime.getMinutes();

    handleOpenCloseStatus(storeHours[day], hour, minute);
    handleHelperMessage();
  };
  // const statusColor = "red";
  // const openCloseStatus = "Closed";
  // const helperStatus = "11:00AM - 2:30PM, 4:00PM - 9:00PM";
  return (
    <div style={{
      position: "absolute",
      top: "35px",
      marginLeft: "2px",
  }}>
      <p style ={{
        color: `${statusColor}`,
        fontSize: "0.75em",
      }}>{storeStatus}, <span style={{ color: "#777"}}>{helperStatus}</span></p>
  </div>
)
};


export default StoreStatus
