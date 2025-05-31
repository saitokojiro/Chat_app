import React, { useEffect, useState } from "react";
import style from "./Chat.module.css";
import { Link } from "react-router-dom";
//import contactList from "./contactList.json";
//import { wsContext } from "../../../context/websocket";



export const FriendList = (props: { ws: any, Flist: any, getMessageMap: any, setMessage: any }) => {
  // let ws = props.ws
  let pListFriend = props.Flist
  let PropsGetMessage = props.getMessageMap
  let PropsSetMessage = props.setMessage
  const [getUserMap, setgetUserMap] = useState<Map<string, any>>(new Map());
  const [ListFriend, setListFriend] = useState<any>([]);

  useEffect(() => {
    setListFriend(props.Flist);
    setgetUserMap(props.getMessageMap);
  }, [props.Flist, props.getMessageMap]);


  let IsSelected = (data: any, el: any) => {
    let contentData = Array.from(
      document.getElementsByClassName(style._active)
    );
    contentData.forEach((rem) => {
      rem.classList.remove(style._active);
    });
    data.currentTarget.classList.add(style._active);
  };

  let getListMessage = async (id: string) => {

    PropsSetMessage([])
    fetch(process.env.REACT_APP_API_HTTP_WEBSOCKET_ADDRESS + "/getMessageUser?user=" + id, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",

      }
    })
      .then(e => e.json())
      .then(e => {
        /**/
        console.log(e.data)
        console.log(e.data.listMsg)
        console.log(!e.data.listMsg[0]?.response)
        if (!e.data.listMsg[0]?.response) {
          let ListMsg = e.data.listMsg;
          ListMsg.some((es: any) => {
            let msgWS: {} = {
              id: es.id,
              sender: es.sender,
              message: es.message,
              isMedia: es.isMedia,
              typeMedia: es.typeMedia,
              media: es.media,
              date: es.date
            };
            PropsSetMessage((prevState: any) => prevState.concat(msgWS));
          })
        }


      }).catch(rejected => {
        console.log(rejected);
      });

  }

  let ContactFuc = () => {
    let Contact: any = ListFriend.map((el: any, key: any) => {

      return (
        <li
          className={style.cardItem}
          key={key}
          onClick={(e) => {
            IsSelected(e, el);
            getListMessage(el.id);
          }}
        >
          <Link className={style.linkCard + " " + style.cardLinkBox} to={"/message/" + el.id}>
            <div className={style.cardLinkBox}>
              <div className={style.userFriendID}>
                <div className={style.picProfilBox}>
                  <img src={el.img} alt="" className={style.picProfil} />
                </div>
                <div className={style.nameMessageBox}>
                  <div>{el.name}</div>
                  {/* <div>{getUserMap.get(el.id)?.message}</div>*/}
                  <div>{getUserMap.get(el.id)?.message}</div>
                </div>
              </div>

              <div className={style.infoMessage}>
                <div className={style.dataMessage}>{getUserMap.get(el.id)?.hours}</div>
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


