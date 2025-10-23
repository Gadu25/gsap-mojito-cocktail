import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktail";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {

  return (
    <>
      <main>
        <Navbar/>
        <Hero/>
        <Cocktails/>
        {/* <div className="h-dvh bg-black"></div> */}
      </main>
    </>
  )
}

export default App
