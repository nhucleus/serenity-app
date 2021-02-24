import "./FriendsList.css";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import JournalModal from "../JournalModal";
import NewMessage from "../NewMessage";

const FriendsList = () => {
    const dispatch = useDispatch();

    const friends = useSelector(state => state.session.user.friends);
    const [friend, setFriend] = useState();

    const [modalOpen, setModalOpen] = useState(false);

    const friendClick = (friend) => {
        setFriend(friend);
        setModalOpen(true);
    };

    return (
        <div className="friends-container">
            <div className="friends-search-container">
                Search Placeholder
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
                <NewMessage friend={friend} />
            </JournalModal>
        </div>
    )
};

export default FriendsList;

