import React, { useState } from "react";
//import React, { useContext, useState, useEffect } from "react";
import style from "./../Chat.module.css";
import { useParams } from "react-router-dom";

//import notif_ico from "./../../../img/notification-bell.svg";
import send_ico from "./../../../img/send_icon.svg";
import pin_ico from "./../../../img/pin_icon.svg";
import smiley_ico from "./../../../img/smiley_icon.svg";
import phone_ico from "./../../../img/phone_icon.svg";
import threedote from "./../../../img/three_dote_icon.svg";
/*
import contactList from "./../contactList.json";
import messageList from "./../messageList.json";
import { wsContext } from "../../../../context/websocket";
*/
export const ContainerMessage = (props:{ws:any,historyMSG : any,Flist:any}) => {
  let ws = props.ws
  let parmsData: any = useParams();
  let messageList = props.historyMSG;
  const [getMessage, setgetMessage] = useState<any>([]);
  let ProContactList = props.Flist;
  const [messageState, setmessageState] = useState<ISMessage>({
    id: "",
    sender:"",
    message: "",
    isMedia: false,
    typeMedia: "",
    media: "",
    date: ""
  });

  let findUser = (uid: any) => {
    return ProContactList.find((el: any) => el.id === uid);
  };
  
  function unEscape(htmlStr:string) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    //htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    //htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

  let ShowMessage = (props: any) => {
    let userId: any = localStorage.getItem("c_name");
    let convertUserId:any = userId;

    // eslint-disable-next-line array-callback-return
    let data: any = messageList.map((el: any, key: any)=>{
      console.log(el.sender)
      console.log(convertUserId)
      let messageUnEscape = unEscape(el.message)
      if(parmsData.id === el.id)
      {
        if (el?.sender === convertUserId) {
          return (
            <div key={key}>
              <div className={style.ownMessage + " " + style.msgBox}>
                <div className={style.msg}>{el.message}</div>
              </div>
              <div className={style.date}>{el.date}</div>
            </div>
          );
        } else {
          return (
            <div key={key}>
              <div className={style.friendMessage + " " + style.msgBox} key={key}>
                <div className={style.msg}>{messageUnEscape}</div>
              </div>
              <div className={style.dateFriend}>{el.date}</div>
            </div>
          );
        }
      }
      
    });
    return data;
  };

  //console.log(parmsData);
  if (parmsData.id === undefined) {
    return (
      <div>
        <span>not found user</span>
      </div>
    );
  }
  let ParamUrl = parmsData.id
  let strData = ParamUrl.toString()
  let userId: any = findUser(strData);

  interface ISMessage {
    id: any;
    sender : any;
    message: string;
    isMedia: boolean;
    typeMedia: any;
    media: string;
    date: string;
  }
  //let userid: any = localStorage.getItem("c_user");
  let userid: any = localStorage.getItem("id_User");
  //let useridConver: Number = parseInt(userid);
  //console.log(userid)
  let useridConver:any = userid;
  //console.log(useridConver);
  let templateMessage: any = (msg: ISMessage) => {
    let idMessage: any = parmsData.id;
    let idMsgConv = idMessage;
    console.log(idMsgConv);
    let template = {
      type: "private message",
      to: idMsgConv,
      sender: idMsgConv,
      id: useridConver,
      message: msg.message,
      isMedia: msg.isMedia,
      typeMedia: msg.typeMedia,
      media: msg.media,
      date: msg.date
    };
    return template;
  };

  let sendMessage = (event: any) => {
    event.preventDefault();

    messageList.push(messageState);
    setgetMessage([...getMessage, messageState]);
    ws.send(JSON.stringify(templateMessage(messageState)));
  };

  let sendInputMessage = (event: any) => {
    if (event.key === "Enter") {
      //console.log("ok");
      event.preventDefault();

      messageList.push(messageState);
      setgetMessage([...getMessage, messageState]);
      ws.send(JSON.stringify(templateMessage(messageState)));
      setmessageState({
        id: "",
        sender:"",
        message: "",
        isMedia: false,
        typeMedia: null,
        media: "",
        date: ""
      })
    }
  };

  let handleChange = (event: any) => {
    let data: any = localStorage.getItem("c_name");
    let dateTime = new Date();
     
    let convert = data;

    setmessageState({
      id: parmsData.id,
      sender:convert,
      message: event.target.value,
      isMedia: false,
      typeMedia: null,
      media: "",
      date: dateTime.toLocaleString()
    });
  };

  let soonMessage = () => {
    alert("soon");
  };
//console.log("----------")
//console.log(userId?.name)
//console.log("----------")
  return (
    <div className={style.ChatBox}>
      <div className={style.headerChat}>
        <div className={style.headerChatInfo}>
          <div className={style.headerNameUser}>
            <div className={style.picProfilBox}>
              <img src="https://picsum.photos/600/300" className={style.picProfil} alt="" />
            </div>
            <div>{userId?.name}</div>
            {/*<div>NameData</div>*/}
          </div>
          
          <div className={style.headerIcoUser}>
            <button className={style.btn_CallBtn} onClick={(e)=>{soonMessage()}}><img src={phone_ico} alt="" className={style.icoCall}/></button>
            <button className={style.btn_more} onClick={(e)=>{soonMessage()}}><img src={threedote} alt="" className={style.icoMore}/></button>
          </div>
        </div>
      </div>
      <div className={style.messageContent}>
        <ShowMessage id={"129074"} />
      </div>
      <div className={style.inputMessage}>
        <button className={style.btn_radius + " " + style.btn_bg + " " + style.btn_pin} onClick={soonMessage}>
          <img src={pin_ico} alt="send_btn" className={style.icoPin} />
        </button>
        <div className={style.inputBox}>
          <input type="text" className={style.inputBarre} value={messageState?.message} onChange={handleChange} onKeyDown={sendInputMessage} />
        </div>
        <div className={style.btn_group}>
          <button className={style.btn_emote + " " + style.btn_radius + " " + style.btn_bg} onClick={soonMessage}>
            <img src={smiley_ico} alt="smiley_btn" className={style.icoSmiley} />
          </button>
          <button className={style.btn_send + " " + style.btn_Sender + " " + style.btn_bg} onClick={sendMessage}>
            <img src={send_ico} alt="send_btn" className={style.icoSend} />
          </button>
        </div>
      </div>
    </div>
  );
};

//ContainerMessage.propTypes = {};
