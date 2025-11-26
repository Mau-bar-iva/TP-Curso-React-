import { Outlet } from "react-router-dom";
import {Header} from "../components/Header/Header";

export const MainLayoout = () => {
    return (
        <>
            <Header/>
            <main style={{flex:1, paddingTop: "90px"}}>
                <Outlet/>
                
            </main>
        </>
    )
}