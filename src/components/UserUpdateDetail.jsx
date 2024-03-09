import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { PencilSquare, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Checkmark from "./utils/Checkmark";

function UserUpdateDetail(props){
// Utilizzo destructuring per estrarre il valore di user dalle props
const { user, refresh} = props;

const navigate = useNavigate()

const [image, setImage] = useState(null)
const [imageIsUploading, setImageIsUploading] = useState(false)
const [imageUploaded, setImageUploaded] = useState(false)
const [finishEdit, setFinishEdit] = useState(false)
const [showAlert, setShowAlert] = useState(false)
const [deleteSuccess, setDeleteSuccess] = useState(false)

// PAYLOAD
const [name, setName] = useState(null)
const [surname, setSurname] = useState(null)
const [username, setUsername] = useState(null)
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const [birthday, setBirthday] = useState(null)

const payload = {
    name: name,
    surname: surname,
    username: username,
    email: email,
    password: password,
    birthday: birthday
}
const editProfile = () =>{
    fetch("http://localhost:3010/users/me",{
        method:"PUT",
        headers:{
            Authorization:localStorage.getItem("tokenAdmin"),
            "Content-Type": "application/json"
                },
        body: JSON.stringify(payload)
    })
    .then((res)=>{
        if(res.ok){
            console.log("Profilo modificato: ")
            console.log( res)
            setFinishEdit(true)
            setShowAlert(true)
            setTimeout(()=>{
                setShowAlert(false)
            },4000)
            setName(null)
            setSurname(null)
            setUsername(null)
            setEmail(null)
            setPassword(null)
            setBirthday(null)
        }else{
            throw new Error("Errore nel modificare i dati")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

const deleteUser = () =>{
    const confirmDelete = window.confirm("Sicuro di voler eliminare il tuo profilo utente?");
    if(!confirmDelete) return;

    fetch("http://localhost:3010/users/me",{
        method:"DELETE",
        headers:{Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            console.log("Profilo Utente Eliminato")
            console.log(res)
            setDeleteSuccess(true)
             // Cancello LO STORAGE PER DISATTIVARE L'ICONA utente LOGGATO
            localStorage.clear()
            setTimeout(()=>{
                navigate("/")
                window.location.reload()
            },3000)
        }else{
            confirm("Non è stato possile eliminare il tuo profilo, magari ci sono ancora ordini in corso, oppure hai ancora negozi aperti!")
            throw new Error("Non è stato possibile cancellare")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

const data = new FormData()
if (image){
    data.append("image", image[0])
}

const uploadImage = () =>{
    fetch("http://localhost:3010/users/me/upload",{
        method: "PATCH",
        headers:{
            Authorization: localStorage.getItem("tokenAdmin"), 
            Accept: "application/json"
        },
        body: data,
    })
    .then((res)=>{
        if(res.ok){
            console.log("Immagine Profilo caricata con successo")
            setImageIsUploading(false)
            setImageUploaded(true)
        }else{
            throw new Error("Errore nel caricare immagine profilo" + res.statusText)
        }
    })
    .catch((err)=>{
        console.log("Errore immagine profilo")
        console.log(err)
    })
}

useEffect(() => {
    if(imageUploaded || finishEdit ){
        refresh()
    }
    
}, [imageIsUploading, finishEdit]); 

    return(
        <Container>
            <Row className="d-flex justify-content-center">
                <Col xs={4}>
            <h4 className=" mb-5"><span className="border-art">Modifica profilo</span></h4>
                </Col>
                <Col xs={4}></Col>
            </Row>
            <Row className="d-flex justify-content-center">

{/*-------------------------------------------------------COL1---------------------------------------------------------------------------------------------------- */}
                <Col xs={4}>
                <Form onSubmit={(e)=>{e.preventDefault(); editProfile()}}>
                    <Form.Group  className="mb-3" >
                        <Form.Label column >Nome:</Form.Label>
                        <Col >
                        <Form.Control type="text" placeholder={user.name} value={name} onChange={(e)=>{setName(e.target.value)}} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column >Cognome:</Form.Label>
                        <Col >
                        <Form.Control type="text" placeholder={user.surname} value={surname} onChange={(e)=>{setSurname(e.target.value)}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column >Username:</Form.Label>
                        <Col >
                        <Form.Control type="text" placeholder={user.username} value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column >Email:</Form.Label>
                        <Col >
                        <Form.Control type="text" placeholder={user.email} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group  className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column >Password:</Form.Label>
                        <Col >
                        <Form.Control type="password" placeholder="*****" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group  className="mb-3" >
                        <Form.Label column >
                        Data di nascita:
                        </Form.Label>
                        <Col>
                       <Form.Control type="date" value={birthday}  onChange={(e)=>{setBirthday(e.target.value)}} />
                        </Col>
                    </Form.Group>
                    <Row >
                        <Col className="d-flex justify-content-start mt-3">
                            <Button type="submit" className="a-b-o-h">Conferma</Button>
                        </Col>
                        <Col className="d-flex justify-content-end mt-3">
                            <Button variant="outline-dark" onClick={()=>{deleteUser()}} >Elimina profilo</Button>
                        </Col>
                    </Row>
                    
                {showAlert && (
                            <div className="d-flex justify-content-center mt-3">
                                <Checkmark/>
                            </div> 
                )}
                </Form>
                </Col>
{/*-------------------------------------------------------COL2---------------------------------------------------------------------------------------------------- */}

        <Col xs={4} className="d-flex flex-column align-items-center mt-4">
                <img src={user.avatar} alt="image-profile" className="rounded-3" style={{width:"250px", height:"250px",objectFit:"cover"}}/>
                    <Form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            uploadImage()
                            setImageIsUploading(true)
                        }}>
                         <Row>
                            <Col className="d-flex flex-column align-items-center">
                                   <Form.Control className="mt-3 custom-file-input" type="file" size="sm" required style={{width:"250px"}} 
                                   onChange={(e)=>{setImage(e.target.files)}}
                                  />
                                <Button type="submit" className="a-b-o-h mt-3">
                                {imageIsUploading ? 
                                (<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>) 
                                : 
                                ("Upload")}
                                </Button>
                            </Col>
                        </Row>
                     </Form>

            {deleteSuccess && 
                                    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                                    <Alert variant="secondary" className="text-center mt-2">Grazie per aver fatto parte della nostra community, ti auguriamo il meglio per il futuro.</Alert>
                                    <Checkmark/>
                                </div> 
                                }
                </Col>                
            </Row>
        </Container>
    )
}

export default UserUpdateDetail