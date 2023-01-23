import React, {useState} from 'react';
import './Slider.css'
import dataSlider from './dataSlider'
import BtnSlider from './BtnSlider'

export default function Slider(){

    const [slideIndex, setSlideIndex] = useState(1)
    const [slideTimeOut, setSlideTimeOut] = useState(false)


    const LEFT_ARROW_KEY = "ArrowLeft";
    const RIGHT_ARROW_KEY = "ArrowRight";
  
  
    function SliderKey(event){
  
  switch(event.code) 
  {
      case RIGHT_ARROW_KEY:
          nextSlide();
          break;
  
      case LEFT_ARROW_KEY:
          prevSlide();
          break;
          default:
  }
    }
  
    document.addEventListener('keyup', SliderKey);

    const nextSlide = () =>{
        if(slideTimeOut === false){
            setSlideTimeOut(true);
            if(slideIndex !== dataSlider.length){
                setSlideIndex(slideIndex + 1)
            } else if (slideIndex === dataSlider.length){
                setSlideIndex(1)
            }
            setTimeout(() => {
                setSlideTimeOut(false);
            }, 2000)
        }
    }

    const prevSlide = () => {
        if(slideTimeOut === false){
            setSlideTimeOut(true);
            if(slideIndex !== 1){
                setSlideIndex (slideIndex - 1)
            }
            else if (slideIndex === 1){
                setSlideIndex(dataSlider.length)
            }
        setTimeout(() => {
            setSlideTimeOut(false);
        }, 2000)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className='container-slider'>
            {dataSlider.map((obj, index) => {
                return (
                    <div 
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    key={obj.id}
                    >
                        <img 
                        src={process.env.PUBLIC_URL + `/Imgs/${index + 1}.jpg`} alt="" />
                    </div>
                )
            })}

            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>


            <div className="container-dots">
                {Array.from({length: dataSlider.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index +1 ? "dot active" : "dot"}>

                    </div>
                ))}
            </div>
        </div>
    )
}