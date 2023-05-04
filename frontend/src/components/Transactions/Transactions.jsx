import { useEffect, useState } from "react";
import "./Transactions.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Transactions = () => {


  const [transactionsList,setTransactionsList] = useState([]);

  const {email} = useParams();
  const { accessToken } = useSelector((store) => store);

useEffect(() => {
  fetch(`${process.env.REACT_APP_BASE_URL}/account/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({ email:email }),
  })
    .then((res) => res.json())
    .then((data) => {
      setTransactionsList(data.getTransaction);
      
    });
}, [email,accessToken]);

// console.log("transactionsList",transactionsList);

    return(
        <div className="accounts-detail-container">
            <div className="table-container">
            <h1>Transactions List</h1>
        <table border="2" id="table">
          <thead>
          <tr>
              <th>S.No</th>
              <th>Date and Time</th>
              <th>Deposite</th>
              <th>Withdrawal</th>
              <th>Available Balance</th>
            </tr>
          </thead>
          <tbody>
          {transactionsList.map((element, i) => {
              return (
                <tr key={element._id}>
                  <td>{i + 1}</td>
                  <td>
                    {element.createdAt.slice(0, 10)}{" "}
                    {element.createdAt.slice(11, 19)}
                  </td>
                  <td>{element.deposite}</td>
                  <td>{element.withdrawal}</td>
                  <td>{element.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </div>
    )
}

export default Transactions;