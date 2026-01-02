import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

export const AdminLayout = () => {
    return (
        <div className="adminLayout-container">
            <Outlet/>
        </div>
            
    )
}