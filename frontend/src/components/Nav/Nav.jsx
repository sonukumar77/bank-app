import { Link } from "react-router-dom";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/action";

const Nav = () => {

    const dispatch = useDispatch();
    const {userInfo} = useSelector(store => store);
    // console.log("userInfo",userInfo)
  return (
    <div className="nav-container">
      <div className="nav-left">
        <h1>Logo</h1>
      </div>
      <div className="nav-right">
        <ul>
          <li>
            <Link to="/" id="home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/account" id="account">
              Accounts
            </Link>
          </li>
          <li>
            <button onClick={() => dispatch(userLogout())}>Logout</button>
          </li>
          <li style={{ color: "yellow" }}>{userInfo?.email}</li>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
