import axios from "axios";
import { useEffect, useState } from "react";
import { Indboxlist } from "./Indboxlist";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeindbox } from "../slice/Contentslice";

export const Indbox = () => {
    var initial = true;
    const [data, setData] = useState([]);
  const dispatch = useDispatch();
 // var inboxdata = useSelector((state)=>state.cont.inboxdata);
 const inboxdata = useSelector((state)=>state.cont.indboxdata);
  const mail = localStorage.getItem("email").replace("@gmail.com", "");
  console.log(mail);
  //When receiving data for display we must put it inside the useEffect and call the funtion and try include try and catch block
  useEffect(() => {
    if(initial){ 
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://test-api-c7d27-default-rtdb.firebaseio.com/${mail}/receive.json`
        );
            if(response.data != null){
            dispatch(storeindbox(response.data));
            }
            // setData(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    initial = false;
    }

  }, [mail]);

  return (
    <div>
      {inboxdata == null ? (
        <div>Empty indbox</div>
      ) : (
        <div> 
          {" "}<center> <h3>Indbox</h3></center>
          {Object.keys(inboxdata).map((key) => (
            <Indboxlist
              id={key}
              senderemail={inboxdata[key].senderemail}
              subject={inboxdata[key].subject}
              description={inboxdata[key].description}
              isVisited = {inboxdata[key].isVisited}
            />
          ))}
       </div>
      )}
    </div>
  );
};
