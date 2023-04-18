import React, { useContext, useState, useLayoutEffect } from "react";
//import React, { useContext, useState, useEffect, useReducer, useLayoutEffect } from "react";
import style from "./Chat.module.css";
import notif_ico from "./../../img/notification-bell.svg";
import logout from "./../../img/logout-svgrepo-com.svg";
/*
import send_ico from "./../../img/send_icon.svg";
import pin_ico from "./../../img/pin_icon.svg";
import smiley_ico from "./../../img/smiley_icon.svg";*/
import { useParams } from "react-router-dom";
import { FriendList } from "./friendList";
import { ContainerMessage } from "./chatBoxInterface/ContainerMessage";
import { wsContext } from "../../../context/websocket";
import MobileMenu from "./mobile_menu/mobileMenu";
/*
import contactList from "./contactList.json";
import messageList from "./messageList.json";
*/
let alertNotif = () => {
  alert("coming soon");
};

export const Chat = (props: any) => {
  let ws = useContext(wsContext);
  let parmsData: any = useParams();
  let nameUser = localStorage.getItem("c_name");


  const [getMessage, setgetMessage] = useState<any>([]);
  const [getUser, setgetUser] = useState<any>([]);
  //const [state, dispatch] = useReducer(reducer, usinitialState);


  let handlePrivateMessage = (contentJson: any) => {
    if (contentJson.id === parmsData.id) {
      let msgWS: {} = {
        id: contentJson.id,
        message: contentJson.message,
        isMedia: contentJson.isMedia,
        typeMedia: contentJson.typeMedia,
        media: contentJson.media,
        date: contentJson.date
      };
      setgetMessage((prevState: any) => prevState.concat(msgWS));
    }
  };

  let handleUserList = (contentJson: any) => {
    let temporis: any[] = [];
    contentJson.list.some((el: any) => {
      console.log(el)
      let tempFriend: any = {
        id: el.id_User,
        img: "https://picsum.photos/600/300",
        name: el.user,
        message: "lorem ipsum",
        hours: "10:20",
        hasNotification: false,
        notification: 0
      };
      temporis.push(tempFriend);
      console.log(tempFriend)
      if (!getUser.find((user: any) => user.id === tempFriend.id)) {
        setgetUser((prevState: any) => prevState.concat(tempFriend));
      }
      return 0;
    });
  };

  let handleDisconnect = (contentJson: any) => {
    setgetUser((prevState: any) => prevState.filter((user: any) => contentJson.list.some((userId: any) => user.id === userId.user)));
  };

  const handlers: any = {
    "private message": handlePrivateMessage,
    userlist: handleUserList,
    disconnect: handleDisconnect
  };

  let handleEvent = (contentJson: any, parmsData: any, getMessage: any, setgetMessage: any, getUser: any, setgetUser: any) => {
    const handler: any = handlers[contentJson.type || contentJson.cat];
    if (handler) {
      handler(contentJson);
    }
  };


  // useEffect(() => {
  useLayoutEffect(() => {

    ws.onmessage = (event: any) => {
      let contentJson = JSON.parse(event.data);
      //console.log(contentJson);
      //console.log(parseInt(parmsData.id));
      handleEvent(contentJson, parmsData, getMessage, setgetMessage, getUser, setgetUser)
    };
  });

  let btn_logout = () => {
    localStorage.removeItem("c_name");
    localStorage.removeItem("id_User");
    fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/logout", {
      method: "GET",
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        console.log(result.redirect)
        window.location.href = window.location.origin + "/";
      })
      .catch((error) => console.log("error", error));

  }


  return (
    <div className={style.mainContainer}>
      <MobileMenu />
      <div className={style.boxContact}>
        <div className={style.infoUser}>
          <div className={style.userID}>
            <div className={style.picProfilBox}>
              <img src="https://picsum.photos/600/300" alt="" className={style.picProfil} />
            </div>
            <div className={style.UserName}>{nameUser}</div>
          </div>
          <div className={style.grp_ico}>
            <div
              className={style.notificationBell}
              onClick={(e) => {
                alertNotif();
              }}
            >
              <img src={notif_ico} alt="bell" className={style.icoNotif} />
            </div>
            <div
              className={style.logoutIcoContainer}
              onClick={(e) => {
                btn_logout();
              }}
            >
              <img src={logout} alt="logout" className={style.icoLogout} />
            </div>
          </div>
        </div>
        <div className={style.listContactContainer}>
          <div className={style.listContactBox}>
            <div className={style.searchBox}>
              <input type="text" className={style.searchBar} />
            </div>
            <div className={style.listContact}>
              {/*<FriendList ws={ws} Flist={state.userlist} />*/}
              <FriendList ws={ws} Flist={getUser} />
              {/*<ul className={style.listCard}>
                <FriendList />
          </ul>*/}
            </div>
          </div>
        </div>
      </div>
      <div className={style.contentChat}>
        <ContainerMessage ws={ws} historyMSG={getMessage} Flist={getUser} />
      </div>
    </div>
  );
};

export default Chat;
