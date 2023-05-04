import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./Accounts.css";
import { useSelector } from "react-redux";

const Accounts = () => {

    const [customerList,setCustomerList] = useState([]);

    const {  accessToken } = useSelector((store) => store);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ type: "customer" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.users);
        
      });
  }, []);

  // console.log("customer", customerList);
  return (
    <div className="account-container">
      <div className="table-container">
      <h1>All Customer List </h1>
        <table border="2" id="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Date and Time</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
            {customerList.map((element, i) => {
              return (
                <tr key={element._id}>
                  <td>{i + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.type}</td>
                  <td>
                    {element.createdAt.slice(0, 10)}{" "}
                    {element.createdAt.slice(11, 19)}
                  </td>
                  <td>
                    <Link to={`/transactions/${element.email}`}>detail</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
