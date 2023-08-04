import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("userId")
        navigate("/login");
    }, [])


    return (
        <>
        </>

    );
};

export default Logout;
