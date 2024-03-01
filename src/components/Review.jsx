import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const Review = ({ orderId, productId, shopId, onClose }) => {
    const [show, setShow] = useState(true);
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [showReviewSuccess, setShowReviewSuccess] = useState(false)
    const [photo, setphoto] = useState(null)
    const [reviewId, setReviewId] = useState(null)

    const handleClose = () => {
        setShow(false);
        onClose(); // Chiudi il modale e passa il controllo al componente genitore
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };


    const payload = {
        description: description,
        order_id: orderId,
        product_id: productId,
        shop_id: shopId,
        rating: rating
    }

    const saveReview = () => {
        fetch("http://localhost:3010/review",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:localStorage.getItem("tokenAdmin")
            },
            body:JSON.stringify(payload)
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel salvare la recensione")
            }
        })
        .then((data)=>{
            console.log("Recensione salvata:")
            console.log(data)
            setShowReviewSuccess(true)
            setReviewId(data.reviewId)
            console.log(data.reviewId)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

const data = new FormData()
if(photo){
    data.append("photo", photo[0])
}

    const uploadImageReview = (reviewId) => {
        fetch(`http://localhost:3010/review/${reviewId}/photoreview`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization:localStorage.getItem("tokenAdmin")
            },
            body:data
        })
        .then((res)=>{
            if(res.ok){
                console.log("immagine caricata con successo") 
            }else{
                throw new Error("Errore nel salvare la foto della recensione" + res.statusText)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lascia una recensione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e)=>{e.preventDefault(); saveReview()}}>
                <div className="fs-1 mb-3 text-center">
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    style={{ cursor: 'pointer', color:"#E38F38" }}
                                    onClick={() => handleStarClick(index + 1)}
                                >
                                    {index < rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                    <Form.Group>
                        <Form.Label>Descrizione:</Form.Label>
                        <Form.Control 
                        type="text"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        />
                    </Form.Group>
                    {!reviewId &&
                <Button className="a-b-o px-4 mt-4" type="submit">
                    Invia recensione
                </Button>}
            {showReviewSuccess && <Alert className="mt-2" variant="warning">Recensione Salvata!</Alert>}
                </Form>
                </Modal.Body>                
        </Modal>
    );
};

export default Review;