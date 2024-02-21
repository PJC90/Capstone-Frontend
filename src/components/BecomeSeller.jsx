import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";


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
        <Container className="text-center">
            <Row className="d-flex justify-content-center">
                <Col xs={6} >
                    <h3 className="my-5">Benvenuto su Artesum SELLER</h3>
                    <p className="my-4 fs-3">Il nome del tuo negozio è la base del tuo marchio</p>
                    {!isShopCreated && (
                        <>
                    <p className="my-2">Confermi di voler aprire un Negozio?</p>
                    <Button className="px-5 py-2 my-4 rounded-pill border-0" style={{backgroundColor:"rgb(146, 97, 6)"}}
                    onClick={()=>{setisChecked(true);handleCheched();}}>Apri Negozio</Button>
                    </>
                    )}
                    {isChecked && (
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il nome del negozio"
                            value={shopName}
                            onChange={handleShopName}
                            className="rounded-pill px-5 py-3 border-3 text-info"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    )}
                </Col>
            </Row>
          
                <Row>
                    <Col>
                    {isLoading && (
                        <>
                        <img src="/Gear-gif.svg" alt="gear-spinner"/>
                        {/* <iframe src="https://giphy.com/embed/Mah9dFWo1WZX0WM62Q" style={{width:"300px", height:"300px"}}></iframe> */}
                        <p className="mt-3 fs-3">Stiamo creando il tuo negozio...</p>
                        </>
                        )}
                    {(isChecked && !isLoading) && (
                        <Button className="px-5 py-3 my-5 bg-warning rounded-pill border-0 fs-3 fw-bold" onClick={becomeSeller}>
                         Costruisci il mio Negozio
                        </Button>)}
                    </Col>
                </Row>
             
            {show && (isShopCreated && !isLoading)&& (
                <Row className="mt-3 d-flex justify-content-center ">
                    <Col  className="bg-warning py-4 rounded-5 animate__animated animate__zoomInDown" xs={8}>
                        <h2>Congratulazioni!</h2>
                        <p className="fs-4">Hai appena creato questo negozio:</p>
                        <h1 className="text-white py-4">{shopName}</h1>
                        <p className="fs-4">Continua così!</p>
                        <p className="fs-4">Il tuo negozio è pronto per decollare.</p>
                        <p className="fs-4">Vai nella sezione profilo per aggiungere ulteriori dettagli.</p>
                    </Col>
                </Row>
            )}
        </Container>
    )
}
export default BecomeSeller