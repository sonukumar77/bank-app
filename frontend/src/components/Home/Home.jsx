import { Link } from "react-router-dom";

import "./Home.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [transaction, setTransaction] = useState([]);
  const [deposite, setDeposite] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const { userInfo, accessToken } = useSelector((store) => store);

  useEffect(() => {
    getTransaction();
  }, [deposite,withdraw]);


  const getTransaction = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/account/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({ email: userInfo.email }),
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setTransaction(data.getTransaction);
      } else {
        console.log("something went wrong");
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };





  const handleDeposite = async () => {
    const amount = parseInt(prompt("Enter deposite amount"));
    if (amount !== null || amount !== "") {
    
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/account/deposite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
              email: userInfo.email,
              deposite_amount: amount,
            }),
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          alert(data.message);
            setDeposite(true);
        //   console.log(data);
        } else {
        //   console.log("something went wrong");
          alert("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleWithdrawal = async () => {
    const amount = parseInt(prompt("Enter withdrawal amount"));
    if (amount !== null || amount !== "") {
    
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/account/withdrawal`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
              email: userInfo.email,
              withdrawal_amount: amount,
            }),
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          alert(data.message);
            setWithdraw(true);
        //   console.log(data);
        } else {
        //   console.log("something went wrong");
          alert("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }else{
        alert("something went wrong!!");
    }
  }
//   console.log("transaction", transaction);
  return (
    <div className="home-container">
      <div className="button-container">
        <Link className="btn" onClick={handleDeposite}>
          Deposite
        </Link>
        <Link className="btn" onClick={handleWithdrawal}>Withdraw</Link>
      </div>
      <div className="table-container">
        <h1>All Customers Transactions List</h1>
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
            {transaction.map((element, i) => {
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
  );
};

export default Home;
