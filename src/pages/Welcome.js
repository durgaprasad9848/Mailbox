import React, { useEffect, useState } from "react";
import { setLogout } from "../slice/Authslice";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Welcome = () => {
  var count = useSelector((state) => state.cont.totalUnread);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inboxdata = useSelector((state) => state.cont.indboxdata);

  const composeHandler = (e) => {
    e.preventDefault();
    navigate("/Compose");
  };
  console.log(inboxdata, "indbox data");

  return (
    <Card>
      <h1>Welcome to your mail box</h1>
      <nav>
        <button onClick={composeHandler}>Compose</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/Indbox");
          }}
        >
          Indbox {count > 0 ? count : ""}{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/Sentbox");
          }}
        >
          Sentbox
        </button>
        <button
          onClick={async (e) => {
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
