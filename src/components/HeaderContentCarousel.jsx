
import Carousel from "better-react-carousel";
import { Col, Row } from "react-bootstrap"

function HeaderContentCarousel(){

  


    return(
        <div style={{width:"82%", margin:"0 auto"}}>
          <Row>
            <Col className="mt-5"></Col>
          </Row>
          <Row>
            <Col className="mt-5"></Col>
          </Row>
          <Row>
            <Col className="mt-5"></Col>
          </Row>
            {/* PER CREARE MARGINI */}
          <Row >
            <Col className="mt-5 mb-4 pb-5 bg-header-black rounded-top-5">
            <Carousel gap={10}  loop  hideArrow={true} showDots={false} mobileBreakpoint={200} autoplay={5000}>
                      <Carousel.Item >
                       <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Siamo una community che spinge verso cambiamenti positivi</span></h3>
                      </Carousel.Item>
                      <Carousel.Item >
                       <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Artesum sta per Art Ergo Sum</span></h3>
                      </Carousel.Item>
                      <Carousel.Item >
                       <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Artesum dal greco significa Esperto</span></h3>
                      </Carousel.Item>
                      <Carousel.Item>
                      <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Dal Latino invece è una simpatica "storpiatura" del motto Cogito Ergo Sum</span></h3>
                      </Carousel.Item>
                      <Carousel.Item>
                      <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Qui trovi solo prodotti unici, derivati dal genio Italiano!</span> </h3>
                      </Carousel.Item>
                      <Carousel.Item>
                      <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Artesum aiuta i piccoli Artigiani a crescere e svilupparsi.</span> </h3>
                      </Carousel.Item>
                      <Carousel.Item>
                      <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Se sei un Artista o un Creator Digitale questo è il posto giusto per te</span> </h3>
                      </Carousel.Item>
                      <Carousel.Item>
                      <h3 className="text-center text-white fw-bold py-5 px-5"><span className="border-art">Qui puoi vendere e comprare solo prodotti unici</span> </h3>
                      </Carousel.Item>
                    </Carousel>
            </Col>
          </Row>
        </div>
    )
}
export default HeaderContentCarousel