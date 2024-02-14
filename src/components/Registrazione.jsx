import { useState } from "react";
import { Col, Container, Row, Form, Button, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
          throw new Error("errore nel login");
        }
      })
      .then((data) => {
        console.log(data);
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
          props.onHide();
        }, 3000);
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <Row className="w-100 d-flex justify-content-between">
                <Col>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crea un account
                    </Modal.Title>
                </Col>
                <Col className=" d-flex justify-content-end">
                     
                </Col>
            </Row>
          
        </Modal.Header>
        <Modal.Body>
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
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="sample@mail.it" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setName(e.target.value);
              }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il tuo nome" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            >
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Inserisci il tuo cognome" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Inserisci un nickname" />
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
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
              <Button type="submit" className="rounded-pill artesum-button-black px-4">Submit</Button>
              {registerSuccess && (<Alert variant="success" className="mt-3 p-2">Utente registrato correttamente!</Alert>)}
                                               
          </Form>
          </Modal.Body>
        <div className="mt-3 border-top d-flex justify-content-center">
        <p className="mx-5 mt-3">ART Ergo SUM</p>
          </div>
      </Modal>
  );
};

export default Registrazione;