import { useEffect, useRef, useState } from "react";
import { sliderLists } from "../constants";
import type { SliderItem } from "../types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currenCocktail, setCurrentCocktail] = useState<SliderItem | null>(null)

  const goToslide = (index:number) => {
    if (hasNoTarget(index)) {
      return;
    }

    setCurrentIndex(index);
  }

  const hasNoTarget = (index:number) => {
    let slideLength = sliderLists.length;
    return index >= slideLength || index < 0;
  }

  useGSAP(() => {
    gsap.fromTo('#title', 
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1
      }
    );

    gsap.fromTo('.cocktail img', 
      {
        opacity: 0,
        xPercent: -100
      },
      {
        opacity: 1,
        xPercent: 0,
        ease: 'power1.inOut'
      }
    )

    gsap.fromTo('.details h2', 
      {
        opacity: 0,
        yPercent: 20
      },
      {
        opacity: 1,
        yPercent: 0,
        ease: 'power1.inOut'
      }
    )

    gsap.fromTo('.details p', 
      {
        opacity: 0,
        yPercent: 20
      },
      {
        opacity: 1,
        yPercent: 0,
        delay: 0.5,
        ease: 'power1.inOut'
      }
    )

    gsap.timeline({
      scrollTrigger: {
        trigger: '#menu',
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true
      }
    })
    .fromTo('#m-right-leaf', {
      xPercent: 100
    }, {
      xPercent: 0,
      ease: 'power1.inOut'
    })
    .fromTo('#m-left-leaf', {
      yPercent: 100,
      xPercent: -100
    }, {
      yPercent: 0,
      xPercent: 0,
      ease: 'power1.inOut'
    }
    )
  }, [currentIndex])

  useEffect(() => {
    if (!hasNoTarget(currentIndex)) {
      const cocktail = sliderLists[currentIndex]
      setCurrentCocktail(cocktail);
    } else {
      setCurrentCocktail(null);
    }
  }, [currentIndex]);
  
  const getCocktail = (index:number) => {
    return sliderLists[index];
  }

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf"/>
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf"/>

      <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <button 
              key={item.id} 
              className={isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}
              onClick={() => goToslide(index)}
            >
              {item.name}
            </button>
          )
        })}

      </nav>
      <div className="content">
        <div className="arrows">
          <button className={`text-left ${hasNoTarget(currentIndex-1) ? 'opacity-25 cursor-not-allowed': 'opacity-100'}`} onClick={() => goToslide(currentIndex - 1)}>
            <span>{getCocktail(currentIndex - 1)?.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true"/>
          </button>
          <button className={`text-left ${hasNoTarget(currentIndex+1) ? 'opacity-25 cursor-not-allowed': 'opacity-100'}`} onClick={() => goToslide(currentIndex + 1)}>
            <span>{getCocktail(currentIndex + 1)?.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true"/>
          </button>
        </div>

        <div className="cocktail">
          <img src={currenCocktail?.image} className="object-contain"/>
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currenCocktail?.name}</p>
          </div>

          <div className="details">
            <h2>{currenCocktail?.title}</h2>
            <p>{currenCocktail?.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu;