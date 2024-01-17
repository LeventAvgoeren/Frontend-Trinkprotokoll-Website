import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, InputGroup, FormControl, Col } from 'react-bootstrap';
import { Console } from 'console';
import { useLoginContext } from './__test__/LoginContext';
import { postProtokoll, userId } from '../backend/api';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

//import { useLoginContext } from './LoginContext';

//setShow auf false setzen wenn man auf abbrechen drückt 
type HelpProp = {
  show: boolean;
  setShow: (value: boolean) => void;
};

export function Bearbeiten({ setShow, show }: HelpProp) {

  const params = useParams();
  let protokollId = params.protokollId

  const handleClose = () => setShow(false);

  const [patientError, setPatientError] = useState("")

  const [auswahlError, setAuswahl] = useState("")
  const [patient, setPatient] = useState("")
  const [publiic, setPublic] = useState<boolean | null>(null)
  const [closed, setClosed] = useState<boolean | null>(null)
  const [datum, setDatum] = useState("")

  async function validate() {
    if (patient.length < 3 && patient.length < 1000) {
      setPatientError("Name muss Länger als 3 zeichen sein und kleiner als 1000")
    }
    if (publiic === null || closed === null) {
      setAuswahl("Bitte treffen sie eine auswahl")
    }


  }
  async function editProtokoll() {
    try {
      console.log("protokoll id" + protokollId)
      await postProtokoll(patient, datum, publiic!, closed!, userId, protokollId!)
      handleClose()
    }
    catch (err) {

    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Protokoll Bearbeiten</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label >Patient</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zu Pflegenden"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                onBlur={validate}
                isInvalid={!!patientError}
              />            </Form.Group>
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
            </Form.Group>
            <Form.Group as={Col} controlId="formDatum">
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                placeholder="DD.MM.YYYY"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <LinkContainer to="/">
            <Button type="submit" variant="primary" onClick={editProtokoll}>OK</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
