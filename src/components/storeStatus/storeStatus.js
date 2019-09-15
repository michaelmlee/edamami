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
    timeOpen: ["11.00", "16.30"],
    timeClosed: ["14.30", "21.00"],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  3: {
    isOpen: true,
    timeOpen: ["11.00", "16.30"],
    timeClosed: ["14.30", "21.00"],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  4: {
    isOpen: true,
    timeOpen: ["11.00", "16.30"],
    timeClosed: ["14.30", "21.00"],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:00PM"
  },
  5: {
    isOpen: true,
    timeOpen: ["11.00", "16.30"],
    timeClosed: ["14.30", "21.00"],
    closedMessage: "11:00AM - 2:30PM, 4:00PM - 9:30PM"
  },
  6: {
    isOpen: true,
    timeOpen: ["11.30", "16.30"],
    timeClosed: ["14.30", "21.30"],
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

  const handleOpen = (soon) => {
    setStatusColor("green");
    // TODO: maybe opens soon status shouldn't be green
    if(soon)
      setStoreStatus("Opens soon");
    else
      setStoreStatus("Open");
  };

  const handleClosed = (soon) =>{
    setStatusColor("red");
    if(soon)
      setStoreStatus("Closes soon");
    else
      setStoreStatus("Closed");
  };

  const handleOpenCloseStatus = (today, hour, minute) =>{
    // const currentTime = `${hour}.${minute}`;
    const currentTime = 21.19
    const timeOpen = today.timeOpen;
    const timeClosed = today.timeClosed;
  

    if(today.isOpen){
      for(let i = 0; i < timeOpen.length; i++){
        console.log(i);
        console.log(currentTime);  
        console.log(timeOpen[i]);
        console.log(timeClosed[i]);
        if(currentTime > timeOpen[i] && currentTime < timeClosed[i]){
          console.log("I am open");
          handleOpen();
          handleHelperMessage(2, currentTime, today, timeClosed[i]);
          break;
        } else if(!(i+1 < timeOpen.length)){
          console.log(i);
          if(currentTime < timeOpen[0]){
            console.log("Not open yet");
            handleClosed();
            handleHelperMessage(3, currentTime, today, timeOpen[0]);
            break;
          } else if(currentTime > timeClosed[timeClosed.length-1]){
            console.log("closed for the day");
            console.log(timeClosed[i]);
            handleClosed();
            handleHelperMessage(1, currentTime, today, timeClosed[i]);
            break;
          } else {
            console.log("closed until");
            handleClosed();
            handleHelperMessage(3, currentTime, today, timeOpen[i]);
            break;
          }
        }
      }
    } else {
      handleClosed();
      handleHelperMessage(1, currentTime, today, "")
    }
  };

  // TODO: rename closeTime to something better
  const handleHelperMessage = (status, currentTime, today, closeTime) => {

    console.log(closeTime);

    // TODO: make this into its own method
    const hour = closeTime.toString().split(".")[0];
    const minute = closeTime.toString().split(".")[1];

    console.log(hour);
    console.log(minute);
  
    const minute2 = currentTime.toString().split(".")[1];
    // TODO: clean this up
    const diff = closeTime - currentTime;
    const difference = minute - minute2;
    const hour12 = hour > 11 ? hour - 12 : hour;
    console.log(hour12);

    const ampm = hour > 11 ? "PM" : "AM";
    switch(status){
      case 1: 
        setHelperStatus(today.closedMessage);
        break;
      case 2: {
        if(diff < 1){
          handleClosed(true);
          setHelperStatus(`in ${difference} minutes`);
        } else
          setHelperStatus(`until ${hour12}:${minute}${ampm}`);
        break;
      }
      case 3: {
        // TODO: Clean this up
        if((closeTime - currentTime) < 1){
          const timeLeft = (difference > 0.6) ? Math.floor(difference * 60) : Math.floor(difference * 100);
          handleOpen(true);
          setHelperStatus(`in ${timeLeft} minutes`);
        } else{
          setHelperStatus(`Opens at ${hour12}:${minute}${ampm}`);
        }
        break;
      }
    }
  };

  const setStatus = (currentTime) => {
    const dayTime = new Date(currentTime);
    const day = dayTime.getDay();
    const hour = dayTime.getHours();
    const minute = dayTime.getMinutes();
    
    if(minute < 10){
      handleOpenCloseStatus(storeHours[day], hour, `0${minute}`);
    } else 
      handleOpenCloseStatus(storeHours[day], hour, minute);
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
