import React from "react";
import style from "./Chat.module.css";
import notif_ico from "./../../img/notification-bell.svg";
import send_ico from "./../../img/send_icon.svg";
import pin_ico from "./../../img/pin_icon.svg";
import smiley_ico from "./../../img/smiley_icon.svg";
import { useParams } from "react-router-dom";
import { ContactCard } from "./friendList";
import { ContainerMessage } from "./chatBoxInterface/ContainerMessage";

import contactList from "./contactList.json";
import messageList from "./messageList.json";

let alertNotif = () => {
  alert("coming soon");
};

let findUser = (uid: Number) => {
  //console.log(typeof(uid))
  return contactList.find((el: any) => el.id === uid);
};

let ShowMessage = (props: any) => {
  console.log(props.id);
  let data: any = messageList.map((el: any, key: any) => {
    if (el.id === parseInt(props.id)) {
      return (
        <div className={style.ownMessage + " " + style.msgBox} key={key}>
          <div className={style.msg}>{el.message}</div>
        </div>
      );
    } else {
      return (
        <div className={style.friendMessage + " " + style.msgBox} key={key}>
          <div className={style.msg}>{el.message}</div>
        </div>
      );
    }
  });
  return data;
};

let ContainerMessages = () => {
  let parmsData = useParams();
  console.log(parmsData);
  if (parmsData.id === undefined) {
    return (
      <div>
        <span>not found user</span>
      </div>
    );
  }
  let userId: any = findUser(parseInt(parmsData.id));

  console.log(userId);
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
        <button className={style.btn_radius + " " + style.btn_bg + " " + style.btn_pin}>
          <img src={pin_ico} alt="send_btn" className={style.icoPin} />
        </button>
        <div className={style.inputBox}>
          <input type="text" className={style.inputBarre} />
        </div>
        <div className={style.btn_group}>
          <button className={style.btn_emote + " " + style.btn_radius + " " + style.btn_bg}>
            <img src={smiley_ico} alt="smiley_btn" className={style.icoSmiley} />
          </button>
          <button
            className={style.btn_send + " " + style.btn_Sender + " " + style.btn_bg}
            onClick={(e) => {
              console.log("ok");
            }}
          >
            <img src={send_ico} alt="send_btn" className={style.icoSend} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Chat = (props: any) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.boxContact}>
        <div className={style.infoUser}>
          <div className={style.userID}>
            <div className={style.picProfilBox}>
              <img src="https://picsum.photos/600/300" alt="" className={style.picProfil} />
            </div>
            <div>Lorem ipsum</div>
          </div>
          <div
            className={style.notificationBell}
            onClick={(e) => {
              alertNotif();
            }}
          >
            <img src={notif_ico} alt="bell" className={style.icoNotif} />
          </div>
        </div>
        <div className={style.listContactContainer}>
          <div className={style.listContactBox}>
            <div className={style.searchBox}>
              <input type="text" className={style.searchBar} />
            </div>
            <div className={style.listContact}>
              <ul className={style.listCard}>
                <ContactCard />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={style.contentChat}>
        <ContainerMessage />
      </div>
    </div>
  );
};

export default Chat;
