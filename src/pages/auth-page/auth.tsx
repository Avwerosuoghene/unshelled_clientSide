import React, { useRef, useState } from "react";
import classes from "./auth.module.scss";
import { Box, Button, TextField } from "@mui/material";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { DefaultService } from "../../services/default-service";
import { AuthPayload } from "../../models/payload";
import { useNavigate } from "react-router";


const AuthenticationPage: React.FC<any> = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const loadingBarRef = useRef<LoadingBarRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | undefined>('');
    const navigate = useNavigate();




    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
        loadingBarRef.current?.continuousStart();
        setLoading(true);
        const authPayload :AuthPayload= {
            userName:username ,
            password: Number(password)
        }

        const result = await DefaultService.authenticate(authPayload);
        loadingBarRef.current?.complete();

        setLoading(false);

        if (result.data.isSuccess) {
            sessionStorage.setItem('userData', JSON.stringify(result.data.data));
            navigate('/main');
        }


    }
        catch (error: any) {
            setErrorMsg(error.response.data.message);
            setTimeout(() => {
                setErrorMsg(undefined);
            }, 5000);
            loadingBarRef.current?.complete();
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <LoadingBar color="#007bff" ref={loadingBarRef} />

          

            <div className={classes["auth-container"]}>
            {errorMsg && <h4 className={classes["error-msg"]}>{errorMsg}</h4> }
                <Box
                    component="form"
                    className={classes["auth-form"]}
                    onSubmit={handleLogin}
                    noValidate
                    autoComplete="off"
                >
                    <h1>Login</h1>
                    <div className={classes["form-group"]}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes["form-group"]}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes["login-button"]}
                        disabled={loading}
                    >
                        Login
                    </Button>
                </Box>
            </div>
        </React.Fragment>
    );
};

export default AuthenticationPage;