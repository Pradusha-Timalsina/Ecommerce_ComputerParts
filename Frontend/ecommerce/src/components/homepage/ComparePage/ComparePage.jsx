import { Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import CompareCard from "../../Components/User/Compare/CompareCard";
// import { emptyCompare } from "../../Redux/compareProductSlice";
import "./comparepage.css";

const ComparePage = () => {
  //   const dispatch = useDispatch();
  //   const { products } = useSelector((state) => state.compare);

  return (
    <div className="container">
      <>
        <div className="header">
          <h3 className="title">Compare List</h3>
          <Button
            className="empty-button"
            color="error"
            //   onClick={() => dispatch(emptyCompare())}
          >
            EMPTY COMPARE LIST
          </Button>
        </div>
        <div className="main-wrapper"></div>
      </>

      {/* <Fetching type="Empty" Message="Compare List empty!" /> */}
    </div>
  );
};

export default ComparePage;
