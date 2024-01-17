import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLoginContext } from "./LoginContext";

export function PageError() {

    const { loginInfo, setLoginInfo } = useLoginContext();

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="text-center shadow-lg p-4 mb-5 bg-white rounded" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <Card.Title>Oops! Fehler aufgetreten</Card.Title>
                    <Card.Text>
                        Etwas ist schiefgelaufen, Sie wurden abgemeldet. Bitte versuchen Sie es erneut.
                    </Card.Text>
                    <LinkContainer to="/">
                        <Button variant="primary" size="lg" className="mt-3" onClick={()=>setLoginInfo(false)}>Zurück zur Startseite</Button>
                    </LinkContainer>
                </Card.Body>
            </Card>
        </Container>
    )
}
