import { Col, Container, Row } from "react-bootstrap";
import { Facebook, Instagram, Pinterest, Twitch, Twitter, Youtube } from "react-bootstrap-icons";

function FooterArtesum(){
    
    return(
        <Container fluid className="text-center border-top" style={{boxShadow: "0px -4px 10px 0px rgba(0,0,0,0.05), 0px 3px 20px 0px rgba(0,0,0,0.1)"}}>
                <Row className="mt-5 mb-5">
                    <Col>
                        <Instagram className="mx-2"/>
                        <Facebook className="mx-2"/>
                        <Pinterest className="mx-2"/>
                        <Twitter className="mx-2"/>
                        <Youtube className="mx-2"/>
                        <Twitch className="mx-2"/>
                    </Col>
                </Row>
                <div className="pb-3">© {new Date().getFullYear()} Artesum</div>
        </Container>
    )
}
export default FooterArtesum