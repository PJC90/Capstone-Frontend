import Category from "./Category"
import HeaderContent from "./HeaderContent"
import HeaderContentCarousel from "./HeaderContentCarousel"
import HeaderContentEnd from "./HeaderContentEnd"
import Product from "./Product"
import Shop from "./Shop"

function Homepage(){
    return(
        <>
        <HeaderContent/>
        <HeaderContentCarousel/>
        <Product/>
        <Category/>
        <Shop/>
        <HeaderContentEnd/>
        </>
    )
}
export default Homepage