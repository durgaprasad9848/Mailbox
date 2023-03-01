import React from "react";
import { setLogout } from "../slice/Authslice";
import { useDispatch } from "react-redux";
import {Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
export const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const composeHandler =(e)=>{
    e.preventDefault();
    navigate('/Compose');
  }

  return (
    <Card>
      <h1>Welcome to your mail box</h1>
      <nav> 
      <button onClick={composeHandler}>Compose</button>
      <button onClick={(e)=>{
        e.preventDefault();
        navigate('/Indbox');
      }}>Indbox</button>
      <button>Sentbox</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(setLogout());
        }}
      >
        Log out
      </button>
      </nav>
    </Card>
  );
};
