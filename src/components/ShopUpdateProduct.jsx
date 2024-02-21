import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap"
import { GearFill, Plus, Trash2Fill, Trash3Fill, TrashFill } from "react-bootstrap-icons"

function ShopUpdateProduct({ shopId }){
const [myProduct, setMyProduct] = useState(null)
const [createProduct, setCreateProduct] = useState(false)
const [createProductSuccess, setCreateProductSuccess] = useState(false)
const [singleProduct, setSingleProduct] = useState(false)
const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [description, setDescription] = useState("")
const [price, setPrice] = useState("")
const [tipoProdotto, setTipoProdotto] = useState("")
const [quantity, setQuantity] = useState("")
const [categoryArtesum, setCategoryArtsem] = useState([])
const [animation, setAnimation] = useState(null)
const [selectCategory, setSelectCategory] = useState("Seleziona categoria")

const handleSelectCategory = (eventKey) => {
    setSelectCategory(eventKey)
}

const getCategory = () =>{
    fetch("http://localhost:3010/category",{
        headers: {Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel recuperare le categorie")
        }
    })
    .then((data)=>{
        setCategoryArtsem(data)
        console.log("Categorie:")
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
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
const saveProduct = () =>{
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
const deleteProduct = (productId)=>{
    fetch(`http://localhost:3010/product/${productId}`,{
        method: "DELETE",
        headers: {Authorization: localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            confirm("Sicuro di voler eliminare il prodotto?")
            console.log("Prodotto eliminato")
            setAnimation(productId)
        }else{
            throw new Error("Errore nell'eliminare il prodotto")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}
const getSingleProduct = (productId) =>{
    fetch(`http://localhost:3010/product/${productId}`,{
        headers: {Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel recupero del prodotto")
        }
    })
    .then((data)=>{
        setSingleProduct(data)
        console.log("Singolo Prodotto:")
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
const editProduct = (productId) => {
    fetch(`http://localhost:3010/product/${productId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("tokenAdmin")
        },
        body:JSON.stringify(payload)
    })
    .then((res)=>{
        if(res.ok){
            console.log(res)
            console.log(editMyProduct)
        }else{
            throw new Error("Errore nel modificare il prodotto")
        }
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
                    <Card style={{ width: '15rem' }} key={product.productId} className={`mx-4 mb-4 ${animation === product.productId ? `animate__animated animate__backOutDown`:``}`}>
                        <Card.Img variant="top" src={product.photo1} />
                        <Card.Body className="p-0">
                            <div className="p-3">
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>€ {product.price}</Card.Text>
                            <Card.Text>{product.quantity} disponibili</Card.Text>
                            <Card.Text>Creato il {product.dateCreation}</Card.Text>
                            </div>
                            <Card.Text className="border-top p-1 d-flex justify-content-around">
                                <div style={{width:"40px", height:"40px", cursor:"pointer"}} className="d-flex justify-content-center align-items-center icon-effect rounded-pill">
                                <TrashFill className="fs-4 text-secondary "  onClick={()=>{deleteProduct(product.productId)}}/>
                                </div>
                                <div style={{width:"40px", height:"40px", cursor:"pointer"}} className="d-flex justify-content-center align-items-center icon-effect rounded-pill">
                                <GearFill className="fs-4 text-secondary" onClick={()=>{getSingleProduct(product.productId); setMyProduct(!myProduct)}}/>
                                </div>
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
                saveProduct();
                }}>
            <Form.Group className="mb-3" >
                <Form.Label>Titolo del prodotto:</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => { setTitle(e.target.value);}} placeholder="Il titolo deve avere minimo 3 caratteri, massimo 100" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descrizione:</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => { setDescription(e.target.value);}} placeholder="La descrizione deve avere minimo 10 caratteri, massimo 500" />
            </Form.Group>
            <Form.Group className="mb-3 w-25">
                <Form.Label>Prezzo:</Form.Label>
                <Form.Control type="number" value={price} onChange={(e) => {setPrice(e.target.value);}} placeholder="€" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Dropdown onClick={()=>{getCategory()}}  onSelect={handleSelectCategory}>
                    <p>Categoria del prodotto:</p>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-white text-secondary border border-secondary px-4">
                        {selectCategory}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categoryArtesum && categoryArtesum.map((category)=>{
                            return(
                            <Dropdown.Item eventKey={category.nameCategory} key={category.categoryId} onClick={()=>{setCategory(category.categoryId)}}>
                                {category.nameCategory}
                            </Dropdown.Item>
                            )
                        })
                        }
                    </Dropdown.Menu>
                    </Dropdown>
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
            <Form.Group className="mb-3 w-25" >
                <Form.Label>Quantità:</Form.Label>
                <Form.Control type="number" value={quantity} onChange={(e) => {setQuantity(e.target.value);}} placeholder="da 1 a 999" />
            </Form.Group>
            <Button type="submit" className="mt-2 bg-dark text-white border-0">Crea Inserzione</Button>
            </Form>
            {createProductSuccess && <Alert className="my-4">Inserzione creata!</Alert>}
            </Col>
            }
            {singleProduct && 
            <>
                <Row>
                    <Col></Col>
                    <Col><img src={singleProduct.photo1} alt={singleProduct.title} className="w-100"/></Col>
                    <Col><img src={singleProduct.photo2} alt={singleProduct.title} className="w-100"/></Col>
                    <Col><img src={singleProduct.photo3} alt={singleProduct.title} className="w-100"/></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                    <p>{singleProduct.title}</p>
                    <p>{singleProduct.description}</p>
                    <p>{singleProduct.price}</p>
                    <p>{singleProduct.category.categoryId}</p>
                    <p>{singleProduct.productType}</p>
                    <p>{singleProduct.quantity}</p>
                    </Col>
                </Row>
            </>
            }
            
        </Row>
        </>
    )
}
export default ShopUpdateProduct
