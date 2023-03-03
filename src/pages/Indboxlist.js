import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDataind } from "../slice/Contentslice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateCount } from "../slice/Contentslice";
import { emptyIndbox } from "../slice/Contentslice";
import useHttp from "../custom_hooks/useHttp";

export const Indboxlist = (props) => {
  const indboxdata = useSelector((state) => state.cont.indboxdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //http requst and if there is any response store in httpdata
  const [httpdata, setHttpdata] = useState([]);
  const { sendRequest } = useHttp(setHttpdata);

  useEffect(() => {
    fetchDataind(dispatch);
    dispatch(updateCount());
    // countfun(dispatch,inboxdata)
  }, []);

  const clikcHandler = () => {
    const data = {
      description: props.description,
      senderemail: props.senderemail,
      subject: props.subject,
      isVisited: props.isVisited,
    };
    console.log("clicked", props.isVisited);

    sendRequest({
      url: `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage
        .getItem("email")
        .replace("@gmail.com", "")}/receive/${props.id}.json`,
      method: "PUT",
      body: { ...data, isVisited: true },
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchDataind(dispatch);
  };

  const deleteHandler = async () => {
    await sendRequest({
      url: `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage
        .getItem("email")
        .replace("@gmail.com", "")}/receive/${props.id}.json`,
      method: "DELETE",
    });

    if (Object.keys(indboxdata).length === 1) {
      dispatch(emptyIndbox());
    }

    fetchDataind(dispatch);
  };

  const path = `/Indexitem/${props.id}`;

  return (
    <div>
      <Card key={props.id}>
        <NavLink to={path} onClick={() => clikcHandler()}>
          {props.isVisited ? "" : "unread"} {props.senderemail} -{" "}
          {props.subject}
        </NavLink>
        <button onClick={deleteHandler}>delete</button>
      </Card>
    </div>
  );
};
