

import { Outlet } from "react-router-dom";
import classes from "./main.module.scss";
import HeaderComponent from "./header/header";


const MainPage : React.FC<any> = () => {
    return (
        <section className={classes["main-container"]}>
            <HeaderComponent />
            <div className={classes["main-routes"]}>
                <Outlet />
            </div>

        </section>
    )
};

export default MainPage;