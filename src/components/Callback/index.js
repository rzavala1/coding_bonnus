import React, { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";

function Callback() {

    const ctx = useContext(UserContext);
    const { setShowIframe, showIframe } = ctx;

    useEffect(() => {
        setShowIframe(false);
    }, []);

    useEffect(() => {
        window.close();
    }, [showIframe]);


    return (
        <>

        </>
    );
}

export default Callback;
