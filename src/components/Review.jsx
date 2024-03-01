import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";

const Review = ({ orderId, productId, shopId, onClose }) => {
    const [show, setShow] = useState(true);
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [showReviewSuccess, setShowReviewSuccess] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [reviewByID, setReviewByID] = useState(null)
    const [reviewId, setReviewId] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)

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
            if (data.reviewId) {
                // Assicurati che la risposta contenga reviewId
                setReviewId(data.reviewId);
                setShowReviewSuccess(true);
            } else {
                throw new Error("L'ID della recensione non è stato restituito dalla risposta del server");
            }
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
                Accept: "application/json",
                Authorization:localStorage.getItem("tokenAdmin")
            },
            body:data
        })
        .then((res)=>{
            if(res.ok){
                console.log("immagine caricata con successo") 
                setImageUploading(false)
            }else{
                throw new Error("Errore nel salvare la foto della recensione" + res.statusText)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getReviewById = (reviewId) => {
        fetch(`http://localhost:3010/review/${reviewId}`,{
            headers:{Authorization:localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel recuperare la recensione dall'ID")
            }
        })
        .then((data)=>{
            console.log("Recensione dall' ID")
            console.log(data)
            setReviewByID(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getReviewById(reviewId)
    },[reviewId, imageUploading])
    
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
            {showReviewSuccess && <Alert className="mt-4" variant="warning">Recensione Salvata!</Alert>}
                </Form>
                </Modal.Body>   

                {reviewByID && 
                <>
                <p className="my-3 d-flex justify-content-center">Carica una foto del prodotto</p>
                <div className="d-flex justify-content-center">
                <img src={reviewByID.photoReview} alt="image-review" style={{width:"200px", height:"200px", objectFit:"cover"}}/>
                </div>
                <div className="my-3 mx-5">
                    <Form
                     onSubmit={(e) => {
                     e.preventDefault();
                     uploadImageReview(reviewId);
                     setImageUploading(true)
                    }} >
                     <div className="d-flex align-items-center flex-column">
                        <Form.Control
                        type="file"
                        size="sm"
                        required
                        onChange={(e)=>{setPhoto(e.target.files)}} style={{width:"270px"}}/>
                        <Button type="submit" className="a-b-o px-4 me-2 mt-3 py-1">{imageUploading ? (<Spinner/>) : ("Upload")}</Button>
                        </div>
                    </Form>   
                </div>
                </>
                }          
        </Modal>
    );
};

export default Review;