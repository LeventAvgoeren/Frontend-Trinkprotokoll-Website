import {FallbackProps } from "react-error-boundary";
//https://blog.logrocket.com/react-error-handling-with-react-error-boundary/#:~:text=Error%20boundaries%20in%20React,-Error%20boundaries%20in&text=They%20are%20React%20components%20that,%7B%7D%20block%20but%20for%20components.
export function MyFallbackComp({error}:FallbackProps){
    //resetErrorBoundary
    return(
        <>
        <p>Error: {error.message}</p>
        <pre>Errorstack: {error.stack}</pre>
        </>
    )
}
