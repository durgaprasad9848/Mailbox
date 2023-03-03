import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Sentboxlist } from "./Sentboxlist";
import { fetchDatasent } from "../slice/Contentslice";

export const Sentbox = () => {
  const dispatch = useDispatch();

  const sentboxdata = useSelector((state) => state.cont.sentboxdata);
  var isentempty = useSelector((state) => state.cont.emptysentbox);

  //When receiving data for display we must put it inside the useEffect and call the funtion and include try and catch block

  useEffect(() => {
    fetchDatasent(dispatch);

    // countfun(dispatch,inboxdata)
  }, []);

  return (
    <div>
      {Object.keys(sentboxdata).length === 0 ? (
        <div>
          <center>
            <h2>Empty Sentbox</h2>
          </center>
        </div>
      ) : (
        <div>
          {" "}
          <center>
            {" "}
            <h3>Sentbox</h3>
          </center>
          {Object.keys(sentboxdata).map((key) => (
            <Sentboxlist
              id={key}
              receiveremail={sentboxdata[key].receiveremail}
              subject={sentboxdata[key].subject}
              description={sentboxdata[key].description}
            />
          ))}
        </div>
      )}
    </div>
  );
};
