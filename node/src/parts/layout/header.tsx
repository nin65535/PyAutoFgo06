import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => <div className='bg-primary bg-gradient'>
    <div className='container d-flex align-items-center py-1'>
        <div className='h1 '>
            <Link to='/' className='text-white text-decoration-none'>
                PyAutoFgo06
            </Link>
        </div>
    </div>
</div>