import { Routes, Route, Navigate } from "react-router";
import AuthenticationPage from "./pages/auth-page/auth";
import DashboardPage from "./pages/main/dashboard/dashboard";
import MainPage from "./pages/main/main";
import DetailsPage from "./pages/main/details/details";

const AppRoutes = () => {



    return (

        <><Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
        </Routes><Routes>
                <Route path="/auth" element={<AuthenticationPage />} />
                <Route path="/main" element={<MainPage />} >
                    <Route path="" element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<DashboardPage/>} />
                    <Route path="order_details/:orderId" element={<DetailsPage/>} />
                </Route>

            </Routes></>

    );
};

export default AppRoutes;