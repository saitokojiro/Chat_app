import React, { /*useContext, useState, useEffect*/ } from "react";
import style from "./Chat.module.css";
import { Link } from "react-router-dom";
//import contactList from "./contactList.json";
//import { wsContext } from "../../../context/websocket";



export const FriendList = (props:{ws:any, Flist:any}) => {
 // let ws = props.ws
  let ListFriend = props.Flist
  


  let IsSelected = (data: any, el: any) => {
    let contentData = Array.from(
      document.getElementsByClassName(style._active)
    );
    contentData.forEach((rem) => {
      rem.classList.remove(style._active);
    });
    data.currentTarget.classList.add(style._active);
  };

  let ContactFuc = () =>{
    let Contact: any = ListFriend.map((el: any, key: any) => {
      return (
        <li
          className={style.cardItem}
          key={key}
          onClick={(e) => {
            IsSelected(e, el);
          }}
        >
          <Link className={style.linkCard + " " + style.cardLinkBox} to={"/message/" + el.id}>
            <div className={style.cardLinkBox}>
              <div className={style.userFriendID}>
                <div className={style.picProfilBox}>
                  <img src={el.img} alt="" className={style.picProfil} />
                </div>
                <div>
                  <div>{el.name}</div>
                  <div>{el.message}</div>
                </div>
              </div>
  
              <div className={style.infoMessage}>
                <div className={style.dataMessage}>{el.hours}</div>
                {el.hasNotification === true && (
                  <div className={style.nbNotifBox}>
                    <span className={style.nbNotif}>{el.notification}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </li>
      );
    });
    return Contact
  }
  
  //return Contact
  return (
    <ul className={style.listCard}>
      <ContactFuc />
    </ul>
  )
};
//export default ContactCard;
//FriendList.propTypes = {};


