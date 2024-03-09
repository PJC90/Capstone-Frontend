import { Button } from "react-bootstrap"
import Category from "./Category"
import HeaderContent from "./HeaderContent"
import HeaderContentCarousel from "./HeaderContentCarousel"
import HeaderContentEnd from "./HeaderContentEnd"
import Product from "./Product"
import Shop from "./Shop"
import { ArrowUpCircle, CaretUp, CaretUpFill } from "react-bootstrap-icons"
import { useEffect, useState } from "react"

function Homepage(){
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const yOffset = window.scrollY;
      setIsVisible(yOffset > 2000); // Mostra il pulsante quando lo scroll è maggiore di 2000px
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


    return(
        <>
        <HeaderContent/>
        <HeaderContentCarousel/>
        <Product/>
        <Category/>
        <Shop/>
        <HeaderContentEnd/>
        <Button
                onClick={scrollToTop}
                style={{ 
                    background:"transparent",   
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    display: isVisible ? 'block' : 'none', // Mostra il pulsante solo quando isVisible è true
                    zIndex: 9999,
                }}
                className=" rounded-circle border-0" 
                >
      <ArrowUpCircle className="fs-1 text-dark"/>
    </Button>
        </>
    )
}
export default Homepage