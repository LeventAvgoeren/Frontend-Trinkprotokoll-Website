// import './App.css';

import { ErrorBoundary } from "react-error-boundary";
import { Navigationbar } from "./components/__test__/Navigationbar";
import { MyFallbackComp } from "./components/__test__/MyFallbackComp";
import { Route, Routes } from "react-router-dom";
import { PageIndex } from "./components/__test__/PageIndex";
import { PageProtokoll } from "./components/__test__/PageProtokoll";
import { PageAdmin } from "./components/__test__/PageAdmin";
import { PagePrefs } from "./components/__test__/PagePrefs";
import { PageEintrag } from "./components/__test__/PageEintrag";
import React, { useEffect } from "react";
import { LoginContext, LoginInfo } from "./components/__test__/LoginContext";
import { getLogin } from "./backend/api";
import { CreateProtokoll } from "./components/__test__/CreateProtokoll";


function App() {
  const [loginInfo, setLoginInfo] = React.useState<LoginInfo | false | undefined>(undefined);

  useEffect(() => {
    (async() => {
    const loginFromServer = await getLogin();
    if(loginFromServer){
      console.log("app   "+loginFromServer.userId)
    }
    setLoginInfo(loginFromServer);
    })();
    },[]);

  return (
    <>
    <ErrorBoundary FallbackComponent={MyFallbackComp}>
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <Navigationbar></Navigationbar>
        <Routes>
          <Route path="*" element={<PageIndex />} />
          <Route path="/protokoll/:protokollId" element={<PageProtokoll />} />
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/prefs" element={<PagePrefs />} />
          <Route path="/eintrag/:eintragId" element={<PageEintrag />} />
          <Route path="/protokoll/neu" element={<CreateProtokoll/>} />
        </Routes>
        </LoginContext.Provider>
      </ErrorBoundary>




    </>
  );

}

export default App;
