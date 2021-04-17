import "./FriendSearch.css";
import { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import { searchForFriends, clearSearchResults } from "../../store/friends";
import { addFriend } from "../../store/auth";

const FriendSearch = ({setFriend, open}) => {
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState(null);
    const results = useSelector(state => state.friends.search);
    const friends = useSelector(state => state.session.user.friends);
    const dispatch = useDispatch();

    const message = (result) => {
        open();
        setFriend(result);    
    }

    const friendHandler = (result) => {
        dispatch(addFriend(result))
    }

    useEffect(() => {
        if (query) {
            dispatch(searchForFriends(query));
        } else {
            dispatch(clearSearchResults());
        }
    }, [query, dispatch]);

    return (
        <div className="friend-search-container">
            <div className="friend-search-bar-container">
                <div className={focused ? "friend-search-wrapper focused" : "friend-search-wrapper"}>
                    <RiSearchLine className={focused ? "search-icon focused" : "search-icon"} />
                    <input
                        className="friend-search-input"
                        onBlur={() => setFocused(false)}
                        onFocus={() => setFocused(true)}
                        type="text"
                        placeholder="Find a friend..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-results-container">
                {friends && results && results.map((result) => {
                    return (
                        <div className="search-card">
                            <div className="search-card-left">
                                <img className="search-avatar" src={result.avatar} />
                            </div>
                            <div className="search-card-middle">
                                <div className="search-name">{result.first_name}{" "}{result.last_name}</div>
                                <div className="search-username">{result.username}</div>
                            </div>
                            <div className="search-card-right">
                                {friends[result.id] ? <button className="search-friend-button" onClick={() => message(result)} >Message</button> : <button onClick={() => friendHandler(result)} className="search-friend-button" >Add</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default FriendSearch;