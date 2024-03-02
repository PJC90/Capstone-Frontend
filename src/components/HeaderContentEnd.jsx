import { Card, Col, Container, Row } from "react-bootstrap"


function HeaderContentEnd(){
 


    return(
        <Container fluid className=" mt-5 bg-header ">
            
                    <Row className="pt-5 justify-content-center" >
                        <div className="mb-4">
                    <h1 className="d-flex justify-content-center fs-2  text-white">Cos'è Artesum?</h1>
                        </div>
                        <Col className="mt-5 mb-5 d-flex"  xs={4}>
                           
                        <Card s className="header-card text-center  rounded-3">
                            <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                                <Card.Title className=" mt-3 mb-4 fs-2 ">
                                   <div>Una <span className="bg-dark rounded-pill pb-2 px-3 text-white">Community</span></div> 
                                </Card.Title>
                                <Card.Text className=" text-content-sec px-5">
                                Artesum è un marketplace online globale dove le persone si riuniscono per creare, vendere, 
                                acquistare e collezionare articoli unici. Siamo inoltre una community che spinge verso cambiamenti positivi 
                                per le piccole imprese, le persone, e il pianeta.
                                </Card.Text>
                            
                            </Card.Body>
                            </Card>
                           
                        </Col>
                        <Col xs={1}></Col>
                        <Col className="mt-5 mb-5 d-flex" xs={4}>
                          
                        <Card  className="header-card text-center rounded-3">
                            <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                            <Card.Title className=" mt-3 mb-4 fs-2 ">
                                   <div> <span className="a-b-o rounded-pill pb-2 px-3 text-white"> Art</span> Ergo Sum</div> 
                                </Card.Title>
                                <Card.Text className=" text-content-sec px-5 ">
                                Artesum aiuta le piccole imprese a crescere e svilupparsi.
                                Che tu sia un Maker, un Artista o un Artigiano
                                entra a far parte nella nostra comunity. 
                                Hai a disposizione una piattaforma per caricare e vendere i tuoi prodotti senza costi!
                                </Card.Text>
                            </Card.Body>
                            </Card>
                            
                        </Col>
                    </Row>
              
        </Container>
    )
}
export default HeaderContentEnd