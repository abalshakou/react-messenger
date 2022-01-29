import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {SEND_MESSAGE} from "../server/Query"
import Button from "@material-ui/core/Button";
import TextField from '@mui/material/TextField';

const AddMessage = ({senderMail, receiverMail}) => {
    const [message, setMessage] = useState('');
    const [addMessage, { error: mutationError }] = useMutation(SEND_MESSAGE);

    const handleClick = () => {
        if (message) {
            addMessage({ variables: { message, receiverMail, senderMail, timestamp: (new Date()).toISOString() } });
            setMessage('');
        }
    }

    return (
        <>
            <TextField
                maxRows={8}
                minRows={2}
                rows={4}
                id="standard-message"
                label="Enter you message"
                name="message"
                value={message}
                multiline
                onChange={e => setMessage(e.target.value)}
                style={{ margin: 10 }}
            />

            <Button type="button" onClick={() => handleClick()}>Send</Button>
        </>
    );
};

export default AddMessage;