import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { accessToken } = useSelector((store) => store);


  if (accessToken) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
};

export default Protected;
