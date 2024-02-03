// istanbul ignore file -- no coverage, since we would need a running backend for that

import { EintragResource, LoginResource, ProtokollResource } from "../Resources"
import { LoginInfo } from "../components/__test__/LoginContext"
import { fetchWithErrorHandling } from "./fetchWithErrorHandling"
export let userId:string;

export async function getAlleProtokolle(): Promise<ProtokollResource[]> {
    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/protokoll/alle`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData
}

export async function getAlleEintraege(protokollId: string): Promise<EintragResource[]> {


    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/protokoll/${protokollId}/eintraege`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData

}
export async function getEintrag(eintragId: string): Promise<EintragResource> {
    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/eintrag/${eintragId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData
}

export async function getProtokoll(protokollId: string): Promise<ProtokollResource> {
    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/protokoll/${protokollId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData
}

export async function postLogin(name: string, password: string): Promise<LoginResource> {
    let login = {
        name: name,
        password: password
    }
    //folie 259
    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login),
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData
}

export async function getLogin(): Promise<LoginInfo | false> {
    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/login/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        credentials: "include" as RequestCredentials
    })

    let finalData = await daten.json()
    console.log(finalData)
    if(finalData){
        userId=finalData.id
    }
    return finalData

}

export async function deleteLogin(): Promise<any> {
    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/login/`, {
        method: "DELETE",
        credentials: "include" as RequestCredentials
    })

    return daten
}

export async function createProtokoll(patient:string,datum:string,publiic:boolean,closed:boolean,userId:string):Promise<ProtokollResource>{
    let protokoll:ProtokollResource={
        patient:patient,
        public:publiic,
        closed:closed,
        ersteller:userId,
        datum:datum
    }
        let daten=await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/protokoll/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(protokoll),
            credentials: "include" as RequestCredentials

    })
    let finalData = await daten.json()
    return finalData    
}

export async function deleteProtokoll(protokollId:string){
        await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/protokoll/${protokollId}`, {
        method: "DELETE",
        credentials: "include" as RequestCredentials
    })
}

export async function putProtokoll(patient:string,datum:string,publiic:boolean,closed:boolean,userId:string,protokollId:string): Promise<ProtokollResource> {
    let protokoll={
        id: protokollId,
        patient:patient,
        datum:datum,
        public:publiic,
        closed:closed,
        ersteller:userId,
    }

    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/protokoll/${protokollId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(protokoll),
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData
}

export async function createEintrag(getraenke:string,mengen:number,kommentare:string,erstellere:string,protokolle:string):Promise<EintragResource>{
    let eintrag:EintragResource={
        getraenk:getraenke,
        menge:mengen,
        kommentar:kommentare,
        ersteller:erstellere,
        protokoll:protokolle
    }
        let daten=await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/eintrag/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eintrag),
            credentials: "include" as RequestCredentials

    })
    let finalData = await daten.json()
    return finalData    
}
export async function deleteEintrag(eintragId:string){
    await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/eintrag/${eintragId}`, {
    method: "DELETE",
    credentials: "include" as RequestCredentials
})
}

export async function putEintrag(eintragId:string,getraenke:string,mengen:number,kommentare:string,erst:string,protokollIds:string): Promise<EintragResource> {
    let eintrag={
        id: eintragId,
        getraenk:getraenke,
        menge:mengen,
        kommentar:kommentare,
        ersteller:erst,
        protokoll:protokollIds,
    }

    let daten = await fetchWithErrorHandling(process.env.REACT_APP_API_SERVER_URL + `/api/eintrag/${eintragId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eintrag),
        credentials: "include" as RequestCredentials
    })
    let finalData = await daten.json()
    return finalData
}