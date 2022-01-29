import React, {useState} from "react";
import {useSubscription} from "@apollo/client";
import {SUBSCRIPTION_QUERY_USER, SEND_USER} from "../server/Query"
import Registration from "./Registration"
import Login from "./Login"
import List from "./List"
import ThreeDots from "../helpers/ThreeDots"
import Paper from "@material-ui/core/Paper";

const FirstScreen = () => {

    const [hasAccount, setHasAccount] = useState(false);
    const {data} = useSubscription(SUBSCRIPTION_QUERY_USER);

    if (!data || !data.queryUser) return (
        <>
            <Paper elevation={3} className="paper">
                <h3>Loading </h3>
                <ThreeDots/>
            </Paper>
        </>
    );

    if ((localStorage.getItem('token'))) {
        return (<List login={auth => setHasAccount(auth)} users={data.queryUser}/>);
    } else if (hasAccount) {
        return (<Login users={data.queryUser}/>);
    } else {
        return (<Registration login={auth => setHasAccount(auth)} users={data.queryUser}/>);
    }
};

export default FirstScreen;