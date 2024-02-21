import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, Dropdown, Form, Row, Spinner } from "react-bootstrap"
import { GearFill, PencilSquare, Plus, Trash2Fill, Trash3Fill, TrashFill } from "react-bootstrap-icons"

function ShopUpdateProduct({ shopId }){
const [viewAggiungiInserzione, setViewAggiungiInserzione] = useState(true)    
const [myProduct, setMyProduct] = useState(null)
const [createProduct, setCreateProduct] = useState(false)
const [createProductSuccess, setCreateProductSuccess] = useState(false)
const [singleProduct, setSingleProduct] = useState(false)
const [title, setTitle] = useState(null)
const [category, setCategory] = useState(null)
const [description, setDescription] = useState(null)
const [price, setPrice] = useState(null)
const [tipoProdotto, setTipoProdotto] = useState(null)
const [quantity, setQuantity] = useState(null)
const [categoryArtesum, setCategoryArtsem] = useState([])
const [animation, setAnimation] = useState(null)
const [selectCategory, setSelectCategory] = useState("Seleziona categoria")
const [photo1, setPhoto1] = useState(null)
const [photo1Uploading, setPhoto1Uploading] = useState(false)
const [photo2, setPhoto2] = useState(null)
const [photo2Uploading, setPhoto2Uploading] = useState(false)
const [photo3, setPhoto3] = useState(null)
const [photo3Uploading, setPhoto3Uploading] = useState(false)

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

    const confirmDelete = window.confirm("Sicuro di voler eliminare il prodotto?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3010/product/${productId}`,{
        method: "DELETE",
        headers: {Authorization: localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
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
            setTitle(null)
        }else{
            throw new Error("Errore nel modificare il prodotto")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

const data = new FormData();
if (photo1) {
    data.append("photo1", photo1[0]);
}

const uploadPhoto1 = (productId)=>{
    fetch(`http://localhost:3010/product/${productId}/upload1`,{
        method: "PATCH",
        headers:{
            Authorization: localStorage.getItem("tokenAdmin"),
            Accept: "application/json",
        },
        body: data,
    })
    .then((res)=>{
        if(res.ok){
            console.log("immagine caricata con successo") 
            setPhoto1Uploading(false)           
        }else{
            throw new Error("Errore nel caricare la foto del negozio: " + res.statusText)
        }
    })
    .catch((err)=>{
        console.log("Errore " + err)
    })
}
const data2 = new FormData();
if (photo2) {
    data2.append("photo2", photo2[0]);
}

const uploadPhoto2 = (productId)=>{
    fetch(`http://localhost:3010/product/${productId}/upload2`,{
        method: "PATCH",
        headers:{
            Authorization: localStorage.getItem("tokenAdmin"),
            Accept: "application/json",
        },
        body: data2,
    })
    .then((res)=>{
        if(res.ok){
            console.log("immagine caricata con successo") 
            setPhoto2Uploading(false)           
        }else{
            throw new Error("Errore nel caricare la foto del negozio: " + res.statusText)
        }
    })
    .catch((err)=>{
        console.log("Errore " + err)
    })
}
const data3 = new FormData();
if (photo3) {
    data3.append("photo3", photo3[0]);
}

const uploadPhoto3 = (productId)=>{
    fetch(`http://localhost:3010/product/${productId}/upload3`,{
        method: "PATCH",
        headers:{
            Authorization: localStorage.getItem("tokenAdmin"),
            Accept: "application/json",
        },
        body: data3,
    })
    .then((res)=>{
        if(res.ok){
            console.log("immagine caricata con successo") 
            setPhoto3Uploading(false)           
        }else{
            throw new Error("Errore nel caricare la foto del negozio: " + res.statusText)
        }
    })
    .catch((err)=>{
        console.log("Errore " + err)
    })
}


useEffect(()=>{
    getMyProductInMyShop(shopId)
},[shopId, photo1Uploading])

    return(
        <>
        {viewAggiungiInserzione && 
        <div className="d-flex justify-content-center mt-4 pb-4 border-bottom">
        <Button className="d-flex align-items-center px-5 bg-dark" 
        onClick={()=>{
            setMyProduct(null)
            setCreateProduct(true)
            }}>
            <Plus className="fs-1"/>Aggiungi  inserzione
        </Button>
        </div>
        }
        <Row className="m-5 d-flex justify-content-center">
            <Row>
            <Col className="d-flex flex-wrap">
            {myProduct &&
            myProduct.map((product)=>{
                return(
                    <Card  key={product.productId} className={`mx-4 mb-4 ${animation === product.productId ? `animate__animated animate__backOutDown`:``}`}>
                        <Card.Img variant="top" src={product.photo1} style={{ width: "237px", height:"237px", objectFit:"cover" }}/>
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
                                <GearFill className="fs-4 text-secondary" 
                                onClick={()=>{
                                    getSingleProduct(product.productId); 
                                    setMyProduct(!myProduct);
                                    setViewAggiungiInserzione(!viewAggiungiInserzione)
                                    }}/>
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
                <Row >
                    <Col>
                        <img src={singleProduct.photo1} alt={singleProduct.title} style={{ width: "280px", height:"280px", objectFit:"cover" }}/>
                        <Form className="" 
                        onSubmit={(e) => {
                        e.preventDefault();
                        uploadPhoto1(singleProduct.productId);
                        setPhoto1Uploading(true);}}>
                                   <Form.Control style={{width:"280px"}} className="mt-3" 
                                  type="file"
                                  size="sm"
                                  required
                                 onChange={(e)=>{setPhoto1(e.target.files)}} />
                            <Button type="submit" className="bg-white text-black border border-1 mt-3">{photo1Uploading ? (<Spinner/>) : ("Upload")}</Button>
                            </Form>
                    </Col>
                    <Col>
                        <img src={singleProduct.photo2} alt={singleProduct.title} style={{ width: "280px", height:"280px", objectFit:"cover" }}/>
                        <Form className="" 
                        onSubmit={(e) => {
                        e.preventDefault();
                        uploadPhoto2(singleProduct.productId);
                        setPhoto2Uploading(true);}}>
                                   <Form.Control style={{width:"280px"}} className="mt-3" 
                                  type="file"
                                  size="sm"
                                  required
                                 onChange={(e)=>{setPhoto2(e.target.files)}} />
                            <Button type="submit" className="bg-white text-black border border-1 mt-3">{photo2Uploading ? (<Spinner/>) : ("Upload")}</Button>
                            </Form>
                    </Col>
                    <Col>
                        <img src={singleProduct.photo3} alt={singleProduct.title} style={{ width: "280px", height:"280px", objectFit:"cover" }}/>
                        <Form className="" 
                        onSubmit={(e) => {
                        e.preventDefault();
                        uploadPhoto3(singleProduct.productId);
                        setPhoto3Uploading(true);}}>
                                   <Form.Control style={{width:"280px"}} className="mt-3" 
                                  type="file"
                                  size="sm"
                                  required
                                 onChange={(e)=>{setPhoto3(e.target.files)}} />
                            <Button type="submit" className="bg-white text-black border border-1 mt-3">{photo3Uploading ? (<Spinner/>) : ("Upload")}</Button>
                            </Form>
                    </Col>
                    
                </Row>
                <Row>
                    <Form className="d-flex" 
                         onSubmit={(e)=>{
                        e.preventDefault(); 
                        editProduct(singleProduct.productId)}}>
                    <Col xs={6}>
                        <Form.Group className="mt-3">
                            <Form.Label>Titolo: <span className="fw-bold">{singleProduct.title} </span></Form.Label>
                            <Form.Control placeholder="Modifica il titolo del prodotto"
                            type="text"
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Descrizione: <span className="fw-bold">{singleProduct.description} </span></Form.Label>
                            <Form.Control placeholder="Modifica la descrizione del prodotto"
                            type="text"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mt-3">
                            <Form.Label>Prezzo: € <span className="fw-bold">{singleProduct.price}</span></Form.Label>
                            <Form.Control placeholder="Modifica il prezzo del prodotto"
                            type="number"
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Quantità: <span className="fw-bold">{singleProduct.quantity}</span></Form.Label>
                            <Form.Control placeholder="Modifica la quantità disponibile del prodotto"
                            type="number"
                            value={quantity}
                            onChange={(e)=>{setQuantity(e.target.value)}}
                            />
                        </Form.Group>
                
                        <Form.Group className="mb-3">
                            <Dropdown onClick={()=>{getCategory()}}  onSelect={handleSelectCategory}>
                            <p className="my-3">Modifica la categoria del prodotto:</p>
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
                                <Form.Label>Modifica il tipo di prodotto:</Form.Label>
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
                    <Button type="submit">Conferma Modifica</Button>
                    </Col>
                    </Form>
                </Row>
            </>
            }
            
        </Row>
        </>
    )
}
export default ShopUpdateProduct
