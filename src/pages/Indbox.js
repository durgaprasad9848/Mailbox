import axios from "axios";
import { useEffect, useState } from "react";
import { Indboxlist } from "./Indboxlist";

export const Indbox = () => {
  const [data, setData] = useState([]);

  const mail = localStorage.getItem("email").replace("@gmail.com", "");
  console.log(mail);
  //When receiving data for display we must put it inside the useEffect and call the funtion and try include try and catch block
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://test-api-c7d27-default-rtdb.firebaseio.com/${mail}/receive.json`
        );
    
          setData(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [mail]);

  return (
    <div>
      {data == null ? (
        <div>Empty indbox</div>
      ) : (
        <ul>
          {" "}
          {Object.keys(data).map((key) => (
            <Indboxlist
              id={key}
              senderemail={data[key].senderemail}
              subject={data[key].subject}
              description={data[key].description}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
