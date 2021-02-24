import "./NewMessage.css";
import { useState, useEffect } from "react";
import {RiSendPlaneFill} from "react-icons/ri"

const NewMessage = ({ friend }) => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async () => {
        const res = await fetch("/api/inbox/new", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({subject, body, friend_id: friend.id})
        });
        const data = await res.json();
        if (!res.errors) {
            console.log("SUCCESS");
        } else {
            console.log("ERROR");
        }
    };
    
    return (
        <div className="new-message-container">
            <div className="new-message-header">
                Say Something Nice!
            </div>
            <div className="new-message-subject-input-container">
                <input value={subject} onChange={(event) => setSubject(event.target.value)} className="new-message-subject-input" type="text" placeholder="Subject" />
            </div>
            <div className="new-message-body-input-container">
                <textarea value={body} onChange={(event) => setBody(event.target.value)} className="new-message-body-input" />
            </div>
            <div className="friend-card-preview">
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
            <button onClick={handleSubmit} className="new-message-submit">
                <RiSendPlaneFill />
            </button>
        </div>
    )
};

export default NewMessage;