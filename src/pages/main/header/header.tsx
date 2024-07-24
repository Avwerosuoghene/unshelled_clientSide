import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import classes from "./header.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const HeaderComponent : React.FC<any> = () => {
    const [userId, setUserId] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        getUserId();
    }, []);

    const getUserId = ()=> {
        const userData = sessionStorage.getItem('userData')? JSON.parse(sessionStorage.getItem('userData')!) : undefined;
        if (userData === undefined) return logoutUser();
        setUserId(userData.seller_id);
    }

    const logoutUser = () => {
        sessionStorage.clear();
        navigate('/auth');
    }

    return (
        <section className={classes["header-container"]}>

            <span className={classes["welcome-text"]}>Logged in User: <span><h4>{userId || ''}</h4></span> </span>
            <IconButton className={classes["logout-button"]} color="inherit" onClick={logoutUser}>
                <LogoutIcon />
            </IconButton>

        </section>
    )
};

export default HeaderComponent;