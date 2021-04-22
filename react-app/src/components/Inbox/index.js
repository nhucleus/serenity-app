import "./Inbox.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInbox } from "../../store/inbox";

const Inbox = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInbox());
    }, []);

    const inbox = useSelector(state => state.inbox.messages);

    return (
        <div className="inbox-container">
            <div className="inbox-header-container">
                <div className="inbox-header">Inbox</div>
            </div>
            <div className="inbox-content">
                {inbox && inbox.map(message => {
                    return (
                        <div className="message-card">
                            <div className="message-card-left">
                                <img className="message-sender-avatar" src={message.sender.avatar}/>
                                <div className="message-sender-username">{message.sender.username}</div>
                            </div>
                            <div className="message-card-right">
                                <div className="message-card-subject">{message.subject}</div>
                                <div className="message-card-body">{message.body}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Inbox;