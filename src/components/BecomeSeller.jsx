import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import { Airplane } from "react-bootstrap-icons";


// per installare le animazioni https://animate.style/
// $ npm install animate.css --save

function BecomeSeller(){
    const [shopName, setShopName] = useState("");
    const [isChecked, setisChecked] = useState(false);
    const [isShopCreated, setIsShopCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Imposta lo stato per mostrare il componente dopo un breve ritardo
        const timeout = setTimeout(() => setShow(true), 3000); // Ritardo di 500ms
        return () => clearTimeout(timeout);
    }, []);


    const handleShopName = (e) => {
        setShopName(e.target.value);
    }

    const handleCheched = () => {
        setisChecked(!isChecked);
    }

    const payload = {
        shopName: shopName
      }

    const becomeSeller = () => {
        setIsLoading(true); // Attiva lo spinner
        fetch("http://localhost:3010/shop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                Authorization: localStorage.getItem("tokenAdmin")
            },
            body: JSON.stringify(payload)
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Errore nel creare uno Shop")
            }
        })
        .then((data)=>{
            console.log(data)
            setIsShopCreated(true);
            setisChecked(false); 
        })
        .catch((err)=>{
            console.log(err)
        })
        .then(()=>{
            setTimeout(()=>{
                setIsLoading(false)
            },3000)
        })       
    }
    
    return(
        <Container className="mt-5">
            <Row className="d-flex mt-5 ">
                <Col className="mt-5 mb-5 pt-5" xs={5}>
                <img src="/BecomeSeller.png" alt="image-become-seller" className="img-fluid" />
                </Col>
                <Col className="mt-5 mb-5 ms-5 pt-5" >
                    <h2 className="my-5 fw-bold">Benvenuto su Artesum <span className="artesum-color rounded-pill pb-1 px-3 text-white">SELLER</span></h2>
                    {!isShopCreated && (
                        <>
                    <p className="my-4 fs-5">Il nome del tuo negozio è la base del tuo marchio</p>
                    <p className="my-2 mt-4">Confermi di voler aprire un Negozio?</p>
                    <Button variant="dark" className="mt-4 px-5"
                    onClick={()=>{setisChecked(true);handleCheched();}}><img src="/send-fill.svg" alt=""/> Apri Negozio</Button>
                    </>
                    )}
                    {isChecked && (
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il nome del negozio"
                            value={shopName}
                            onChange={handleShopName}
                            className=" px-5 py-3  mt-5"
                        />
                    )}
                    {isLoading && (
                        <div className="d-flex mt-5">
                            <Button variant="dark" className="px-5">
                        <img src="/Gear-gif.svg" alt="gear-spinner" style={{width:"50px", height:"50px"}} />
                        {/* <iframe src="https://giphy.com/embed/Mah9dFWo1WZX0WM62Q" style={{width:"300px", height:"300px"}}></iframe> */}
                        Stiamo creando il tuo negozio...</Button>
                        </div>
                        )}
                    {(isChecked && !isLoading) && (
                        <Button className="a-b-o mt-5 px-5 fs-5 pt-2" onClick={becomeSeller}>
                         <img src="/store.svg" alt="" /> Costruisci il mio Negozio
                        </Button>
                        )}
                    {show && (isShopCreated && !isLoading)&& (  
                        <div  className="text-center shodow-p-nh p-3 rounded-3  py-4 rounded-2 animate__animated animate__zoomInDown w-75" >
                            <img src="/store.svg" alt="" className="artesum-color rounded-3" style={{width:"80px"}}/>
                            <p className="fw-bold fs-3 mb-0"><span className="border-art">{shopName}</span></p>
                            <p className="fs-4">è pronto per decollare.</p>
                            <p className="fs-6">Vai nella sezione profilo ⮕ Gestione Negozio</p>
                            <p className="fs-6">per aggiungere ulteriori dettagli.</p>
                        </div>  
                        )}    
                </Col>
            </Row>
             
            
        </Container>
    )
}
export default BecomeSeller