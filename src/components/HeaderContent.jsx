import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function HeaderContent(){
    const navigate = useNavigate();


    return(
        <Container className="mt-4">
        <Row>
            <Col>
            <Card style={{ height: '250px' }} className="bg-header-content-rx text-center border border-0 rounded-5 rounded-end">
                <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                    <Card.Title className="m-0 fs-2 text-content">Vuoi acquistare?</Card.Title>
                    <Card.Text className=" text-content-sec px-5">
                    Non esiste un magazzino artesum, 
                    ma milioni di persone che vendono articoli che amano. 
                    Noi semplifichiamo il processo, 
                    facilitando il contatto diretto con i maker 
                    per trovare qualcosa di straordinario.
                    </Card.Text>
                    <Button className="bg-white icon-effect rounded-pill w-50">Scopri di più</Button>
                </Card.Body>
                </Card>
            </Col>
            <Col>
            <Card style={{ height: '250px' }} className="bg-header-content-sx text-center border border-0 rounded-5 rounded-start">
                <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                    <Card.Title className="m-0 fs-2 text-content ">Vuoi vendere?</Card.Title>
                    <Card.Text className=" text-content-sec px-5">
                    Artesum aiuta le piccole imprese a crescere e svilupparsi.
                    Che tu sia un Maker, un Artista o un Artigiano
                    entra a far parte nella nostra comunity. 
                    Hai a disposizione una piattaforma per caricare e vendere i tuoi prodotti senza costi!
                    </Card.Text>
                    <Button className="bg-white icon-effect rounded-pill w-50" onClick={()=>{navigate("/becomeseller")}}>Inizia a vendere</Button>
                </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>
    )
}
export default HeaderContent