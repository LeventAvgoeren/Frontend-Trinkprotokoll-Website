import { useParams } from "react-router-dom";
import { createEintrag} from "../../backend/api";
import { useEffect, useState } from "react"
import { createProtokoll, userId } from "../../backend/api"
import { Alert, Button, Col, Form, FormControl, Row } from "react-bootstrap"
import { useLoginContext } from "./LoginContext"
import "./CSS.css"
import { LinkContainer } from "react-router-bootstrap"

export function CreateEintrag(){
    const params = useParams();
    let protokollId = params.protokollId
    const [getraenkeError, setGetraenkeError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 
    const [kommentarError, setKommentarError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 
    const [mengeError, setMengeError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 

    const [getraenk, setGetraenk] = useState("")
    const [menge, setMenge] = useState<number>()
    const [kommentar, setKommentar] = useState("")


    async function create(){
        let a=await createEintrag(getraenk,menge!,kommentar,userId,protokollId!)
        console.log("Das wurde erstellt: " +a)
    }

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
 return (
        <Form>
            <Row className="mb-3">
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
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formPatient">
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

                <Form.Group as={Col} controlId="formPatient">
                    <Form.Label>Kommentar</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Bemerkung "
                        value={kommentar}
                        onChange={(e) => setKommentar(e.target.value)}
                        onBlur={validate}
                        isInvalid={!!kommentarError}

                    />
                    <Form.Control.Feedback type="invalid">
                        {kommentarError}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Col>
                    <LinkContainer to={`/protokoll/${protokollId}`}>
                        <Button variant="secondary" className="custom-button">
                            Abbrechen
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/protokoll/${protokollId}`}>
                    <Button type="submit" variant="primary" className="custom-button" onClick={create}>
                        Speichern
                    </Button>
                    </LinkContainer>
                    
                </Col>
            </Row>
        </Form>
    )
}