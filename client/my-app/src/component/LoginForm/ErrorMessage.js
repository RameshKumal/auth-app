import React from "react";

const ErrorMessage = ({message})=>{
    if(message){
        return <div style={{ color: 'red' }}>{message}</div>;
    }else{
        return null;
    }
}

export default ErrorMessage;