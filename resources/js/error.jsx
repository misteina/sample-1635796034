import React from "react";

export default function Error({display}){
    if (display){
        return <div id="error">Incorrect email or password</div>
    }
    return null;
}