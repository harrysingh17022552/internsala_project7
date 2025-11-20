import { Provider } from "react-redux";
import myStore from "./redux/Store";
import "./App.css";
import Home from "./Home";
import Header from "./CommonComponent/Header";
import Footer from "./CommonComponent/Footer";
function App() {
  return (
    <Provider store={myStore}>
      <main className="w-full flex flex-col">
        <Header />
        <Home />
        <Footer />
      </main>
    </Provider>
  );
}

export default App;
