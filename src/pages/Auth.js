import "./Auth.css";
import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change } from "../slice/Authslice";
import { useNavigate } from "react-router-dom";
import { setLogin  } from "../slice/Authslice";
import axios from "axios";

export const Auth = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const pwd = useRef();
  const cnpwd = useRef();
  const navigate = useNavigate();
  // const isLogin = useSelector((state)=>state.Auth.isLogin);
  var Login = useSelector((state) => state.auth.Login);
  const buttonHandler = async (e) => {
    e.preventDefault();

    if (Login) {
      const emailval = email.current.value;
      const pwdval = pwd.current.value;

      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailval,
              password: pwdval,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log(data.idToken);
                                             
        localStorage.setItem("token", data.idToken);   
        dispatch(setLogin());
       
     
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      const emailval = email.current.value;
      const pwdval = pwd.current.value;
      const cnpwdval = cnpwd.current.value;
      if (pwdval == cnpwdval) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4",
            {
              method: "POST",
              body: JSON.stringify({
                email: emailval,
                password: pwdval,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data.idToken);

          console.log("user is successfully signed up");

          if (!response.ok) {
            throw new Error(data.error.message);
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
      } else {
        alert("password and conform password is not matched");
      }

      console.log(emailval, pwdval, cnpwdval);
    }
  };

  return (
    <div className={"card"}>
      <div className={"main"}>
        <Form>
          <label for="email">Enter Email</label>
          <br />
          <input type="email" ref={email} />
          <br />
          <label for="password">Enter Password</label>
          <br />
          <input type="text" ref={pwd} />
          <br />
          {!Login && <label for="password">Conform Password</label>}
          <br />
          {!Login && <input type="text" ref={cnpwd} />}
          <br />

          <Button onClick={buttonHandler}>
            {Login ? "Log in" : "Sign up"}
          </Button>
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(change());
            }}
          >
            {Login
              ? "Don't have account sign up"
              : "Already have account? Log in"}
          </button>
        </Form>
      </div>
    </div>
  );
};
