import { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/action";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    
    if(username !=="" || password !==""){
        try{    
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:username,password:password,type:"customer"})
            });
        
            if(res.status === 200){
                const data = await res.json();
                // console.log(data.userInfo,data.access_token)
                dispatch(userLogin(data.userInfo,data.access_token));
                
            }else{
                console.log("something went wrong");
                alert("something went wrong");
            }
            
        
            }catch(error){
                console.log(error);
            }
    }else{
        alert("All fields required!1");
    }
   
  }

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <img
          src="https://cdn.pixabay.com/photo/2021/11/18/11/35/attack-6806140__340.png"
          alt="login_left_poster"
        />
      </div>
      <div className="login-right-panel">
        <div className="login-form">
          <h1>LOGIN</h1>
          <div className="input-container">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              placeholder="e.g. example@gmail.com"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
