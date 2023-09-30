import { DataProvider } from "./context";
import "./App.css";
import Header from "./sections/header";
import MainSection from "./sections/mainSection";

function App() {
  return (
    <DataProvider>
      <div>
        <Header />
        <MainSection />
      </div>
    </DataProvider>
  );
}

export default App;
