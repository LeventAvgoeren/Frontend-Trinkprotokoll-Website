import { useEffect, useState } from "react";
import { useLoginContext } from "./LoginContext";
import { deleteLogin } from '../../backend/api';
import { PageError } from "./PageError";

export function PagePrefs(){


    const { loginInfo, setLoginInfo } = useLoginContext();
    const [error, setError] = useState<Error>(undefined!) 
    useEffect(()=>{
        async function isAdmin(){
            if(loginInfo===(undefined ||false)){
                setError(new Error())
                await deleteLogin()
            }
            
            else if(loginInfo && loginInfo.role==="u"){
                setError(new Error())
                await deleteLogin()
            }   
        }
        isAdmin() 
    }
    ,[loginInfo])
   
   
    if(error){
        return <PageError></PageError>
    }

    return(
       <p>PagePrefs</p> 
    )
}
