import { useState } from "react";
import { Col, Row, Form, Button, Modal, Alert } from "react-bootstrap";


const Registrazione = (props) => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [emailUsed, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");


  const payload = {
    email: emailUsed,
    name: name,
    surname: surname,
    username: username,
    password: password,
    birthday: birthday,
  };

  const registerUser = () => {
    fetch("http://localhost:3010/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nella registrazione");
        }
      })
      .then((data) => {
        console.log(data);
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
          props.onHide();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
        show={props.show} 
        onHide={()=>{
          setRegisterSuccess(false); 
          props.onHide();}}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <Row className="d-flex flex-column justify-content-center align-items-center">
            <Col xs={6} className="mt-3">

              <div className="mt-3 mb-3 d-flex justify-content-center flex-column align-items-center">
                <h3>Registra un <span className="a-b-o p-2 rounded-pill">Account</span></h3>
                <p className="mt-4 text-body-tertiary">Compila i seguenti dettagli</p>
              </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              registerUser();
            }}
          >
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            >
              <Form.Label>Indirizzo email</Form.Label>
              <Form.Control type="email" placeholder="sample@mail.it" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setName(e.target.value);
              }}
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Mario" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            >
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Rossi" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Mario77" />
            </Form.Group>

            <Form.Group
            className="mb-3"
            onChange={(e)=>{
                setBirthday(e.target.value)
            }}>
                <Form.Label>Data di nascita</Form.Label>
                <Form.Control type="date"/>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="*****" />
            </Form.Group>
            
            <div className="d-flex mb-4">
                    <Button className='a-b-o flex-grow-1 mt-5 py-2 mb-5' type="submit" >
                    Registrati
                    </Button>
            </div>

              {registerSuccess && (<Alert variant="success" className="mt-3 p-2">Utente registrato correttamente!</Alert>)}
                                               
          </Form>
          </Col>
          </Row>
          </Modal.Body>
      </Modal>
  );
};

export default Registrazione;