import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
 
import { useDispatch } from "react-redux";
import axios from "axios";
export const Sentitem = () =>{
 
    const dispatch = useDispatch();
    const sentboxdata = useSelector((state)=>state.cont.sentboxdata);
    const params = useParams();
 
  //  console.log(indboxdata[params.id].isVisited,"isvisited item");
   
    return(<div>
        <p><b>Sent to :</b>{sentboxdata[params.id].receiveremail}</p>
        <p><b>Sub :</b> {sentboxdata[params.id].subject} </p>
        <p><b>Descrioption :</b> {sentboxdata[params.id].description} </p>
     
    </div>);
}