import React, { useState } from "react";
import style from "./Home.module.css";

export const Home = (props: any) => {
  const [userName, setuserName] = useState<string>("");

  let handleChange = (e: any) => {
    setuserName(e.target.value);
  };
  let sendMessage = () => {
    if (userName !== "") {
      console.log(Date.now());
      localStorage.removeItem("c_name");
      localStorage.removeItem("c_userId");
      localStorage.setItem("c_name", userName);
      localStorage.setItem("c_userId", Date.now().toString());
      window.location.href = window.location.origin + "/";
      //location.replace(window.location.origin)
    } else {
      alert("champ vide");
    }
  };

  let testing = () => {
    //console.log("ok")
   // fetch("http://127.0.0.1:3987/connection?email=valeur2", {method: 'POST',credentials: 'include',})
    fetch("http://127.0.0.1:3987/connection?user="+userName, {method: 'POST',credentials: 'include',})
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        localStorage.setItem('id_User', result.data.id)
        localStorage.setItem('c_name', result.data.User)
        window.location.href = window.location.origin + "/";
      })
      .catch((error) => console.log("error", error));

  };
  let testings = () => {
    
    //fetch("http://127.0.0.1:3987/connection?email=valeur2", {method: 'POST',credentials: 'include',})
   /* fetch("https://saitokojiro.loca.lt/connection?email=valeur2", { method: "POST", credentials: "include" })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
*/
      //fetch("http://127.0.0.1:3987/connection", {
      fetch("http://127.0.0.1:3987/connection",{
        method:"GET",
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
  };

  let BtnConnect = () => {
    if (userName !== "") {
      return (
        <button onClick={sendMessage} className={style.btn_connect}>
          Connect
        </button>
      );
    } else {
      return (
        <button onClick={sendMessage} className={style.btn_connect_disable} disabled>
          Connect
        </button>
      );
    }
  };
  let BtnConnects = () => {
    return (
      <button onClick={testing} className={style.btn_connect}>
        Connect
      </button>
    );
  };
  let BtnConnectss = () => {
    return (
      <button onClick={testings} className={style.btn_connect}>
        Connect
      </button>
    );
  };
  return (
    <div className={style.Main_Container}>
      <div className={style.container}>
        <span>
          Welcome <span className={style.TitleName}>{userName}</span>
        </span>
        <input type="text" onChange={handleChange} placeholder="You r username" className={style.inputUserName} required />
        <BtnConnect />
        <BtnConnects />
        <BtnConnectss />
      </div>
    </div>
  );
};

export default Home;
