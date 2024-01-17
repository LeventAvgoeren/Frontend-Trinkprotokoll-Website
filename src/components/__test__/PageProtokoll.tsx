import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { deleteLogin, deleteProtokoll, getAlleEintraege, getProtokoll } from '../../backend/api';
import { Badge, Button, Card, CardGroup, Form, FormControl, Modal, Stack } from "react-bootstrap";
import { EintragResource, ProtokollResource } from "../../Resources";
import { PageError } from "./PageError";
import { LinkContainer } from "react-router-bootstrap";
import { Bearbeiten } from "../Bearbeiten";



export function PageProtokoll() {
    const params = useParams();
    let protokollId = params.protokollId

    const [protokoll, setProtokoll] = useState<ProtokollResource | null>()
    const [eintraege, setEintrag] = useState<EintragResource[]>([])
    const [error, setError] = useState<Error>(undefined!)
    const [show, setShow] = useState(false);




    async function protokollLoeschen() {
        await deleteProtokoll(protokollId!);
    }

    async function protokollBearbeiten(){
        setShow(true)
    }

    useEffect(() => {
        async function loadProtokoll() {
            try {
                let proto = await getProtokoll(protokollId!)
                let eint = await getAlleEintraege(protokollId!)
                setProtokoll(proto)
                setEintrag(eint)
            }
            catch (error) {
                //Wenn ein fehler auftritt egal welcher (403,401,404)
                if (error instanceof Error) {
                    setError(error)
                    await deleteLogin();
                }
            }
        }
        loadProtokoll()
    }, []
    
    )

    if (error) {
        return <PageError></PageError>
    }

    if (!protokoll) {
        return <LoadingIndicator></LoadingIndicator>
    }


    return (

        <>
    
            <h3>Einträge für dieses Protokoll <Badge bg="secondary">{eintraege.length}</Badge></h3>
            
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>Protokoll von Patient: {protokoll.patient}</Card.Title>
                        <Card.Text>
                            Datum: {protokoll.datum}<br />
                            Public: <span style={{ color: protokoll.public ? "green" : "red" }}>
                                {protokoll.public ? "Ja" : "Nein"}
                            </span><br />
                            Closed: <span style={{ color: protokoll.closed ? "green" : "red" }}>
                                {protokoll.closed ? "Ja" : "Nein"}
                            </span><br />
                            Ersteller Name: {protokoll.erstellerName}<br />
                            Gesamtmenge: {protokoll.gesamtMenge}
                        </Card.Text>
                        <LinkContainer to="/">
                        <Button variant="outline-danger" className="mr-2" onClick={protokollLoeschen}>Löschen</Button>
                    </LinkContainer>

                        <Button variant="outline-primary" onClick={protokollBearbeiten}>Bearbeiten</Button>
                         {show&& <Bearbeiten setShow={setShow}  show></Bearbeiten>} 
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">UpdatetAt: {protokoll.updatedAt}</small>
                    </Card.Footer>
                </Card>
            </CardGroup>

            {eintraege.map((ein, i: number = 0) => (
                <CardGroup key={ein.id}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{i + 1}.Eintrag </Card.Title>
                            <Card.Text>
                                Getränk: {ein.getraenk}<br />
                                Menge: {ein.menge}<br />
                                Kommentar: {ein.kommentar}<br />
                                Ersteller Name: {ein.erstellerName}<br />
                            </Card.Text>
                            <Link to={`/eintrag/${ein.id}`}>Eintrag anzeigen</Link>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">CreatedAt: {ein.createdAt}</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>
            ))}
        </>
    );

}
