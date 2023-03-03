import axios from "axios";
import { useEffect, useState } from "react";
import { Indboxlist } from "./Indboxlist";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeindbox } from "../slice/Contentslice";
import { fetchDataind } from "../slice/Contentslice";
import { updateCount } from "../slice/Contentslice";
//import { countfun } from "../slice/Contentslice";
export const Indbox = () => {
    var initial = true;
    const [data, setData] = useState([]);
  const dispatch = useDispatch();
 // var inboxdata = useSelector((state)=>state.cont.inboxdata);
 const inboxdata = useSelector((state)=>state.cont.indboxdata);
 
 
  //When receiving data for display we must put it inside the useEffect and call the funtion and include try and catch block

 

  useEffect(() => {
    fetchDataind(dispatch,inboxdata);
    dispatch(updateCount());
   // countfun(dispatch,inboxdata)
  },[]);

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
