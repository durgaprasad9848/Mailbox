import {Card} from 'react-bootstrap'

export const Indboxlist = (props)=>{
    return(
    <li key={props.id}> 
    
          {props.senderemail} - {props.subject} - {props.description}
 
    </li>
    )
    
}