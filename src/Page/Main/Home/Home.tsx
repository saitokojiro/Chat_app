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



  const [errorE, setErrorE] = useState<string>(style.email)
  const [errorEC, setErrorEC] = useState<string>(style.emailC)
  const [errorP, setErrorP] = useState<string>(style.password)
  const [errorPC, setErrorPC] = useState<string>(style.passwordC)


  let resetER = (key: number) => {
    switch (key) {
      case 1:
        setErrorE(style.email)
        break;
      case 2:
        setErrorEC(style.emailC)
        break;
      case 3:
        setErrorP(style.password)
        break;
      case 4:
        setErrorPC(style.passwordC)
        break;
    }
    /*
    setErrorE(style.email)
    setErrorEC(style.emailC)
    setErrorP(style.password)
    setErrorPC(style.passwordC)*/
  }

  let handleChange = (e: any) => {
    setuserName(e.target.value);
  };
  let handleChangerRegister = (e: any) => {

    setuserName(e.target.value);
  }

  let handleEmail = (e: any) => {
    resetER(1)
    setEmailName(e.target.value);
  }
  let handlePassword = (e: any) => {
    resetER(3)
    setPassword(e.target.value);
  }
  let handleEmailCheck = (e: any) => {
    resetER(2)
    setEmailNameCheck(e.target.value);
  }
  let handlePasswordCheck = (e: any) => {
    resetER(4)
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
    //if (EmailName !== EmailNameCheck) return;
    //if (Password !== PasswordCheck) return;
    if (EmailName !== "") {


      fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/login?user=" + userName, {
        //  method: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          email: EmailName,
          password: Password
        })
      })

        .then((response) => {
          console.log(response.ok)
          return response.json();
        })
        .then((result) => {
          if (!result?.error) {
            console.log(result)
            console.log(result.data)

            localStorage.setItem('id_User', result.id)
            localStorage.setItem('c_name', result.user)
            window.location.href = window.location.origin + "/";
          } else {
            console.log("error")
          }
        })
        .catch((error) => {
          console.log(error)
        });

    } else {
      alert("empty")
    }

  };


  let registerBtn = () => {


    if (Password !== PasswordCheck) {
      setErrorP(style.passwordE)
      setErrorPC(style.passwordCE)
      if (EmailName !== EmailNameCheck) {
        setErrorE(style.emailE)
        setErrorEC(style.emailCE)
        return;
      }
      return;
    }
    if (EmailName !== EmailNameCheck) {
      setErrorE(style.emailE)
      setErrorEC(style.emailCE)

      if (Password !== PasswordCheck) {
        setErrorP(style.passwordE)
        setErrorPC(style.passwordCE)
        return
      }
      return;
    }

    fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/register", {
      //  method: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        user: userName,
        email: EmailName,
        emailCheck: EmailNameCheck,
        password: Password,
        passwordCheck: PasswordCheck
      })
    }).then(e => e.json())
      .then(e => {
        console.log(e.data)
      })
      .catch(e => console.log(e))


  }

  let BtnConnect = () => {
    if (EmailName !== "") {
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
      setuserName("");
      setEmailName("");
      setEmailNameCheck("");
      setPassword("");
      setPasswordCheck("");
    } else {
      setFormC(style.cForm)
      setChangeForm(true)
      setuserName("");
      setEmailName("");
      setEmailNameCheck("");
      setPassword("");
      setPasswordCheck("");
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
        <input type="text" onChange={handleEmail} placeholder="Email" className={style.inputUserName} required />
        <input type="password" onChange={handlePassword} placeholder="Password" className={style.inputUserName + " " + errorP} required />
        <BtnConnect />
        <ShowRegister />
      </div>
      <div className={style.popRegister + " " + FormC}>
        <span className={style.TitleName}>Register</span>
        <input type="text" onChange={handleChangerRegister} placeholder="You'r username" className={style.inputUserName} required />
        <input type="email" onChange={handleEmail} placeholder="Email" className={style.inputUserName + " " + errorE} required />
        <input type="email" onChange={handleEmailCheck} placeholder="Confirm email" className={style.inputUserName + " " + errorEC} required />
        <input type="password" onChange={handlePassword} placeholder="Password" className={style.inputUserName + " " + errorP} required />
        <input type="password" onChange={handlePasswordCheck} placeholder="Confirm password" className={style.inputUserName + " " + errorPC} required />
        <BtnRegister />
        <ShowLogin />
      </div>
    </div>
  );
};

export default Home;
