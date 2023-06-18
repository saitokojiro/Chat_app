import React, { useState } from "react";
import style from "./Home.module.css";

export const Home = (props: any) => {
  const [userName, setuserName] = useState<string>("");

  let handleChange = (e: any) => {
    setuserName(e.target.value);
  };
  /*
  let sendMessage = () => {
    if (userName !== "") {
      console.log(Date.now());
      localStorage.removeItem("c_name");
      localStorage.removeItem("id_User");
      localStorage.setItem("c_name", userName);
      localStorage.setItem("id_User", Date.now().toString());
      window.location.href = window.location.origin + "/";
      //location.replace(window.location.origin)
    } else {
      alert("champ vide");
    }
  };*/

  let connectBtn = () => {
    if(userName !== ""){
      console.log(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS)
      fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS+"/connection?user="+userName, {method: 'POST',credentials: 'include',})
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        console.log(result.data)
        localStorage.setItem('id_User', result.data.id)
        localStorage.setItem('c_name', result.data.user)
        window.location.href = window.location.origin + "/";
      })
      .catch((error) => console.log("error", error));
    }else{
      alert("empty")
    }
    //console.log("ok")
   // fetch("http://127.0.0.1:3987/connection?email=valeur2", {method: 'POST',credentials: 'include',})
    

  };

  let BtnConnect = () => {
    if (userName !== "") {
      return (
        <button onClick={connectBtn} className={style.btn_connect}>
          Connect
        </button>
      );
    } else {
      return (
        <button onClick={connectBtn} className={style.btn_connect_disable} disabled>
          Connect
        </button>
      );
    }
  };
  return (
    <div className={style.Main_Container}>
      <div className={style.container}>
        <span>
          Welcome <span className={style.TitleName}>{userName}</span>
        </span>
        <input type="text" onChange={handleChange} placeholder="You r username" className={style.inputUserName} required />
        <BtnConnect />
      </div>
    </div>
  );
};

export default Home;
