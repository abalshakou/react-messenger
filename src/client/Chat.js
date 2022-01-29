import React, {useState, useEffect} from "react";
import {useSubscription} from "@apollo/client";
import moment from 'moment';
import {SUBSCRIPTION_QUERY} from "../server/Query"
import AddMessage from "./AddMessage"
import ThreeDots from "../helpers/ThreeDots"

const Chat = ({id, name, email, lastVisit}) => {

    const token = JSON.parse(localStorage.getItem("token"));

    const [senderMail] = useState(token.email);

    const {loading, error, data} = useSubscription(SUBSCRIPTION_QUERY,
        {
            variables: {
                filter: {
                    senderMail: {in: [senderMail]},
                    receiverMail: {in: [email]},
                    or: {senderMail: {in: [email]}, receiverMail: {in: [senderMail]}}
                }
            },
        }
    );

    useEffect(() => {
        document.title = `You in chat with ${name}`;
    });

    if (loading) return (
        <>
            <h3>Loading</h3>
            <ThreeDots/>
        </>
    );

    return (
        <>
            <div className="personal-chat">
                <div className="chats-header">
                    <div className="back-button" >
                        <div className="bar1"/>
                        <div className="bar2"/>
                        <div className="bar3"/>
                    </div>
                    <div className="user-typing">
                        You in chat with  <strong>{name}</strong>,  last viewed {lastVisit ? moment(lastVisit).fromNow() : 'never'}
                    </div>
                </div>
                <div className="all-messages">
                    {data.queryMessage.map(item =>
                        (
                            <div key={item.id} className={token.email === item.senderMail ? 'sender' : 'receiver'}>
                                <div className="sender-name">
                                    {token.email !== email ? item.senderMail : item.receiverMail}
                                </div>
                                {item.message}{' '}
                                <span className="time"> {moment(item.timestamp).fromNow()}</span>
                            </div>
                        )
                    )}
                    <AddMessage senderMail={senderMail} receiverMail={email}/>
                </div>
            </div>
        </>
    );
};

export default Chat;