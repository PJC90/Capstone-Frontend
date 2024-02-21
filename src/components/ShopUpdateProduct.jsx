import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap"
import { GearFill, Plus, Trash2Fill, Trash3Fill, TrashFill } from "react-bootstrap-icons"

function ShopUpdateProduct({ shopId }){
const [myProduct, setMyProduct] = useState(null)
const [createProduct, setCreateProduct] = useState(false)
const [createProductSuccess, setCreateProductSuccess] = useState(false)
const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [description, setDescription] = useState("")
const [price, setPrice] = useState("")
const [tipoProdotto, setTipoProdotto] = useState("")
const [quantity, setQuantity] = useState("")

const getMyProductInMyShop = (shopId) => {
    fetch(`http://localhost:3010/shop/${shopId}/products`,{
        headers: {Authorization: localStorage.getItem("tokenAdmin")},
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel recuperare i prodotti del tuoo negozio")
        }
    })
    .then((data)=>{
        setMyProduct(data)
        console.log("Prodotti del mio negozio:")
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
const payload = {
    category_id: category,
    description: description,
    price: price,
    productType: tipoProdotto,
    quantity: quantity,
    shop_id: shopId,
    title: title
}
const updateMyProduct = () =>{
    fetch("http://localhost:3010/product",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:localStorage.getItem("tokenAdmin")},
            body: JSON.stringify(payload)
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel salvare il prodotto")
        }
    })
    .then((data)=>{
        console.log("Prodotto creato")
        console.log(data)
        setCreateProduct(true)
        setCreateProductSuccess(true)
        setCategory("")
            setDescription("")
            setPrice("")
            setTipoProdotto("")
            setQuantity("")
            setTitle("")
        setTimeout(()=>{
            setCreateProductSuccess(false)
        },2500)
    })
    .catch((err)=>{
        console.log(err)
    })
}

useEffect(()=>{
    getMyProductInMyShop(shopId)
},[shopId])

    return(
        <>
        <div className="d-flex justify-content-center mt-4 pb-4 border-bottom">
        <Button className="d-flex align-items-center px-5 bg-dark" 
        onClick={()=>{
            setMyProduct(null)
            setCreateProduct(true)
            }}>
            <Plus className="fs-1"/>Aggiungi  inserzione
        </Button>
        </div>
        <Row className="m-5 d-flex justify-content-center">
            <Row>
            <Col className="d-flex flex-wrap">
            {myProduct &&
            myProduct.map((product)=>{
                return(
           
           <Card style={{ width: '15rem' }} key={product.productId} className="mx-4 mb-4">
            <Card.Img variant="top" src={product.photo1} />
            <Card.Body className="p-0">
                <div className="p-3">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>€ {product.price}</Card.Text>
                <Card.Text>{product.quantity} disponibili</Card.Text>
                <Card.Text>Creato il {product.dateCreation}</Card.Text>
                </div>
                <Card.Text className="border-top p-3 d-flex justify-content-between">
                    <TrashFill className="fs-4" onClick={()=>{}}/>
                    <GearFill className="fs-4"/>
                </Card.Text>
            </Card.Body>
            </Card>
          
            )})
            }
            </Col>
            </Row>
            {createProduct &&
            <Col xs={8} >
            <Form
                onSubmit={(e) => {
                e.preventDefault();
                updateMyProduct();
                }}>
            <Form.Group
                className="mb-3"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}>
                <Form.Label>Titolo del prodotto:</Form.Label>
                <Form.Control type="text" value={title} placeholder="Il titolo deve avere minimo 3 caratteri, massimo 100" />
            </Form.Group>
            <Form.Group
                className="mb-3"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}>
                <Form.Label>Descrizione:</Form.Label>
                <Form.Control type="text" value={description} placeholder="La descrizione deve avere minimo 10 caratteri, massimo 500" />
            </Form.Group>
            <Form.Group
                className="mb-3"
                onChange={(e) => {
                    setPrice(e.target.value);
                }}>
                <Form.Label>Prezzo:</Form.Label>
                <Form.Control type="number" value={price} placeholder="Il prezzo deve essere un numero positivo" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Tipo di prodotto:</Form.Label>
                <div>
                    <Form.Check
                        inline
                        label="PHYSICAL"
                        type="checkbox"
                        id="physical"
                        checked={tipoProdotto === "PHYSICAL"}
                        onChange={() => setTipoProdotto("PHYSICAL")}
                    />
                    <Form.Check
                        inline
                        label="DIGITAL"
                        type="checkbox"
                        id="digital"
                        checked={tipoProdotto === "DIGITAL"}
                        onChange={() => setTipoProdotto("DIGITAL")}
                    />
                </div>
            </Form.Group>
            <Form.Group
                className="mb-3"
                onChange={(e) => {
                    setQuantity(e.target.value);
                }}>
                <Form.Label>Quantità:</Form.Label>
                <Form.Control type="number" value={quantity} placeholder="Inserisci una quantità da 1 a 999." />
            </Form.Group>
            <Form.Group
                className="mb-3"
                onChange={(e) => {
                    setCategory(e.target.value);
                }}>
                <Form.Label>Categoria:</Form.Label>
                <Form.Control type="number" value={category} placeholder="per ora id" />
            </Form.Group>
            <Button type="submit">Crea Inserzione</Button>
            </Form>
            {createProductSuccess && <Alert className="my-4">Inserzione creata!</Alert>}
            </Col>
            }
        </Row>
        </>
    )
}
export default ShopUpdateProduct
