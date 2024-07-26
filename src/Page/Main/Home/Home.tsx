import React, { useState } from "react";
import style from "./Home.module.css";

export const Home = (props: any) => {
  const [userName, setuserName] = useState<string>("");
  const [EmailName, setEmailName] = useState<string>("");
  const [EmailNameCheck, setEmailNameCheck] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [PasswordCheck, setPasswordCheck] = useState<string>("");

  const [changeForm, setChangeForm] = useState<boolean>()
  const [FormC, setFormC] = useState<string>(style.cLogin)


  let handleChange = (e: any) => {
    setuserName(e.target.value);
  };
  let handleChangerRegister = (e: any) => {
    console.log(e.target.value)
    setuserName(e.target.value);
  }

  let handleEmail = (e: any) => {
    setEmailName(e.target.value);
  }
  let handlePassword = (e: any) => {
    setPassword(e.target.value);
  }
  let handleEmailCheck = (e: any) => {
    setEmailNameCheck(e.target.value);
  }
  let handlePasswordCheck = (e: any) => {
    setPasswordCheck(e.target.value);
  }

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
    if (EmailName !== EmailNameCheck) return;
    if (Password !== PasswordCheck) return;
    if (userName !== "") {


      fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/connection?user=" + userName, {
        //  method: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          email: "test@test.fr",
          pwd: "helloworld"
        })
      })

        .then((response) => {
          console.log(response.ok)
          return response.json();
        })
        .then((result) => {
          console.log(result)
          console.log(result.data)

          localStorage.setItem('id_User', result.data.id)
          localStorage.setItem('c_name', result.data.user)
          window.location.href = window.location.origin + "/";
        })
        .catch((error) => {
          console.log(error)
        });

    } else {
      alert("empty")
    }

  };


  let registerBtn = () => {

  }

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

  let BtnRegister = () => {
    if (userName !== "" && EmailName !== "" && EmailNameCheck !== "" && Password !== "" && PasswordCheck !== "") {
      return (
        <button onClick={registerBtn} className={style.btn_connect}>
          Register
        </button>
      );
    } else {
      return (
        <button onClick={registerBtn} className={style.btn_connect} disabled>
          Register
        </button>
      )
    }
  }



  let ShowRegister = () => {
    return (
      <button onClick={ToggleForm} className={style.btn_connect}>
        Register
      </button>
    )
  }
  let ShowLogin = () => {
    return (
      <button onClick={ToggleForm} className={style.btn_connect}>
        Login
      </button>
    )
  }


  let ToggleForm = () => {
    if (changeForm) {
      setFormC(style.cLogin)
      setChangeForm(false)
    } else {
      setFormC(style.cForm)
      setChangeForm(true)
    }
  }


  return (
    <div className={style.Main_Container}>
      <div className={style.container + " " + FormC}>
        <span>
          Welcome <span className={style.TitleName}>{userName}</span>
        </span>
        <span>
          Autorisé le serveur pour vous connecté : <a href="https://192.168.1.61:3987" target="_blank">Serveur</a>
        </span>
        <input type="text" onChange={handleChange} placeholder="You r username" className={style.inputUserName} required />
        <BtnConnect />
        <ShowRegister />
      </div>
      <div className={style.popRegister + " " + FormC}>
        <span className={style.TitleName}>Register</span>
        <input type="text" onChange={handleChangerRegister} placeholder="You'r username" className={style.inputUserName} required />
        <input type="email" onChange={handleEmail} placeholder="Email" className={style.inputUserName + " " + style.email} required />
        <input type="email" onChange={handleEmailCheck} placeholder="Confirm email" className={style.inputUserName + " " + style.emailC} required />
        <input type="password" onChange={handlePassword} placeholder="Password" className={style.inputUserName + " " + style.password} required />
        <input type="password" onChange={handlePasswordCheck} placeholder="Confirm password" className={style.inputUserName + " " + style.passwordC} required />
        <BtnRegister />
        <ShowLogin />
      </div>
    </div>
  );
};

export default Home;
