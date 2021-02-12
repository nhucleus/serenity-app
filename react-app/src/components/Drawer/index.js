import "./Drawer.css";
import {useState} from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Drawer = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.session.user);
    const clickHandler = () => {
        setOpen(!open);
    }

    return (
        <>
        <div onClick={() => setOpen(false)} className={open ? "drawer-overlay" : "drawer-overlay closed"}></div>
        <div className={open ? "drawer-container" : "drawer-container closed"}>
            <div onClick={clickHandler} className={open ? "drawer-tab" : "drawer-tab closed"}>
                <BiLeftArrow className={open ? "drawer-arrow" : "drawer-arrow closed"}/>
            </div>
            <div className={open ? "drawer-content" : "drawer-content closed"}>
                {user && (<div className="drawer-user">
                    <span className="drawer-user-text">Signed in as </span>
                    <span className="drawer-user-username">{user.username}</span>
                    </div>)}
                <div className="drawer-links">
                    <Link onClick={() => setOpen(false)} to="/entries/journal">Your journal entries</Link>
                </div>
            </div>
        </div>
        </>

    )
};

export default Drawer;