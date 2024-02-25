import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ProductBySearch(){
    const location = useLocation();
    console.log('OGGETTO LOCATION', location)
    const { searchValue } = location.state ;
    console.log("searchValue:")
    console.log(searchValue)


    return(
        <Container>
            <Row>
{searchValue && searchValue.map((product, i)=>{
    return(
        <Col key={i}>
        <h1>{product.title}</h1>
        </Col>
    )
})}
</Row>
        </Container>
    )
}
export default ProductBySearch