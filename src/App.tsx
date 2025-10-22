import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  useGSAP(() => {
    gsap.fromTo('.test', {
      y: 20,
      opacity: 0
    },{
      y: 0,
      opacity: 1,
      ease: 'power1.out',
      duration: 1,
      stagger: 0.2
    })
  }, []);

  return (
    <>
      <div className="flex-center h-[100vh]">
        <h1 className='test text-gray-400'>Hello World</h1>
      </div>
    </>
  )
}

export default App
