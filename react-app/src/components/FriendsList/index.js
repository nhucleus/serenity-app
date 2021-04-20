import "./FriendsList.css";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import JournalModal from "../JournalModal";
import NewMessage from "../NewMessage";
import FriendSearch from "../FriendSearch";
import { AiOutlineUserAdd } from "react-icons/ai";
import { clearSearchResults } from "../../store/friends";

const FriendsList = () => {
    const dispatch = useDispatch();

    const friends = useSelector(state => state.session.user.friends);
    const [friend, setFriend] = useState();

    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [notifText, setNotifText] = useState("");

    useEffect(() => {
        setTimeout(() => {
        setSubmitted(false)
        }, 5000)
    }, [submitted]);

    const friendClick = (friend) => {
        setFriend(friend);
        setModalOpen(true);
    };

    return (
        <>
        <div className={submitted ? "notification" : "notification hidden"}>{notifText}</div>
        <div className="friends-container">
            <div className="friends-search-container">
                <div className="friends-header">Friends</div>
                <div onClick={() => setAddModalOpen(true)} className="add-friend-button">
                    <AiOutlineUserAdd />
                </div>
            </div>
            <div className="friends-list">
                {friends &&
                    Object.values(friends)
                        .sort((a, b) => a.username < b.username ? -1 : 1)
                        .map((friend) => {
                            return (
                                <div onClick={() => friendClick(friend)} className="friend-card">
                                    <div className="friend-card-left">
                                        <img draggable={false} className="friend-avatar" src={friend.avatar} alt="pic" />
                                    </div>
                                    <div className="friend-card-right">
                                        <div className="friend-name">
                                            {friend.first_name}{" "}{friend.last_name}
                                        </div>
                                        <div className="friend-username">
                                            {friend.username}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <JournalModal open={modalOpen} onClose={() => setModalOpen(false)}>
                <NewMessage friend={friend} onClose={() => setModalOpen(false)} setSubmitted={(text) => {
                    setNotifText(text)
                    setTimeout(()=> {
                        setSubmitted(true)
                    }, 250)
                    }} 
                    />
            </JournalModal>
            <JournalModal open={addModalOpen} onClose={() => {
                setAddModalOpen(false)
                dispatch(clearSearchResults())
                }
                }>
                <FriendSearch setFriend={(friend) => setFriend(friend)} open={() => setModalOpen(true)}/>
            </JournalModal>
        </div>
        </>
    )
};

export default FriendsList;

