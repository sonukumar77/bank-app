import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";
import Account from "./components/Accounts/Accounts";
import Transactions from "./components/Transactions/Transactions";


export default function App() {

  const {accessToken} = useSelector(store => store);
  // console.log(userInfo);
  return (
    <div className="App">
      
      {accessToken?<Nav />:<Login />}
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/login" element={<Protected><Login /></Protected>} />
        <Route path="/account" element={<Protected><Account /></Protected>} />
        <Route path="/transactions/:email" element={<Protected><Transactions/></Protected>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
