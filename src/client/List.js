import React, {useState} from 'react'
import Chat from "./Chat";
import Button from "@material-ui/core/Button";
import moment from "moment";

const List = ({login, users}) => {

    const [chat, setChat] = useState('');
    const [exit, setExit] = useState('');
    const [auth, setAuth] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));

    const handleOpenChat = (item) => {
        setChat(item);
    }

    const handleClose = () => {
        setChat('');
    }

    const handleExit = () => {
        localStorage.clear();
        setExit(true);
        login(auth);
    }

    const existingUser = users.find(user => user.email && user.email === token.email).name;

    return (
        <>
            <div className="chat-page">
                <div className="user-welcome">
                    <div className="user-heading">
                        <h3>Hello, { existingUser ? existingUser : '' } </h3>
                        <h5>Total Users : {users.length}</h5>

                        <Button
                            className="leave"
                            size="small"
                            variant="outlined"
                            onClick={() => handleExit()}
                        >
                            Exit
                        </Button>
                        <Button
                            className="close"
                            size="small"
                            variant="outlined"
                            onClick={() => handleClose()}
                        >
                            Close chat
                        </Button>
                    </div>
                    <div className="select-user">
                        {users.map(item =>
                            item.email && item.email !== token.email ? (
                                <div
                                    key={item.id}
                                    className="users"
                                    onClick={() => handleOpenChat(item)}
                                >
                                    {item.name}
                                    {item.lastVisit ? (
                                        <span className="time"> {moment(item.lastVisit).fromNow()}</span>) : (<></>)
                                    }
                                </div>
                            ) : (
                                <div
                                    key={item.id}
                                    className="users saved-chat"
                                    onClick={() => handleOpenChat(item)}
                                >
                                    Saved messages <div className="small">{item.name}</div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {chat ? (
                    <Chat id={chat.id} name={chat.name} email={chat.email} lastVisit={chat.lastVisit}/>
                ) : <div></div>
                }
            </div>
        </>
    );
}

export default List