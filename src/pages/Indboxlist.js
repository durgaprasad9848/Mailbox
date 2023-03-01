import {Card} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
export const Indboxlist = (props)=>{
    const isVisited = useSelector((state)=>state.cont.isVisited);
    const indboxdata = useSelector((state)=>state.cont.indboxdata);
 //   console.log("isVisited list",indboxdata[props.id].isVisited);
  //  console.log(`https://test-api-c7d27-default-rtdb.firebaseio.com/pravalika/receive//pravalika/receive/-NPRyuGmbQwvoUc_Qg9k.json`)

    // const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         `https://test-api-c7d27-default-rtdb.firebaseio.com/${mail}/receive.json`
    //       );
    //           if(response.data != null){
    //           dispatch(storeindbox(response.data));
    //           }
    //           // setData(response.data);
          
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   fetchData();

    const clikcHandler = () =>
    {
        const data = {
            description : props.description,
            senderemail : props.senderemail,
            subject : props.subject,
            isVisited: props.isVisited,
        }
        console.log("clicked",props.isVisited);
    //    console.log( localStorage.getItem("email").replace("@gmail.com", ""),props.id);
       var path =  `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage.getItem("email").replace("@gmail.com","")}/receive/${props.id}.json`;
       console.log(path,"path");
       axios
        .put(
           path,
          { ...data, isVisited: true }
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));


    }

    const path = `/Indexitem/${props.id}`;

    return(
    <NavLink to ={path} onClick={()=>clikcHandler()}   > 
    <Card key={props.id}  > 
     
        {(props.isVisited)?"":"unread"}  {props.senderemail} - {props.subject}  
    
    </Card>
    </NavLink>
    )
    
}