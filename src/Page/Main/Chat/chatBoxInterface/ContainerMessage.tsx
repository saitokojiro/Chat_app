import React, { useContext, useState, useEffect } from "react";
import style from "./../Chat.module.css";
import { useParams } from "react-router-dom";

//import notif_ico from "./../../../img/notification-bell.svg";
import send_ico from "./../../../img/send_icon.svg";
import pin_ico from "./../../../img/pin_icon.svg";
import smiley_ico from "./../../../img/smiley_icon.svg";

import contactList from "./../contactList.json";
import messageList from "./../messageList.json";
import { wsContext } from "../../../../context/websocket";

export const ContainerMessage = () => {
  let parmsData: any = useParams();
  const ws = useContext(wsContext);
  const [getMessage, setgetMessage] = useState<any>([...messageList]);
  const [messageState, setmessageState] = useState<ISMessage>({
    id: "",
    message: "",
    isMedia: false,
    typeMedia: "",
    media: "",
    date: ""
  });

  let findUser = (uid: Number) => {
    return contactList.find((el: any) => el.id === uid);
  };

  useEffect(() => {
    ws.onmessage = (event: any) => {
      let contentJson = JSON.parse(event.data);
      console.log(contentJson);
      console.log(parseInt(parmsData.id));
      if (contentJson.id === parseInt(parmsData.id)) {
        let msgWS: {} = {
          id: contentJson.id,
          message: contentJson.message,
          isMedia: contentJson.isMedia,
          typeMedia: contentJson.typeMedia,
          media: contentJson.media,
          date: contentJson.date
        };
        setgetMessage([...getMessage, msgWS]);
      }
    };
  });

  let ShowMessage = (props: any) => {
    let userId: any = localStorage.getItem("c_user");
    let convertUserId: Number = parseInt(userId);

    let data: any = getMessage.map((el: any, key: any) => {
      if (el.id === convertUserId) {
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
              <div className={style.msg}>{el.message}</div>
            </div>
            <div className={style.dateFriend}>{el.date}</div>
          </div>
        );
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
  let userId: any = findUser(parseInt(parmsData.id));

  interface ISMessage {
    id: any;
    message: string;
    isMedia: boolean;
    typeMedia: any;
    media: string;
    date: string;
  }
  let userid: any = localStorage.getItem("c_user");
  let useridConver: Number = parseInt(userid);
  console.log(useridConver);
  let templateMessage: any = (msg: ISMessage) => {
    let idMessage: any = parmsData.id;
    let idMsgConv = parseInt(idMessage);
    console.log(idMsgConv);
    let template = {
      type: "private message",
      to: idMsgConv,
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
    }
  };

  let handleChange = (event: any) => {
    let data: any = localStorage.getItem("c_user");
    let convert: Number = parseInt(data);

    setmessageState({
      id: convert,
      message: event.target.value,
      isMedia: false,
      typeMedia: null,
      media: "",
      date: "12:20"
    });
  };

  let soonMessage = () => {
    alert("soon");
  };

  return (
    <div className={style.ChatBox}>
      <div className={style.headerChat}>
        <div className={style.headerChatInfo}>
          <div className={style.headerNameUser}>
            <div className={style.picProfilBox}>
              <img src="https://picsum.photos/600/300" className={style.picProfil} alt="" />
            </div>
            <div>{userId.name}</div>
            {/*<div>NameData</div>*/}
          </div>
          <div className={style.headerIcoUser}>
            <button>Ico</button>
            <button>Ico</button>
            <button>ICO</button>
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
