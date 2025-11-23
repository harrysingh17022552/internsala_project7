/* eslint-disable react-hooks/set-state-in-effect */
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import myStore from "./redux/Store";
import "./App.css";
import Header from "./CommonComponent/Header";
import Footer from "./CommonComponent/Footer";
import { useEffect, useRef, useState } from "react";
function App() {
  //States and useEffect to capture screen size, this will help, while making website responsive
  //initially states takes current screen width and height
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  //useEffect that starts on page load and inside there is event listener that triggers whenever resize occurs and set that width and height to the state
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Down below is States and useEffect for message popup feature, here we used array as queue to store messages, and state that manage this process
  const [messageQueue, setMessageQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  //ref to element where this message will be visible
  const popRef = useRef(null);
  const popDelay = 1000;

  //this function handle message whenever any event done like add to cart, delete item, increment and decrement, this generally push message in queue, with base condition that process is off then make it live because there is message in queue.
  const handleNewMessage = (newMessage) => {
    setMessageQueue((prevQueue) => [...prevQueue, newMessage]);
    if (!isProcessing) {
      setIsProcessing(true);
    }
  };

  //useEffect generally makes message visible in interval manner, for which I used setTimeout, It runs when process is running and there is message in queue otherwise if process is on but there is no message in queue then it turn off process
  //useEffect takes place whenever there is changes in message queue or in process switching, this will work as infinite loop until message queue got empty
  useEffect(() => {
    if (isProcessing && messageQueue.length > 0) {
      const currentMessage = messageQueue[0];
      if (popRef.current) {
        popRef.current.textContent = currentMessage;
        popRef.current.style.display = "flex";
      }

      const timerId = setTimeout(() => {
        //delete the current message from queue, when timer finished
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
    //Redux Part : Providing myStore to App component , so that all its Child uses the data store in redux store
    <Provider store={myStore}>
      <main className="relative w-full flex flex-col">
        <p
          ref={popRef}
          className="hidden fixed w-fit items-center py-1 px-6 rounded-r-xl animate-[fromLeft_0.5s_ease] text-white font-bold z-50 top-0 h-9 bg-[#389b55]"
        ></p>
        <Header screenSize={screenSize} />
        {/* render the page as per the url */}
        <Outlet context={handleNewMessage} />
        {/* <Footer /> */}
      </main>
    </Provider>
  );
}

export default App;
