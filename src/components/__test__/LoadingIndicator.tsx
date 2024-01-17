import Spinner from 'react-bootstrap/Spinner';

export function LoadingIndicator() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Laden...</span>
    </Spinner>
  );
}
