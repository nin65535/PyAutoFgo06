import React from "react";
import { Outlet } from "react-router";
import { Header } from "./header";

export const LayoutMain: React.FC = () => {
    return <div>
        <Header/>
        <div className='container py-2'>
            <Outlet />
        </div>
    </div>
}