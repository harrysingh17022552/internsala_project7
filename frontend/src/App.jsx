import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import myStore from "./redux/Store";
import "./App.css";
import Header from "./CommonComponent/Header";
import Footer from "./CommonComponent/Footer";
function App() {
  return (
    <Provider store={myStore}>
      <main className="w-full flex flex-col">
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </main>
    </Provider>
  );
}

export default App;
