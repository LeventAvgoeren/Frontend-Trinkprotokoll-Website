import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { deleteLogin, getLogin, postLogin } from '../../backend/api';
import { Console } from 'console';
import { useLoginContext } from './LoginContext';
//import { useLoginContext } from './LoginContext';

type HelpProp = {
  setClick: (value: boolean) => void;
};


export function LoginDialog({ setClick }: HelpProp) {
  const [show, setShow] = useState(true);
  const handleClose = () => setClick(false);

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const { setLoginInfo } = useLoginContext();
  const [errorMessage, setErrorMessage] = useState("");





  async function login() {
    try {
      let a = await postLogin(name, password)
      //setAdminOrNot(a.role);
      let userInfo = await getLogin()
      if(userInfo){
        console.log("getLogin  "+userInfo.userId)
      }
      setLoginInfo(userInfo)

      setShow(false);
    }
    catch (err) {
      setErrorMessage("Benutzername oder Passwort ist falsch.");
      await deleteLogin()
//dada
    }

  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="username">Name</Form.Label>
              <FormControl id="username" type="text" name="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Benutzername" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Passwort</Form.Label>
              <FormControl id="password" type="Password" name="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Geben Sie Ihr Passwort ein" />
            </Form.Group>
          </Form>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button type="submit" variant="primary" onClick={login} >OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
