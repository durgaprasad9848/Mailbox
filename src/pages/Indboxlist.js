import {Card} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDataind } from '../slice/Contentslice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateCount } from '../slice/Contentslice';
import { emptyIndbox } from '../slice/Contentslice';
 
export const Indboxlist = (props)=>{
    const isVisited = useSelector((state)=>state.cont.isVisited);
    const indboxdata = useSelector((state)=>state.cont.indboxdata);
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    useEffect(() => {
        fetchDataind(dispatch);
        dispatch(updateCount());
       // countfun(dispatch,inboxdata)
      },[]);
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
        .then((response) => {console.log(response); fetchDataind(dispatch);})
        .catch((error) => console.log(error));


    }


    const deleteHandler = async() =>{
         await axios
        .delete(
          `https://test-api-c7d27-default-rtdb.firebaseio.com/${
            localStorage.getItem("email").replace("@gmail.com", "")
          }/receive/${props.id}.json`
        )
        .then((response) => {
          console.log(response);

          if(Object.keys(indboxdata).length === 1)
    {
        dispatch(emptyIndbox());
    }


        
          fetchDataind(dispatch);
 
        })
        .catch((error) => {
          console.log(error);
   
        });
        
    }


    const path = `/Indexitem/${props.id}`;

    return(
    <div>
    
    <Card key={props.id}  > 
    <NavLink to ={path} onClick={()=>clikcHandler()}   > 
        {(props.isVisited)?"":"unread"}  {props.senderemail} - {props.subject}
        </NavLink>
        <button onClick={deleteHandler}>delete</button>
    </Card>

    
    </div>
    )
    
}