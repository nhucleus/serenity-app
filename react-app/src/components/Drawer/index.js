import "./Drawer.css";
import {useState} from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/auth';

const Drawer = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.session.user);
    
    const clickHandler = () => {
        setOpen(!open);
    };

    const logout = () => {
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div onClick={() => setOpen(false)} className={open ? "drawer-overlay" : "drawer-overlay closed"}></div>
            <div className={open ? "drawer-container" : "drawer-container closed"}>
                <div onClick={clickHandler} className={open ? "drawer-tab" : "drawer-tab closed"}>
                    <BiLeftArrow className={open ? "drawer-arrow" : "drawer-arrow closed"} />
                </div>
                <div className={open ? "drawer-content" : "drawer-content closed"}>
                    {user && (<div className="drawer-user">
                        <span className="drawer-user-text">Signed in as </span>
                        <span className="drawer-user-username">{user.username}</span>
                    </div>)}
                    <div className="drawer-links">
                        <Link className="drawer-link" onClick={() => setOpen(false)} to="/inbox">Inbox</Link>
                        <Link className="drawer-link" onClick={() => setOpen(false)} to="/entries/journal">Your journal entries</Link>
                        <Link className="drawer-link" onClick={() => setOpen(false)} to="/entries/drawings">Your drawings</Link>
                        <Link className="drawer-link" onClick={() => setOpen(false)} to="/friends">Friends</Link>
                        <div className="drawer-link" onClick={() => {
                            setOpen(false)
                            logout()
                        }
                        }>Log Out</div>
                    </div>
                </div>
            </div>
        </>

    )
};

export default Drawer;