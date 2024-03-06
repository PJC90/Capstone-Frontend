import { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap"
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useNavigate } from "react-router-dom";
// https://naver.github.io/egjs-flicking/

function Category(){
    const [category, setCategory] = useState(null);
    const navigate = useNavigate()

    const getCategory = () => {
        fetch("http://localhost:3010/category?page=0&size=100&order=nameCategory", {
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
            setCategory(data.content);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        getCategory();
    },[]);
    return(
        <div style={{width:"82%", margin:"0 auto"}}>
         
          <Row>
         
            <Col className="mt-5 mb-4">
                <h1 className="fs-4 mt-5 fw-bold mb-0"><span className="border-art">Cerca per categoria</span></h1>
            </Col>
          </Row>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
<Flicking
    align="prev"
    circular={true}
    onMoveEnd={e => {
      console.log(e);
    }}>
        {category && category.map((cat, index) => {
                    return (
                        <div className="panel my-3" key={index}  >
                            <div className="shodow-p mx-2 border border-1" onClick={()=>{navigate(`/category/${cat.categoryId}`)}} style={{cursor:"pointer"}}>
                                <img src={cat.photoCategory} alt={cat.nameCategory} 
                                className=" mb-3 " 
                                style={{ width: '350px', height: '500px', objectFit:"cover" }} />
                                <div className="text-center pb-4 pt-3" >
                                <h5 >{cat.nameCategory}</h5>
                                </div>
                                </div>
                        </div>
                    );
                })}
    
 
  </Flicking>
      </Row>
      </div>
    )
}
export default Category