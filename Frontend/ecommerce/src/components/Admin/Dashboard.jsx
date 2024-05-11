import {React, useEffect} from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import { getAllCategory } from "../../actions/categoryAction";
import PendingOrderList from "./PendingOrderList";
function Dashboard() {
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.products);
  // const { categories } = useSelector((state) => state.categories);
  // const { orders } = useSelector((state) => state.allOrders);
  // const { users } = useSelector((state) => state.allUsers);
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products) || { products: [] };
  const {  orders } = useSelector((state) => state.allOrders) || {};
  const { users } = useSelector((state) => state.allUsers) || { allUsers: [] };

useEffect(() => {
  dispatch(getAdminProduct());
  dispatch(getAllUsers());
  dispatch(getAllCategory());
  dispatch(getAllOrders());
 
}, [dispatch])


const productOrderUserData = [
  {
    name: "Products",
    value: products ? products.length : 0,
  },
  {
    name: "Orders",
    value: orders ? orders.length : 0,
  },
  {
    name: "Users",
    value: users ? users.length : 0,
  },
];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>

          <h1>{products && products.length}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{categories && categories.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{users && users.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ORDERS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{orders && orders.length}</h1>
        </div>
      </div>

    <PendingOrderList/>
    </main>
  );
}

export default Dashboard;
