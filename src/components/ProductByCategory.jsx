import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CloudArrowDownFill, CloudArrowUp, ListCheck } from "react-bootstrap-icons";

function ProductByCategory(){
    const { categoryId } = useParams()
    const [productCategory, setProductCategory] = useState([])
    const navigate = useNavigate()


const getProductByCategory = (categoryId) => {
    fetch(`http://localhost:3010/category/${categoryId}`,{
        headers:{Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel ricevere prodotti dalla categoria")
        }
    })
    .then((data)=>{
        setProductCategory(data)
        console.log("Prodotti by Categoria")
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}


useEffect(()=>{
    getProductByCategory(categoryId)
},[categoryId])

    return(
        <Container>
            <Row >
                <Col className="mt-5 d-flex justify-content-between">
                <Button className="icon-effect rounded-pill px-4 d-flex align-items-center border border-black"><ListCheck className="me-2"/> Filtri</Button>
                <Button className="icon-effect rounded-pill px-5 border border-black">Ordina per</Button>
                </Col>
            </Row>
            <Row md={4}>
            {productCategory && productCategory.map((product, i)=>{
                return(
                    
                    <Col key={i} className="d-flex mt-4 flex-column">
                        <img src={product.photo1} alt={"product-logo-" + product.title} onClick={()=>{navigate(`/product/${product.productId}`)}}
                        className="hoover-card py-2 px-2"
                        style={{width:"100%", height:"80%", objectFit:"cover", cursor:"pointer"}} 
                        />
                     <div className="mt-2 ms-2">
                        <p className="m-0">{product.title}</p>
                        <p className="m-0 fw-bold fs-5">€ {product.price}</p>
                        <p className="m-0 text-body-tertiary">{product.shop.shopName}</p>
                        {(product.productType === "DIGITAL") ? 
                        (<p className="m-0  d-flex flex-row align-items-center" style={{fontSize:"0.8em"}}><CloudArrowDownFill className="fs-5 me-1"/> Download digitale</p>) 
                        : ("")}
                        </div>     
                    </Col>
                    
                )
            })}
            </Row>
        </Container>
    )
}

export default ProductByCategory