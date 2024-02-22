import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { PencilSquare, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

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

// CHIUDE GLI INPUT PER LA MODIFICA DEI CAMPI (Modifica Profilo)
const [edit1, setEdit1] = useState(false)
const [edit2, setEdit2] = useState(false)
const [edit3, setEdit3] = useState(false)
const [edit4, setEdit4] = useState(false)
const [edit5, setEdit5] = useState(false)
const [edit6, setEdit6] = useState(false)
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
            },3000)
            setName(null)
            setEdit1(false)
            setSurname(null)
            setEdit2(false)
            setUsername(null)
            setEdit3(false)
            setEmail(null)
            setEdit4(false)
            setPassword(null)
            setEdit5(false)
            setBirthday(null)
            setEdit6(false)
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
            },2000)
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
{/*-------------------------------------------------------COL1---------------------------------------------------------------------------------------------------- */}

                <Col xs={4}>
                <img src={user.avatar} alt="image-profile" className="w-100 h-100 img-fluid" style={{maxHeight:"400px",objectFit:"cover"}}/>
                    <Form  
                        onSubmit={(e) => {
                            e.preventDefault();
                            uploadImage()
                            setImageIsUploading(true)
                        }}>
                         <Row>
                            <Col className="d-flex flex-row align-items-center">
                                <Button type="submit" className="bg-white text-black border border-1 mt-3">
                                {imageIsUploading ? (<Spinner/>) : ("Upload")}
                                </Button>
                                   <Form.Control className="mt-3 ms-3" type="file" size="sm" required
                                   onChange={(e)=>{setImage(e.target.files)}}
                                  />
                            </Col>
                        </Row>
                     </Form>
{/*------------------------------------------------- ELIMINA PROFILO----------------------------------------------------------------------------------------- */}
                     <Row className="d-flex flex-column" style={{height:"300px"}}>
                        <Col className="m-0 d-flex align-items-center">
                            <Button className="bg-dark d-flex align-items-center border border-0" onClick={()=>{deleteUser()}}>
                                <XCircleFill className="me-3"/> 
                                Elimina profilo
                            </Button>
                        </Col>
                        <Col>
                            {deleteSuccess && <Alert>Profilo Eliminato</Alert>}
                        </Col>
                     </Row>
                </Col>
{/*-------------------------------------------------------COL2---------------------------------------------------------------------------------------------------- */}
                <Col xs={4}>
                <Form onSubmit={(e)=>{e.preventDefault(); editProfile()}}>
                    <Form.Group  className="mb-3" >
                        <Form.Label column >
                        Nome: <span className="fw-bold text-capitalize">{user.name}</span><PencilSquare className="ms-2" style={{cursor:"pointer"}} onClick={()=>{setEdit1(!edit1)}}/>
                        </Form.Label>
                        <Col >
                        {edit1 && <Form.Control type="text" placeholder="min 3, max 30 caratteri" value={name} onChange={(e)=>{setName(e.target.value)}} />}
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column >
                        Cognome: <span className="fw-bold text-capitalize">{user.surname}</span><PencilSquare className="ms-2" style={{cursor:"pointer"}} onClick={()=>{setEdit2(!edit2)}}/>
                        </Form.Label>
                        <Col >
                        {edit2 && <Form.Control type="text" placeholder="min 3, max 30 caratteri" value={surname} onChange={(e)=>{setSurname(e.target.value)}}/>}
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column >
                        Username:<span className="fw-bold text-capitalize">{user.username}</span><PencilSquare className="ms-2" style={{cursor:"pointer"}} onClick={()=>{setEdit3(!edit3)}}/>
                        </Form.Label>
                        <Col >
                        {edit3 && <Form.Control type="text" placeholder="min 3, max 30 caratteri" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>}
                        </Col>
                    </Form.Group>
                    <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column >
                        Email: <span className="fw-bold">{user.email}</span><PencilSquare className="ms-2" style={{cursor:"pointer"}} onClick={()=>{setEdit4(!edit4)}}/>
                        </Form.Label>
                        <Col >
                        {edit4 && <Form.Control type="text" placeholder="example@mail.it" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>}
                        </Col>
                    </Form.Group>

                    <Form.Group  className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column >
                        Password: <span className="fw-bold text-capitalize">*******</span><PencilSquare className="ms-2" style={{cursor:"pointer"}} onClick={()=>{setEdit5(!edit5)}}/>
                        </Form.Label>
                        <Col >
                        {edit5 && <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>}
                        </Col>
                    </Form.Group>
                    <Form.Group  className="mb-3" >
                        <Form.Label column >
                        Data di nascita: <span className="fw-bold text-capitalize">{user.birthday}</span><PencilSquare className="ms-2" style={{cursor:"pointer"}} onClick={()=>{setEdit6(!edit6)}}/>
                        </Form.Label>
                        <Col>
                        {edit6 && <Form.Control type="date" value={birthday} onChange={(e)=>{setBirthday(e.target.value)}} />}
                        </Col>
                    </Form.Group>
                    <Button type="submit" className="icon-effect border border-black">Conferma</Button>
                {showAlert && <Alert className="mt-3">Modifica effettuata con successo</Alert>}
                </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UserUpdateDetail