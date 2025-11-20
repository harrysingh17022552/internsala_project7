import "./App.css";
import Home from "./Home";
import Header from "./CommonComponent/Header";
import Footer from "./CommonComponent/Footer";
function App() {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <Home />
      <Footer />
    </main>
  );
}

export default App;
