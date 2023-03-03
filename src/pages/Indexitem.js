import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Indexitem = () => {
  const indboxdata = useSelector((state) => state.cont.indboxdata);
  const params = useParams();

  return (
    <div>
      <p>
        <b>Send by:</b>
        {indboxdata[params.id].senderemail}
      </p>
      <p>
        <b>Sub:</b> {indboxdata[params.id].subject}{" "}
      </p>
      <p>
        <b>Descrioption:</b> {indboxdata[params.id].description}{" "}
      </p>
    </div>
  );
};
