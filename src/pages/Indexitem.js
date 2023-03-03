import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
 
import { useDispatch } from "react-redux";
import axios from "axios";
export const Indexitem = () =>{
    var initial = true;
    const dispatch = useDispatch();
    const indboxdata = useSelector((state)=>state.cont.indboxdata);
    const params = useParams();
 
  //  console.log(indboxdata[params.id].isVisited,"isvisited item");
   
    return(<div>
        <p><b>Send by:</b>{indboxdata[params.id].senderemail}</p>
        <p><b>Sub:</b> {indboxdata[params.id].subject} </p>
        <p><b>Descrioption:</b> {indboxdata[params.id].description} </p>
        <p>isVisited {indboxdata[params.id].isVisited}</p>
    </div>);
}