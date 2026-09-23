import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef] px-4 py-8">
            <Outlet />
        </div>
    );
};