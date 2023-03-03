import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { fetchDatasent } from "../slice/Contentslice";
import { useDispatch } from "react-redux";
import { emptySentbox } from "../slice/Contentslice";
import useHttp from "../custom_hooks/useHttp";
import { useState } from "react";

export const Sentboxlist = (props) => {
  const sentboxdata = useSelector((state) => state.cont.sentboxdata);

  const dispatch = useDispatch();


  const[httpdata,setHttpdata] = useState([]);
  const { sendRequest } = useHttp(setHttpdata);

  const deleteHandler = async () => {


    await sendRequest({
        url:`https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage.getItem("email").replace("@gmail.com", "")}/send/${props.id}.json` ,
        method: "DELETE", 
      });
 


    if (Object.keys(sentboxdata).length === 1) {
        dispatch(emptySentbox());
      }

      fetchDatasent(dispatch);
 
  };

  const path = `/Sentboxitem/${props.id}`;

  return (
    <div>
      <Card key={props.id}>
        <NavLink to={path}>
          {props.receiveremail.replace("@gmail.com", "")} - {props.subject}
        </NavLink>
        <button onClick={deleteHandler}>delete</button>
      </Card>
    </div>
  );
};
