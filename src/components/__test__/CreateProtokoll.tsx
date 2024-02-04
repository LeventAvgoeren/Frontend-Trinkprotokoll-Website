import { useEffect, useState } from "react"
import { createProtokoll, userId } from "../../backend/api"
import { Alert, Button, Col, Form, FormControl, Row } from "react-bootstrap"
import { useLoginContext } from "./LoginContext"
import "./CSS.css"
import { LinkContainer } from "react-router-bootstrap"

export function CreateProtokoll() {
    const [patientError, setPatientError] = useState("") //fals zeichen weniger als 3 oder mehr als 1000 sind 
    const [auswahlError, setAuswahl] = useState("")  //falls keine auswahl stand fand 
    const [patient, setPatient] = useState("")       //für die values des protokolls
    const [publiic, setPublic] = useState<boolean | null>(null)
    const [closed, setClosed] = useState<boolean | null>(null)
    const [datum, setDatum] = useState("")
    const { loginInfo, setLoginInfo } = useLoginContext();


    //Validierung falls zeichen grenze nicht eingehalten wurde oder nichts ausgewählt wurde
    async function validate() {
        if (patient.length < 3 && patient.length < 1000) {
            setPatientError("Name muss Länger als 3 zeichen sein und kleiner als 1000")
        }
        if (publiic === null || closed === null) {
            setAuswahl("Bitte treffen sie eine auswahl")
        }

    }



    async function create() {
            await createProtokoll(patient, datum, publiic!, closed!, userId)
    }


    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formPatient">
                    <Form.Label>Patient</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Zu Pflegenden"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                        onBlur={validate}
                        isInvalid={!!patientError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {patientError}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formPublic">
                    <Form.Label>Public</Form.Label>
                    <Form.Control
                        as="select"
                        value={publiic !== null ? publiic.toString() : ""}
                        onChange={(e) => setPublic(e.target.value === "true")}
                        onBlur={validate}
                        isInvalid={!!auswahlError}
                    >
                        <option value="">Auswählen...</option>
                        <option value="true">Ja</option>
                        <option value="false">Nein</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {auswahlError}
                    </Form.Control.Feedback>
                    
                </Form.Group>

                <Form.Group as={Col} controlId="formClosed">
                    <Form.Label>Closed</Form.Label>
                    <Form.Control
                        as="select"
                        value={closed !== null ? closed.toString() : ""}
                        onChange={(e) => setClosed(e.target.value === "true")}
                        onBlur={validate}
                        isInvalid={!!auswahlError}
                    >
                        <option value="">Auswählen...</option>
                        <option value="true">Ja</option>
                        <option value="false">Nein</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {auswahlError}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formDatum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="DD.MM.YYYY"
                        value={datum}
                        onChange={(e) => setDatum(e.target.value)}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Col>
                    <LinkContainer to="/">
                        <Button variant="secondary" className="custom-button">
                            Abbrechen
                        </Button>
                    </LinkContainer>
                    
                    <Button type="submit" variant="primary" className="custom-button" onClick={create}>
                        Speichern
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
