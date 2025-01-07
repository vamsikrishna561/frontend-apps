import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export function RootLayout(){

    return <>
    <MainNavigation />
    <main>
        <Outlet></Outlet>
    </main>
    </>

}