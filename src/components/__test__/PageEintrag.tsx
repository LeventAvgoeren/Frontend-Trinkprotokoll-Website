import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteEintrag, deleteLogin, getEintrag, putEintrag, userId } from '../../backend/api';
import { LoadingIndicator } from "./LoadingIndicator";

import { LinkContainer } from "react-router-bootstrap";

import { EintragResource } from "../../Resources";
import { PageError } from "./PageError";
import { Badge, Button, Card, CardGroup, Col, Form, FormControl, Modal, Stack } from "react-bootstrap";



export function PageEintrag() {
    const params = useParams();
    let eintragId = params.eintragId
    const [getraenkeError, setGetraenkeError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 
    const [kommentarError, setKommentarError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 
    const [mengeError, setMengeError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 
    const [eintrag, setEintrag] = useState<EintragResource | null>()
    const [error, setError] = useState<Error>(undefined!)
    const [eintragDelete, setEintragDelete] = useState(false);
    const [eintragBearbeiten, setEintragBearbeiten] = useState(false);
    const [getraenk, setGetraenk] = useState("")
    const [menge, setMenge] = useState<number>()
    const [kommentar, setKommentar] = useState("")

    async function validate() {
        if (getraenk.length < 1 && getraenk.length < 101) {
            setGetraenkeError("Name muss Länger als 1 zeichen sein und kleiner als 100")
        }
        if (kommentar.length<1 && kommentar.length<1001) {
            setKommentarError("Bitte nicht mehr als 1000 Zeichen und min 1 zeichen")
        }
        if(menge! >3000){
            setMengeError("Willst du ertrinken oder was nicht mehr als 3L")
        }

    }

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
    async function updateEintrag(){
        await putEintrag(eintragId!,getraenk,menge!,kommentar,userId,eintrag!.protokoll!)
    }

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
                        <Card.Title>Eintrag</Card.Title>
                        <Card.Text>
                            Getränk: {eintrag.getraenk}<br />
                            Menge: {eintrag.menge}<br />
                            Kommentar: {eintrag.kommentar}<br />
                            Ersteller Name: {eintrag.erstellerName}<br />
                            {userId === eintrag.ersteller && (
                                <>
                                    <Button variant="outline-primary" onClick={() => setEintragDelete(true)}>Eintrag Löschen</Button>
                                    <Button variant="outline-primary" onClick={()=>setEintragBearbeiten(true)}>Eintrag Bearbeiten</Button>
                                </>
                            )}
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

            <Modal
                show={eintragDelete}
                onHide={() => setEintragDelete(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Eintrag löschen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Möchten Sie diesen Eintrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.</p>
                    <div className="d-flex justify-content-end">
                        
                        <Button variant="secondary" onClick={() => setEintragDelete(false)} className="me-2">Abbrechen</Button>
                        <LinkContainer to={`/protokoll/${eintrag.protokoll}`}>
                        <Button variant="danger" onClick={async () => {
                            await deleteEintrag(eintragId!);
                            setEintragDelete(false);
                        }}>Löschen</Button>
                        </LinkContainer>
                        
                    
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={eintragBearbeiten} onHide={() => setEintragBearbeiten(false)} backdrop="static" keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>Eintrag Bearbeiten</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
      <Form.Group as={Col} controlId="formPatient">
                    <Form.Label>Getraenk</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Was haben sie Getrunken"
                        value={getraenk}
                        onChange={(e) => setGetraenk(e.target.value)}
                        onBlur={validate}
                        isInvalid={!!getraenkeError}

                    />
                    <Form.Control.Feedback type="invalid">
                        {getraenkeError}
                    </Form.Control.Feedback>
                </Form.Group>

        <Form.Group>
          <Form.Label>Menge</Form.Label>
          <Form.Control
            type="number"
            placeholder="Menge in ml"
            value={menge}
            onChange={(e) => setMenge(parseInt(e.target.value) || undefined)}
            onBlur={validate}
            isInvalid={!!mengeError}
          />
          <Form.Control.Feedback type="invalid">
            {mengeError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Kommentar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bemerkung"
            value={kommentar}
            onChange={(e) => setKommentar(e.target.value)}
            onBlur={validate}
            isInvalid={!!kommentarError}
          />
          <Form.Control.Feedback type="invalid">
            {kommentarError}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setEintragBearbeiten(false)}>
        Abbrechen
      </Button>
      <LinkContainer to={`/protokoll/${eintrag.protokoll}`}>
      <Button variant="primary" onClick={updateEintrag}>
        OK
      </Button>
      </LinkContainer>
      
    </Modal.Footer>
  </Modal>
    </>
    );
}

