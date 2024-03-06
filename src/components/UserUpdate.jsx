import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { ArchiveFill, BarChartFill, ChatRightFill, HeartFill, PencilFill, XCircleFill } from "react-bootstrap-icons";
import UserUpdateDetail from "./UserUpdateDetail";
import UserOrder from "./UserOrder";
import { useLocation } from "react-router-dom";

function UserUpdate(){
    const location = useLocation()
    const [userMe, setUserMe] = useState(null)
    const [viewModifica, setViewModifica] = useState(false)
    const [viewOrdini, setViewOrdini] = useState(false)
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
const handleViewOrdini = () => {
    if(viewModifica){
        setViewModifica(!viewModifica)
    }
}
const handleViewModifica = () => {
    if(viewOrdini){
        setViewOrdini(!viewOrdini)
    }
}
   
    useEffect(()=>{   
        getMyProfile()
    },[refresh])

    useEffect(()=>{
        // dal componente OrderCompleted vengo trasferito qui se l'utente clicca visualizza tutti gli ordini
        // passo uno stato fittizio su TRUE e quindi poi setto setViewOrdini su true
        const searchParams = new URLSearchParams(location.search);
        const statoViewOrdini = searchParams.get("viewOrdini")
        if(statoViewOrdini === "true"){
            setViewOrdini(true)
        }
    },[location.search])

    return(
        <Container fluid  >
            <Row className="d-flex justify-content-start " >
 {/*-------------------------------------------------------------------- LEFT SIDEBAR ------------------------------------------------------------------------------               */}
                <Col xs={2} className="d-flex flex-column" style={{width:"250px",height:"100vh", boxShadow:"25px 0px 20px -20px rgba(0,0,0,0.1)"}}  >
                    <Row className="mt-5 ms-1" >
                        {userMe ? (
                        <Col className="d-flex flex-column align-items-start mt-5" > 
                        <div className=" text-capitalize ms-4 d-flex flex-column align-items-center">
                        <img src={userMe.avatar} alt="image-profile" className="rounded-pill" style={{width:"80px", height:"80px", objectFit:"cover"}} />
                        <p className="fw-bold fs-6 mb-0 mt-1"><span className="border-art-light">{userMe.name} {userMe.surname}</span></p>
                        </div>
                        <Button className={viewModifica ? "a-b-o-t my-3 pe-4 rounded-end-pill rounded-start-0" : "my-3 rounded-pill icon-effect" } onClick={()=>{handleViewModifica(); setViewModifica(!viewModifica)}}>
                        <PencilFill/> Modifica Profilo 
                        </Button>
                        <Button className="my-3 rounded-pill icon-effect" >
                          <HeartFill/> Preferiti</Button>
                        <Button className={viewOrdini? "a-b-o-t my-3 pe-5 rounded-end-pill rounded-start-0" : "my-3 rounded-pill icon-effect"} onClick={()=>{handleViewOrdini(); setViewOrdini(!viewOrdini)}}>
                            <ArchiveFill/> Ordini
                        </Button>
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
                {viewOrdini &&
                <UserOrder/>
                }
                </Col>
               
            </Row>
            
        </Container>
    )
}
export default UserUpdate