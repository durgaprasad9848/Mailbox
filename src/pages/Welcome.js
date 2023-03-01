import React, { useState } from "react";
import { setLogout } from "../slice/Authslice";
import { useDispatch } from "react-redux";
import {Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { updateCount } from "../slice/Contentslice";


export const Welcome = () => {
  var count =0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inboxdata = useSelector((state)=>state.cont.indboxdata);

  Object.keys(inboxdata).map((key) => { if(!inboxdata[key].isVisited){ count++;  } });
  console.log(count);
  dispatch(updateCount(count));   


  const composeHandler =(e)=>{
    e.preventDefault();
    navigate('/Compose');
  }
  console.log(inboxdata,"indbox data");

  return (
    <Card>
      <h1>Welcome to your mail box</h1>
      <nav> 
      <button onClick={composeHandler}>Compose</button>
      <button onClick={(e)=>{
        e.preventDefault();
        navigate('/Indbox');
      }}>Indbox {(count>0)?count:""} </button>
      <button>Sentbox</button>
      <button
        onClick={async(e) => {
          e.preventDefault();
        //   await axios
        //   .put(
        //     `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage.getItem('email').replace("@gmail.com","")}/receive.json`,
        //     inboxdata
        //   )
        //   .then((response) => {
        //     console.log(response);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
          dispatch(setLogout());
        }}
      >
        Log out
      </button>
      </nav>
    </Card>
  );
};
