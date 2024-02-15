import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Registrazione from "./Registrazione";


function Login(props) {
  const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const navigate = useNavigate();
  
    const bodyToUse = {
      email: email,
      password: password,
    };
  
    const serverLogin = () => {
      fetch("http://localhost:3010/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyToUse),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 401) {
            throw new Error("Credenziali non valide. Riprova.");
          } else {
            throw new Error("Errore nel login");
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("tokenAdmin", "Bearer " + data.token);
          // Chiudi il modale solo se le credenziali sono corrette
          props.onHide();
          navigate("/");
          handleLoginSuccess();
        })
        .catch((err) => {
          console.log(err);
          console.error(err);
          // Gestisci il caso in cui le credenziali sono errate
          setError("Credenziali non valide. Riprova.");
        });
    };
  
    const token = localStorage.getItem("tokenAdmin");
    console.log(token);

    const handleLoginSuccess = () => {
      // Effettua le operazioni necessarie dopo un accesso riuscito
      console.log("Login successo!");
      props.onLoginSuccess(); // Chiama la funzione di callback fornita da CustomNavbar
      navigate("/"); // Esempio: reindirizza l'utente alla homepage
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Controlla se l'email e la password sono state inserite
        if (!email || !password) {
          setError("Inserisci sia l'email che la password.");
          return;
        }

        // Chiama la funzione serverLogin per autenticare l'utente
        serverLogin();
    };


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <Row className="w-100 d-flex justify-content-between">
                <Col>
                    <Modal.Title id="contained-modal-title-vcenter">Accesso</Modal.Title>
                </Col>
                <Col className=" d-flex justify-content-end">
                     <Button className='w-50 me-3 rounded-pill artesum-button' onClick={()=>setModalShow(true)}>
                    Registrati
                    </Button>
                    <Registrazione show={modalShow} onHide={()=> setModalShow(false)}/>
                </Col>
            </Row>
          
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
        <Form className="mx-4" onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            <Button className='ms-5 mt-3 px-4 rounded-pill artesum-button-black' type="submit" >
            Accesso
            </Button>
              
            </Form>
        </Modal.Body>
        <div className="mt-3 border-top d-flex justify-content-center">
        <p className="mx-5 mt-3">ART Ergo SUM</p>
          </div>
      </Modal>
    );
  }
  export default Login;