import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteLogin, getEintrag } from '../../backend/api';
import { LoadingIndicator } from "./LoadingIndicator";
import { Card, CardGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { EintragResource } from "../../Resources";
import { PageError } from "./PageError";

export function PageEintrag() {
    const params = useParams();
    let eintragId = params.eintragId
    const [eintrag, setEintrag] = useState<EintragResource | null>()
    const [error, setError] = useState<Error>(undefined!)

    useEffect(() => {
        async function loadEintrag() {
            try {
                let eintrage = await getEintrag(eintragId!)
                setEintrag(eintrage)
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error)
                    await deleteLogin();
                }
            }
        }
        loadEintrag()
    }, []
    )

    if (error) {
        return <PageError></PageError>
    }

    if (!eintrag) {
        return <LoadingIndicator></LoadingIndicator>
    }

    return (
        <>
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>Eintrag </Card.Title>
                        <Card.Text>
                            Getränk: {eintrag.getraenk}<br />
                            Menge: {eintrag.menge}<br />
                            Kommentar: {eintrag.kommentar}<br />
                            Ersteller Name: {eintrag.erstellerName}<br />
                        </Card.Text>
                        <LinkContainer to="/">
                        <Button variant="primary" size="lg" className="mt-3">Home</Button>
                        </LinkContainer>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">CreatedAt: {eintrag.createdAt}</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </>
    )
}

