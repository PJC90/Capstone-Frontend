import Category from "./Category"
import HeaderContent from "./HeaderContent"
import HeaderContentEnd from "./HeaderContentEnd"
import Product from "./Product"
import Shop from "./Shop"

function Homepage(){
    return(
        <>
        <HeaderContent/>
        <Product/>
        <Category/>
        <Shop/>
        <HeaderContentEnd/>
        </>
    )
}
export default Homepage