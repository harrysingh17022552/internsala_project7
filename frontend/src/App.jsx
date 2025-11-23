/* eslint-disable react-hooks/set-state-in-effect */
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import myStore from "./redux/Store";
import "./App.css";
import Header from "./CommonComponent/Header";
import Footer from "./CommonComponent/Footer";
import { useEffect, useRef, useState } from "react";
function App() {
  const [messageQueue, setMessageQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const popRef = useRef(null);
  const popDelay = 1000;
  const handleNewMessage = (newMessage) => {
    setMessageQueue((prevQueue) => [...prevQueue, newMessage]);
    if (!isProcessing) {
      setIsProcessing(true);
    }
  };
  useEffect(() => {
    if (isProcessing && messageQueue.length > 0) {
      const currentMessage = messageQueue[0];
      if (popRef.current) {
        popRef.current.textContent = currentMessage;
        popRef.current.style.display = "flex";
      }

      const timerId = setTimeout(() => {
        setMessageQueue((prevQueue) => prevQueue.slice(1));
        if (popRef.current) {
          popRef.current.style.display = "none";
        }
      }, popDelay);
      return () => clearTimeout(timerId);
    } else if (isProcessing && messageQueue.length === 0) {
      setIsProcessing(false);
      if (popRef.current) {
        popRef.current.textContent = "";
      }
    }
  }, [messageQueue, isProcessing]);
  return (
    <Provider store={myStore}>
      <main className="relative w-full flex flex-col">
        <p
          ref={popRef}
          className="hidden fixed w-fit items-center py-1 px-6 rounded-r-xl animate-[fromLeft_0.5s_ease] text-white font-bold z-50 top-0 h-9 bg-[#389b55]"
        ></p>
        <Header />
        <Outlet context={handleNewMessage} />
        {/* <Footer /> */}
      </main>
    </Provider>
  );
}

export default App;
