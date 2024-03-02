import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Registrazione from "./Registrazione";
import { Facebook, Google } from "react-bootstrap-icons";


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
  
        <Modal.Body className="py-5">
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <Col xs={7} >

              <div className="mt-4 mb-5 d-flex justify-content-center flex-column align-items-center">
                <h3>Accedi al tuo <span className="a-b-o p-2 rounded-pill">Account</span></h3>
                <p className="mt-4 text-body-tertiary">Ritorna nel tuo account</p>
              </div>

          {error && <div className="alert alert-danger">{error}</div>}
        <Form  onSubmit={handleSubmit}>
              <Form.Group
                className="mb-4 "
                controlId="formBasicEmail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                <Form.Control type="email" placeholder="Indirizzo email" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              >
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-flex justify-content-end mt-4">
                <p className="text-body-tertiary" style={{cursor:"pointer"}}>Password dimenticata?</p>
              </div>
                <div className="d-flex">
                    <Button className='a-b-o flex-grow-1 mt-2 py-2' type="submit" >
                    Login
                    </Button>
                </div>
            </Form>
          <div className="mt-4 text-center">
            <p>Sei nuovo? 
              <span onClick={()=>setModalShow(true)} style={{cursor:"pointer"}} className='fw-bold ms-2 ' 
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'} > 
              Registrati</span>
            </p>
            <Registrazione show={modalShow} onHide={()=> setModalShow(false)}/>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-5">
                <hr className="flex-grow-1 mr-3" />
                <p className="m-0 mx-4">Oppure</p>
                <hr className="flex-grow-1 ml-3" />
          </div>
          <div className="text-center my-2 mt-4">
            <Facebook className="text-art m-2 fs-3"/>
            <Google className="text-art m-2 fs-3"/>
          </div>
        </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
  export default Login;