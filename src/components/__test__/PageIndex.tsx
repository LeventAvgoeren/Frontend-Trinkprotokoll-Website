import { useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { Link } from "react-router-dom";
import { deleteLogin, getAlleProtokolle } from '../../backend/api';
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { Badge } from 'react-bootstrap';
import { ProtokollResource } from "../../Resources";
import { useLoginContext } from "./LoginContext";
import "./CSS.css"
import { PageError } from "./PageError";


export function PageIndex() {
    //myProtokoll ist meine variable
    //sobald ich setProtokoll aufrufe wird myProtokoll geupdated
    const [myProtokolle, setProtokolle] = useState<ProtokollResource[]>([])
    const [load, setLoad] = useState(true)
    const { loginInfo } = useLoginContext();
    const [error, setError] = useState<Error>(undefined!)


    //async funktion erstellen um getAlleProtokolle aufrufen zu können 
    useEffect(() => {
        async function data() {
            try {
                let daten = await getAlleProtokolle()
                setProtokolle(daten)
                setLoad(false)
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err)
                    await deleteLogin();
                }
            }

        }
        data()
    }, [loginInfo]
    )

    if (error) {
        return <PageError></PageError>
    }

    if (load) {
        return <LoadingIndicator></LoadingIndicator>
    }
    return (
        <>
            <h1>Protokoll Anzahl <Badge bg="secondary">{myProtokolle.length}</Badge></h1>
            <Row xs={1} md={2} lg={4} className="g-4">
                {myProtokolle.map((protokoll) => (
                    <Col key={protokoll.id}>
                        <Card className="card-shadow card-hover">
                            <Card.Body>
                                <Card.Title>Protokoll von Patient: {protokoll.patient}</Card.Title>
                                <Card.Text>
                                    <br />
                                    Public: <span style={{ color: protokoll.public ? "green" : "red" }}>
                                        {protokoll.public ? "Ja" : "Nein"}
                                    </span>
                                    <br />
                                    Closed: <span style={{ color: protokoll.closed ? "green" : "red" }}>
                                        {protokoll.closed ? "Ja" : "Nein"}
                                    </span><br />
                                    Ersteller Name: {protokoll.erstellerName}<br />
                                    Gesamtmenge: {protokoll.gesamtMenge}
                                </Card.Text>
                                <Link to={`/protokoll/${protokoll.id}`}>Mehr Anzeigen</Link>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Erstellt am: {protokoll.datum}</small><br />
                                <small className="text-muted">UpdatetAt: {protokoll.updatedAt}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}






















