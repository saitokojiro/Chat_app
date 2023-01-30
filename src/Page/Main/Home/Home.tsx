import React, { useState } from "react";
import style from "./Home.module.css";

export const Home = (props:any) =>{
    const [userName, setuserName] = useState<string>("");

    let handleChange =(e:any)=>{
        setuserName(e.target.value)
    }
    let sendMessage =()=>{
        if(userName!== ""){
            console.log(Date.now())
            localStorage.removeItem("c_name")
            localStorage.removeItem("c_userId")
            localStorage.setItem("c_name",userName);
            localStorage.setItem("c_userId", Date.now().toString());
            window.location.href= window.location.origin+"/"
            //location.replace(window.location.origin)
        }
        else{
            alert("champ vide")
        }
        
    }
    let BtnConnect =()=>{
        if(userName !=="")
        {
            return <button onClick={sendMessage} className={style.btn_connect}>Connect</button>
        }else{
            return <button onClick={sendMessage} className={style.btn_connect_disable} disabled>Connect</button>
        }
    }
    return(
    <div className={style.Main_Container}>
        <div className={style.container}>
            <span>Welcome <span className={style.TitleName}>{userName}</span></span>
            <input type="text" onChange={handleChange} placeholder="You r username" className={style.inputUserName} required/>
            <BtnConnect/>
        </div>
    </div>
    )
}

export default Home;