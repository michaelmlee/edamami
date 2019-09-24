import React , { useState , useEffect } from "react"
import axios from "axios"

import storeHours from "./storeHours"

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
    const currentTime = `${hour}.${minute}`;
    // const currentTime = 10.19
    const timeOpen = today.timeOpen;
    const timeClosed = today.timeClosed;

    if(today.isOpen){
      for(let i = 0; i < timeOpen.length; i++){
        // open
        if(currentTime > timeOpen[i] && currentTime < timeClosed[i]){
          handleOpen();
          handleHelperMessage("Open", currentTime, today, timeClosed[i]);
          break;
        } else if(!(i+1 < timeOpen.length)){
          // not open yet
          if(currentTime < timeOpen[0]){
            handleClosed();
            handleHelperMessage("Not open yet", currentTime, today, timeOpen[0]);
            break;
            // closed for the day
          } else if(currentTime > timeClosed[timeClosed.length-1]){
            handleClosed();
            handleHelperMessage("Closed", currentTime, today, timeClosed[i]);
            break;
            // closed until...
          } else {
            handleClosed();
            handleHelperMessage("Closed until", currentTime, today, timeOpen[i]);
            break;
          }
        }
      }
      // closed
    } else {
      handleClosed("Closed Today");
      handleHelperMessage("Closed", currentTime, today, "")
    }
  };

  const handleHelperMessage = (status, currentTime, today, storeTimeHelper) => {

    // TODO: make this into its own method
    const hour = storeTimeHelper.toString().split(".")[0];
    const minute = storeTimeHelper.toString().split(".")[1];

    console.log(hour);
    console.log(minute);
    
    const [isChangingSoon, timeDifference] = handleChangingSoon(storeTimeHelper, currentTime);

    const hour12 = hour > 11 ? hour - 12 : hour;
    console.log(hour12);

    const ampm = hour > 11 ? "PM" : "AM";

    switch(status){
      case "Closed": 
        setHelperStatus(today.closedMessage);
        break;
      case "Open": {
        if(isChangingSoon){
          handleClosed(true);
          setHelperStatus(`in ${timeDifference} minutes`);
        } else
          setHelperStatus(`until ${hour12}:${minute}${ampm}`);
        break;
      }
      case "Closed until": {
        if(isChangingSoon){
          handleOpen(true);
          setHelperStatus(`in ${timeDifference} minutes`);
        } else{
          setHelperStatus(`Opens at ${hour12}:${minute}${ampm}`);
        }
        break;
      }
      case "Not open yet": {
        if(isChangingSoon){
          handleOpen(true);
          setHelperStatus(`in ${timeDifference} minutes`);
        } else{
          setHelperStatus(today.closedMessage);
        }
        break;
      }
      default: {
        setHelperStatus(today.closedMessage);
        break;
      }
    }
  };

  const handleChangingSoon = (time1, time2) => {
    const isChangingSoon = time1 - time2 < 1;
    const timeDifference = 
    Math.floor(time1) === Math.floor(time2) ? 
    Math.round((time1-time2)*100) :
    Math.round(((time1-time2)-0.4) * 100);

    return [isChangingSoon, timeDifference];
  };

  const setStatus = (currentTime) => {
    const dayTime = new Date(currentTime);
    const day = dayTime.getDay();
    const hour = dayTime.getHours();
    const minute = dayTime.getMinutes();

    if(minute < 10)
      handleOpenCloseStatus(storeHours[day], hour, `0${minute}`);
    else 
      handleOpenCloseStatus(storeHours[day], hour, minute);
  };

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
