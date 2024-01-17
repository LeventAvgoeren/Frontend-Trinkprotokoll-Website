import React from "react";

export interface LoginInfo {
    userId: string;
    role: "a"|"u";
    exp: number;
}
   export interface LoginContextType {
    loginInfo: LoginInfo | false | undefined;
    setLoginInfo: (loginInfo: LoginInfo | false) => void
    }
    // export only for provider
    export const LoginContext = React.createContext<LoginContextType>({} as LoginContextType);
    export const useLoginContext = () => React.useContext(LoginContext);