import React from "react";
import style from "./Chat.module.css";
import notif_ico from "./../../img/notification-bell.svg"

let contactList: {}[] = [
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: false,
    notification: 0
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  },
  {
    img: "https://picsum.photos/600/300",
    name: "lorem lorem",
    message: "lorem ipsum",
    hours: "10:20",
    hasNotification: true,
    notification: 5
  }
];

let IsSelected = (data:any, el:any) => {
  let contentData = Array.from(
    //document.getElementsByClassName("_active")
    document.getElementsByClassName(style._active)
  );
  contentData.forEach(rem =>{
    //rem.classList.remove("_active")
    rem.classList.remove(style._active)
  })
  //data.currentTarget.classList.add("_active")
  data.currentTarget.classList.add(style._active)
  
};

let ContactCard = () => {
  let contact: any = contactList.map((el: any, key: any) => {
    return (
      <li className={style.cardItem} key={key}  onClick={e => {IsSelected(e, el)}}>
        <div className={style.userID}>
        <div className={style.picProfilBox}><img src={el.img} alt="" className={style.picProfil}/></div>
          <div>
            <div>{el.name}</div>
            <div>{el.message}</div>
          </div>
        </div>

        <div className={style.infoMessage}>
          <div className={style.dataMessage}>{el.hours}</div>
          {el.hasNotification === true && <div className={style.nbNotifBox}><span className={style.nbNotif}>{el.notification}</span></div>}
        </div>
      </li>
    );
  });
  return contact;
};

let alertNotif = () =>{
  alert("coming soon")
}

export const Chat = (props: any) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.boxContact}>
        <div className={style.infoUser}>
          <div className={style.userID}>
            <div className={style.picProfilBox}><img src="https://picsum.photos/600/300" alt="" className={style.picProfil}/></div>
            <div>Lorem ipsum</div>
          </div>
          <div className={style.notificationBell} onClick={e => {alertNotif()}}><img src={notif_ico} alt="bell" className={style.icoNotif} /></div>
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
      <div></div>
    </div>
  );
};

export default Chat;
