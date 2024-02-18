import { useState } from "react";
import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";

function BecomeSeller(){
    const [shopName, setShopName] = useState("");
    const [isChecked, setisChecked] = useState(false);
    const [isShopCreated, setIsShopCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            },4000)
        })
        
    }
    return(
        <Container className="text-center">
            <Row className="d-flex justify-content-center">
                <Col xs={6} >
                    <h3 className="my-5">Benvenuto su Artesum SELLER</h3>
                    <h5 className="my-3">Il nome del tuo negozio è la base del tuo marchio</h5>
                    {!isShopCreated && (
                        <>
                    <h6 className="my-2">Confermi di voler aprire un Negozio?</h6>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheched}
                    />
                    </>
                    )}
                    {isChecked && (
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il nome del negozio"
                            value={shopName}
                            onChange={handleShopName}
                        />
                    )}
                </Col>
            </Row>
            {isChecked && (
                <Row>
                    <Col>
                        <Button variant="primary" onClick={becomeSeller}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : "Conferma"}
                        </Button>
                        {isLoading && <p className="mt-2">Stiamo creando il tuo negozio...</p>}

                    </Col>
                </Row>
                
            )}
            {isShopCreated && (
                <Row className="mt-3 d-flex justify-content-center ">
                    <Col  className="bg-warning py-4 rounded-5" xs={8}>
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