import React, { useContext, useState , useLayoutEffect } from "react";
//import React, { useContext, useState, useEffect, useReducer, useLayoutEffect } from "react";
import style from "./Chat.module.css";
import notif_ico from "./../../img/notification-bell.svg";
/*
import send_ico from "./../../img/send_icon.svg";
import pin_ico from "./../../img/pin_icon.svg";
import smiley_ico from "./../../img/smiley_icon.svg";*/
import { useParams } from "react-router-dom";
import { FriendList } from "./FriendList";
import { ContainerMessage } from "./chatBoxInterface/ContainerMessage";
import { wsContext } from "../../../context/websocket";
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

  // useEffect(() => {
  useLayoutEffect(() => {
    
    ws.onmessage = (event: any) => {
      let contentJson = JSON.parse(event.data);
      //console.log(contentJson);
      //console.log(parseInt(parmsData.id));
      console.log();
      console.log(contentJson.type);
      if (contentJson.type === "private message") {
        console.log(contentJson);
        console.log(contentJson.id);
        console.log( typeof(contentJson.id));
        console.log(typeof(parmsData.id));
        console.log(contentJson.id === parmsData.id)
        if (contentJson.id === parmsData.id) {
          
          
          let msgWS: {} = {
            id: contentJson.id,
            message: contentJson.message,
            isMedia: contentJson.isMedia,
            typeMedia: contentJson.typeMedia,
            media: contentJson.media,
            date: contentJson.date
          };
          //setgetMessage([...getMessage, msgWS]);
          setgetMessage((prevState: any) => prevState.concat(msgWS));
          
          console.log("send")
        }
      } else if (contentJson?.cat === "userlist") {
        console.log(contentJson.list);
        console.log(contentJson);

        let temporis: any[] = [];
        //let connectedUsers = contentJson.list;
        // eslint-disable-next-line array-callback-return
        contentJson.list.some((el: any) => {
          //console.log(el.user)
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
          //setgetUser([...getUser,tempFriend])
          if (!getUser.find((user: any) => user.id === tempFriend.id)) {
            setgetUser((prevState: any) => prevState.concat(tempFriend));
          }
        });

        //console.log(tempFriend)*/
      } else if (contentJson?.cat === "disconnect") {
        setgetUser((prevState: any) => prevState.filter((user: any) => contentJson.list.some((userId: any) => user.id === userId.user)));
      }
    };
  });
  
  
  return (
    <div className={style.mainContainer}>
      <div className={style.boxContact}>
        <div className={style.infoUser}>
          <div className={style.userID}>
            <div className={style.picProfilBox}>
              <img src="https://picsum.photos/600/300" alt="" className={style.picProfil} />
            </div>
            <div className={style.UserName}>{nameUser}</div>
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
        <ContainerMessage ws={ws} historyMSG={getMessage}  Flist={getUser} />
      </div>
    </div>
  );
};

export default Chat;
