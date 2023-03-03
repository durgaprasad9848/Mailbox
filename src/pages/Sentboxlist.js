import {Card} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDatasent } from '../slice/Contentslice';
import { useDispatch } from 'react-redux';
import { emptySentbox } from '../slice/Contentslice';
export const Sentboxlist = (props)=>{
 
    const sentboxdata = useSelector((state)=>state.cont.sentboxdata);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

 
    // }


    const deleteHandler = async() =>{
         await axios
        .delete(
          `https://test-api-c7d27-default-rtdb.firebaseio.com/${
            localStorage.getItem("email").replace("@gmail.com", "")
          }/send/${props.id}.json`
        )
        .then((response) => {
     
            if (Object.keys(sentboxdata).length ===1){
                dispatch(emptySentbox());
            }

          fetchDatasent(dispatch);
 
        })
        .catch((error) => {
          console.log(error);
   
        });
        
    }


    const path = `/Sentboxitem/${props.id}`;

    return(
    <div>
    
    <Card key={props.id}  > 
    <NavLink to ={path}    > 
        {props.receiveremail.replace("@gmail.com", "")} - {props.subject} 
        </NavLink>
        <button onClick={deleteHandler}>delete</button>
    </Card>

    
    </div>
    )
    
}