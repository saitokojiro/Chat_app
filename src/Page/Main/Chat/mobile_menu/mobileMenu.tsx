import React, { useState } from "react";

let MobileMenu = () => {

    let [show, setShow] = useState<boolean>(false)

    let style: any = {
        "line-height": "0.5em",
        "margin-left": "1.2em",
        "display": show !== false ? "none" : "block"
    }
    let style_showMenu: any = {
        "display": "flex",
        "position": "fixed",
        " z-index": " 22",
        /* background: black; */
        "width": " 100%",
        "height": "100%",
        "justify-content": "center",
        "align-items": "center",
    }

    let is_menu = () => {
        show === true ? setShow(false) : setShow(true);
    }

    let Show_Menu = () => {

        if (show !== false) {
            return (
                <div style={style_showMenu}>
                    <ul>
                        <li></li>
                        <li onClick={is_menu}>Close menu</li>
                    </ul>
                </div>
            )
        } else {
            return (<></>)
        }

    }


    return (
        <>
            <div onClick={is_menu} style={style}>
                <div >___</div>
                <div >___</div>
                <div >___</div>
            </div>
            <Show_Menu />
        </>
    )
}

export default MobileMenu