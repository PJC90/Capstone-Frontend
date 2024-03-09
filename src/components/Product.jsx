import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import { Cart, Heart } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function Product(){
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Pagina corrente
    const [totalPages, setTotalPages] = useState(0); // Numero totale di pagine
    const [isHovered, setIsHovered] = useState(null)
    const navigate = useNavigate();

    const getProduct = (page = 0, size = 10, order = 'dateCreation')=>{
        fetch(`http://localhost:3010/product?page=${page}&size=${size}&order=${order}`,{
            headers:{Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Errore nel login")
            }
        })
        .then((data)=>{
            console.log("Prodotti:")
            console.log(data);
            setVisibleProducts(data.content);
            setTotalPages(data.totalPages)
        })
        .catch((err)=>{
            console.log(err);

        })
    }

    const goToPage = (page) => {
      setCurrentPage(page);
      getProduct(page); // Recupera i dati per la pagina selezionata
  }

  // Genera i pulsanti della paginazione
  const paginationButtons = [];
  for (let i = 0; i < totalPages; i++) {
      paginationButtons.push(
          <Button key={i} onClick={() => goToPage(i)} className={`mx-1 icon-effect rounded-pill ${currentPage === i ? "icon-effect-active" : ""}`}>
              {i + 1}
          </Button>
      );
  }



useEffect(()=>{
    getProduct(0);
},[])
    
    return(
        <div style={{width:"82%", margin:"0 auto"}}>
          
            {/* PER CREARE MARGINI */}
          <Row>
            <Col className="mt-4 mb-4">
                <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">{visibleProducts && visibleProducts.length > 0 ? "Prodotti più venduti" : ""}</span></h1>
            </Col>
          </Row>
        <Row xs={1} md={2} lg={3} xl={5} className="g-4">
          {visibleProducts && visibleProducts.map((product) => (
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
                  <Row className="mt-3 d-flex align-items-center">
                    <Col xs={8} className="ms-1">
                        <p className="text-capitalize fs-5 m-0">{product.title.length > 15 ? (product.title.substring(0,15) + "...") : (product.title)}</p>
                        <h3 className="ms-1 fw-bold">{product.price.toFixed(2)} €</h3>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <div className="me-2 a-b-o d-flex justify-content-center align-items-center rounded-pill" style={{width:"50px", height:"50px"}}>
                        <img src="/Cart-Stramb.svg" alt="cart-icon"/>
                      </div>
                    </Col>
                  </Row>
              </div>
              </div>
            </Col>
          ))}
        </Row>
        {/* Mostra i pulsanti della paginazione */}
        <Row>
          <Col className="d-flex justify-content-end mt-4">
            {paginationButtons}
          </Col>
        </Row>
      </div>
      
    )
}
export default Product