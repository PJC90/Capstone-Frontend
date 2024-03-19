import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../redux/actions";
import Confetti from 'react-dom-confetti';

function ProductByCategory(){
    const { categoryId } = useParams()
    const [productCategory, setProductCategory] = useState([])
    const [isHovered, setIsHovered] = useState(null)
    const [showConfetti, setShowConfetti] = useState(null);
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleClick = (productId) => {
      setShowConfetti(productId);
      setTimeout(() => {
          setShowConfetti(null);
      }, 2000);
  };



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
        <div style={{width:"82%", margin:"0 auto"}} className="mb-5">
          
          <Row >
            <Col className="mt-3">
                <h1 className="fs-4 mt-5 mb-5 fw-bold "><span className="border-art">In base alla categoria cercata</span></h1>
            </Col>
          </Row>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {productCategory && productCategory.map((product) => (
            <Col key={product.productId} className=" py-2 px-2">
              <div className="shodow-p p-3 rounded-3" onClick={() => {navigate(`/product/${product.productId}`);}} style={{cursor:"pointer"}}>
                {/* Immagine Prodotto */}
              <div
                style={{
                  position: "relative",
                  width: "100%",   // Imposta la larghezza del contenitore all'immagine
                  paddingBottom: "65%",  // Rapporto d'aspetto 16:9 (9 / 16 * 100)
                  overflow: "hidden",  // Assicura che l'immagine non vada al di fuori del contenitore
                  borderRadius:"7px"
                }}
              >
                <img
                  src={product.photo1}
                  alt={product.title}
                  style={{
                    position: "absolute",
                    width: "100%",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                    height: "100%",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                    objectFit: "cover" , // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                  }}
                  onMouseEnter={()=>{setIsHovered(product.productId)}}
                  onMouseLeave={()=>{setIsHovered(null)}}
                />
                {isHovered === product.productId && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#E38F38",
                    padding: "5px",
                    borderRadius: "50%", // Imposta il bordo a metà della larghezza e altezza
                    width: "40px", // Imposta la larghezza del cerchio
                    height: "40px", // Imposta l'altezza del cerchio
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
             {/*  <FontAwesomeIcon icon={faHeart} size={20} color="black" />  Utilizza l'icona di cuore da FontAwesome */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="icon-effect-heart" viewBox="0 0 24 24" width="20" height="20" fill="#E38F38" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                )}
              </div>
              {/* Contenuto */}
              <div>
                  <Row className="mt-3">
                    <Col xs={8} className="ms-1">
                                  <p className="text-capitalize fs-5 m-0">{product.title.length > 15 ? (product.title.substring(0,15) + "...") : (product.title)}</p>
                                  <h3 className=" fw-bold">{product.price.toFixed(2)} €</h3>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <div className="me-2 a-b-o-r d-flex justify-content-center align-items-center rounded-pill" style={{width:"50px", height:"50px", zIndex:"0"}}
                      onClick={(e)=>{e.stopPropagation(); 
                      dispatch(addToCartAction(product.productId));
                      handleClick(product.productId)
                      }}>
                        <img src="/Cart-Stramb.svg" alt="cart-icon"/>
                      </div>
                      <div style={{zIndex:"100"}}>
                        <Confetti active={showConfetti === product.productId} 
                                  config={{ angle: 90,
                                    spread: "88",
                                    startVelocity: 40,
                                    elementCount: 70,
                                    dragFriction: 0.12,
                                    duration: 990,
                                    stagger: "3",
                                    width: "10px",
                                    height: "10px",
                                    perspective: "808px",
                                    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"] }} />
                     </div>
                    </Col>
                  </Row>
              </div>
              </div>
            </Col>
          ))}
        </Row>
        
      </div>
    )
}

export default ProductByCategory