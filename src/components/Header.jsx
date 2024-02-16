import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"

function Header(){
    const [category, setCategory] = useState(null);

    const getCategory = () => {
        fetch("http://localhost:3010/category", {
            headers:{ Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Errore nel login")
            }
        })
        .then((data)=>{
            console.log(data);
            setCategory(data);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        getCategory();
    },[]);
    return(
        <div className="bg-header">
            <h1 className="d-flex justify-content-center fs-3 p-3">Festeggia la primavera con i prodotti più cool dei piccoli negozi</h1>
        <Container className="py-2">
      <Row className="justify-content-center">
 
      {category && category.slice(0,6).map((cat, index) => {
                    return (
                        <Col xs={6} sm={4} md={2} className="text-center" key={index}>
                            <img src={cat.photoCategory} alt={cat.nameCategory} className="img-fluid rounded-circle mb-2 hoover-card" style={{ width: '120px', height: '120px',cursor: 'pointer' }} />
                            <p className="mb-0">{cat.nameCategory}</p>
                        </Col>
                    );
                })}
      </Row>
    </Container>
    </div>
    )
}
export default Header