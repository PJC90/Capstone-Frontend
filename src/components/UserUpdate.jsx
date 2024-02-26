import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { ArchiveFill, BarChartFill, ChatRightFill, HeartFill, PencilFill, XCircleFill } from "react-bootstrap-icons";
import UserUpdateDetail from "./UserUpdateDetail";

function UserUpdate(){

    const [userMe, setUserMe] = useState(null)
    const [viewModifica, setViewModifica] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const getMyProfile = () =>{
        fetch("http://localhost:3010/users/me", {
            headers: {Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel ricevere il profilo utente")
            }
        })
        .then((data)=>{
            setUserMe(data)
            console.log("Utente:")
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
const handleRefresh = () =>{
    setRefresh(!refresh)
}
   
    useEffect(()=>{   
        getMyProfile()
    },[refresh])

    return(
        <Container fluid  style={{height:"100vh"}}>
            <Row className="d-flex justify-content-start h-100" >
 {/*-------------------------------------------------------------------- LEFT SIDEBAR ------------------------------------------------------------------------------               */}
                <Col xs={2} className="d-flex flex-column" style={{width:"250px", boxShadow:"25px 0px 20px -20px rgba(0,0,0,0.1)"}}  >
                    <Row className="mt-5 ms-1" >
                        {userMe ? (
                        <Col className="d-flex flex-column align-items-start mt-5" > 
                        <div className=" text-capitalize ms-4 d-flex flex-column align-items-center">
                        <img src={userMe.avatar} alt="image-profile" className="rounded-pill" style={{width:"80px", height:"80px", objectFit:"cover"}} />
                        <p className="fw-bold fs-6 mb-0">{userMe.name}</p>
                        <p className="fw-bold fs-6 mt-0">{userMe.surname}</p>
                        </div>
                        <Button className="my-3 rounded-pill icon-effect" onClick={()=>{setViewModifica(!viewModifica)}}>
                        <PencilFill/> Modifica Profilo 
                        </Button>
                        <Button className="my-3 rounded-pill icon-effect" >
                          <HeartFill/> Preferiti</Button>
                        <Button className="my-3 rounded-pill icon-effect"><ArchiveFill/> Ordini</Button>
                        <Button className="my-3 rounded-pill icon-effect"><BarChartFill/> Statistiche</Button>
                        <Button className="my-3 rounded-pill icon-effect"><ChatRightFill/> Messaggi</Button>
                        </Col>
                            ):(
                                <Col>
                                Effettua il login o registrati
                                </Col>
                            )}
                    </Row>
                </Col>
 {/*-------------------------------------------------------------------- CONTENT (Right Page)    -----------------------------------------------------------                */}
               
                <Col className="p-0 mt-5">
                {viewModifica &&
                <UserUpdateDetail user={userMe} refresh={handleRefresh}/>
                }
                </Col>
               
            </Row>
            
        </Container>
    )
}
export default UserUpdate