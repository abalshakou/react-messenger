import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import validator from "validator";
import {useMutation} from "@apollo/client";
import {UPDATE_USER} from "../server/Query";

const Login = ({users}) => {

    const setUser = (existingUserId) => {

        updateUser({
            variables: {
                patch:
                    {
                        filter: {
                            id: existingUserId
                        },
                        set: {
                            lastVisit: (new Date()).toISOString()
                        }
                    }
            }
        }).then();
    }

    const [token, setToken] = useState({name: "", email: ""});
    const [error, setError] = useState("");
    const [updateUser] = useMutation(UPDATE_USER);

    const handleChange = e => {
        setToken({...token, [e.target.name]: e.target.value});
    };

    const validate = () => {
        const {name, email} = token;

        const existingUser = users.some(function (user) {
            return user.email === email;
        });

        if (!validator.isEmail(email)) {
            setError("Valid email is required");
        }

        if (validator.isEmail(email) && existingUser) {
            setError("");
            const existingUserId = users.find(user => user.email === email).id

            localStorage["token"] = JSON.stringify(token);
            setUser(existingUserId);
        }
    };

    const {name, email} = token;

    return (
        <Paper elevation={3} className="paper">
            Has account? Enter email

            <TextField
                required
                id="outlined-email-input"
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
                variant="outlined"
                className="text-area"
                style={{margin: 10}}
            />

            <Button variant="contained" onClick={validate} style={{margin: 15}}>
                Log in
            </Button>
            <div>{error}</div>
        </Paper>
    );
};

export default Login;