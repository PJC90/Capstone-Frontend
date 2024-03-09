import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Star } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function HeaderContent(){
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);



    useEffect(() => {
        let lastScrollPosition = window.scrollY;
        let hasScrolledPastThreshold = false;
      
        function handleScroll() {
          const currentScrollPosition = window.scrollY;
          
          if (!hasScrolledPastThreshold && currentScrollPosition >= 1000) {
            hasScrolledPastThreshold = true;
          }
          if (currentScrollPosition === 0) {
            setTimeout(()=>{
                hasScrolledPastThreshold = false;
            })
          }
      
          setIsVisible(lastScrollPosition > currentScrollPosition && currentScrollPosition < 1000 && hasScrolledPastThreshold);
          lastScrollPosition = currentScrollPosition;
        }
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    return(
        <Container fluid className="mb-5 mt-4">
            <Row >
            <Col></Col>
            <Col xs={10} className="mb-5 mt-4 artesum-color rounded-5">
            <Container>
                    <Row className="pt-5 mt-3 mb-5"  >
                        <div className={`mb-4 ${isVisible ? 'animate__animated animate__zoomIn' : ''}`}>
                    <h1 className="d-flex justify-content-center fs-2  text-white">Qui trovi solo prodotti unici, sostieni</h1>
                    <h1 className="d-flex justify-content-center fs-2 mb-5 text-white"> i Maker indipendenti!</h1>
                        </div>
                        <Col className="mt-5 mb-5" style={{position:"relative"}} >
                            <div style={{position:"absolute", bottom:"-320px"}}>
                        <Card style={{ height: '400px' }} className={`header-card text-center rounded-3 ${isVisible ? 'animate__animated animate__fadeInTopLeft' : ''}`}>
                            <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                         <Card.Title><img src="/icon-park-outline_buy.svg" alt="icom-notification" width={100} height={100} className="artesum-color rounded-pill p-3"/></Card.Title>
                                <Card.Title className=" my-3 fs-2 ">Vuoi <span className="artesum-color rounded-pill pb-2 px-3 text-white">acquistare?</span></Card.Title>
                                <Card.Text className=" text-content-sec px-5">
                                Non esiste un magazzino artesum, 
                                ma milioni di persone che vendono articoli che amano. 
                                Noi semplifichiamo il processo, 
                                facilitando il contatto diretto con i maker 
                                per trovare qualcosa di straordinario.
                                </Card.Text>
                                <Button variant="dark" className=" w-50">Scopri di più</Button>
                            </Card.Body>
                            </Card>
                            </div>
                        </Col>
                        <Col xs={1}></Col>
                        <Col className="mt-5 mb-5" style={{position:"relative"}}>
                            <div style={{position:"absolute", bottom:"-320px"}}>
                        <Card style={{ height: '400px' }} className={`header-card text-center rounded-3 ${isVisible ? 'animate__animated animate__fadeInTopRight' : ''}`}>
                            <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                            <Card.Title className="artesum-color rounded-pill"><img src="/icon-sell.svg" alt="icom-notification" width={100} height={100} className="p-4"/></Card.Title>
                                <Card.Title className="my-3 fs-2">Vuoi <span className="bg-dark rounded-pill pb-2 px-3 text-white">vendere?</span></Card.Title>
                                <Card.Text className=" text-content-sec px-5">
                                Artesum aiuta le piccole imprese a crescere e svilupparsi.
                                Che tu sia un Maker, un Artista o un Artigiano
                                entra a far parte nella nostra comunity. 
                                Hai a disposizione una piattaforma per caricare e vendere i tuoi prodotti senza costi!
                                </Card.Text>
                                <Button className="w-50 a-b-o-h py-2" onClick={()=>{navigate("/becomeseller")}}>Inizia a vendere</Button>
                            </Card.Body>
                            </Card>
                            </div>
                        </Col>
                    </Row>
                    </Container>
            </Col>
            <Col></Col>
            </Row>  
        </Container>
    )
}
export default HeaderContent