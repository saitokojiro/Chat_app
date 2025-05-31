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
let alertNotif = () => {
  alert("coming soon");
};

export const Chat = (props: any) => {
  let name: any = localStorage.getItem("c_name")
  let [getNwt, setNwt] = useState<boolean>(false);
  if (!getNwt) {
    fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/nwt?user=" + name, { method: 'GET', credentials: 'include', })
      .then((response) => response.json()).then((result) => {
        console.log(result.code)
        if (result.code === "0001" || result.code === "0002") {
          setNwt(true)
        } else if (result.code === "0005") {



          localStorage.removeItem("c_name");
          localStorage.removeItem("id_User");


          window.location.href = window.location.origin + "/";
        }
      })
  }


  let ws = useContext(wsContext);
  let parmsData: any = useParams();
  let ParamUrl = parmsData.id
  let strData = ParamUrl
  let timerTypingId: any;

  let nameUser = localStorage.getItem("c_name");


  const [getMessage, setgetMessage] = useState<any>([]);
  const [getListMessage, setListMessage] = useState<any>([]);
  const [getUser, setgetUser] = useState<any>([]);
  const [getUserMap, setgetUserMap] = useState<Map<string, any>>(new Map());

  const [getTyping, setGetTyping] = useState<any>();
  const [getMenu, setgetMenu] = useState<any>(style.MC);
  //const [state, dispatch] = useReducer(reducer, usinitialState);

  let requestGetMessage = async (userTo: string) => {
    if (userTo !== undefined) {
      fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/getMessageUser?iduserto=" + userTo, { method: 'GET', credentials: 'include', })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          //setListMessage(.. "data")
        })
        .catch((error) => console.log("error", error));
    }
  }

  //requestGetMessage(strData)

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

      if (getUserMap.has(contentJson.id)) {
        let getUseVal = getUserMap.get(contentJson.id)
        let tempFriendM: any = {
          id: getUseVal.id,
          img: getUseVal.img,
          name: getUseVal.name,
          message: contentJson.message,
          hours: contentJson.date,
          hasNotification: false,
          notification: 0
        };

        setgetUserMap(new Map(getUserMap).set(contentJson.id, tempFriendM))
      }

    }
  };

  let handleUserList = (contentJson: any) => {
    let temporis: any[] = [];
    console.log('userlist')
    console.log(contentJson)
    contentJson.list.some((el: any) => {

      fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/getLastMessageUser?user=" + el.id_User, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json, text-plain, */*",

        }
      })
        .then(e => e.json())
        .then(e => {

          console.log(e.data.listMsg[0])
          let isMe = el.id_User == localStorage.getItem("id_User") ? "me:" : "";
          let tempFriend: any = {
            id: el.id_User,
            img: "https://picsum.photos/600/300",
            name: el.user,
            message: isMe + e.data?.listMsg[0].message ? e.data.listMsg[0].message : "",
            hours: e.data?.listMsg[0].date ? e.data.listMsg[0].date : "",
            hasNotification: el.hasNotification,
            notification: el.notification
          };
          temporis.push(tempFriend);
          if (!getUser.find((user: any) => user.id === tempFriend.id)) {
            setgetUser((prevState: any) => prevState.concat(tempFriend));
            setgetUserMap(getUserMap?.set(el.id_User, tempFriend))
          }
        })


      return 0;
    });


  };

  let handleDisconnect = (contentJson: any) => {
    setgetUser((prevState: any) => prevState.filter((user: any) => contentJson.list.some((userId: any) => user.id === userId.id_User)));

    if (getUserMap.has(contentJson.gb)) {

      getUserMap.delete(contentJson.gb);
    }

  };

  let handleUpdateLastMessage = (content: any) => {
    let contentJson = content
    getUser.some((el: any) => {
      if (el.id === contentJson.to) {
        let tempFriend: any = {
          id: el.id,
          img: el.img,
          name: el.name,
          message: "me: " + contentJson.message,
          hours: contentJson.date,
          hasNotification: false,
          notification: 0
        };

        setgetUserMap(new Map(getUserMap).set(contentJson.to, tempFriend))
      }
    })
  }

  const handlers: any = {
    "private message": handlePrivateMessage,
    "userlist": handleUserList,
    "disconnect": handleDisconnect,
    "updateLastMessage": handleUpdateLastMessage
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
      if (contentJson.type === "typing") {
        let userid: any = localStorage.getItem("id_User");
        if (contentJson.sender !== userid) {
          clearTimeout(timerTypingId);
          setGetTyping(true)
          timerTypingId = setTimeout(() => {
            setGetTyping("")
          }, 2000)
        }

      } else {
        handleEvent(contentJson, parmsData, getMessage, setgetMessage, getUser, setgetUser)
      }
    };
  });

  let btn_logout = () => {

    fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/logout", {
      method: "GET",
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result)
        //console.log(result.redirect)
        window.location.href = window.location.origin + "/";
      })
      .catch((error) => console.log("error", error));

  }

  let TypingShow = () => {
    if (getTyping) {
      return (
        <span className={style.Typing}>
          <div className={style.c}></div>
          <div className={style.c}></div>
          <div className={style.c}></div>
        </span>
      )
    } else {
      return (<></>)
    }
  }
  let menuCustom = () => {
    if (getMenu == style.MO) {
      setgetMenu(style.MC)
    } else {
      setgetMenu(style.MO)
    }

  }

  //<MobileMenu />
  return (
    <div className={style.mainContainer}>

      <div className={style.headerUser}>
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
      </div>

      <div className={style.boxContainer}>
        <div className={style.menu} onClick={menuCustom}>
        </div>
        <div className={style.boxContact + " " + getMenu}>
          <div className={style.listContactContainer}>
            <div className={style.listContactBox}>
              <div className={style.searchBox}>
                <input type="text" className={style.searchBar} />
              </div>
              <div className={style.listContact}>
                <FriendList ws={ws} Flist={getUser} getMessageMap={getUserMap} setMessage={setgetMessage} />
              </div>
            </div>
          </div>
        </div>
        <div className={style.contentChat}>

          <ContainerMessage ws={ws} historyMSG={getMessage} Flist={getUser} typing={TypingShow} getMessage={null} updateMessage={null} />

        </div>
      </div>

    </div>
  );
};

export default Chat;
