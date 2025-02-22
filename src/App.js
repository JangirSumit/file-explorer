import Explorer from "./components/Explorer";
import { DirectoryContextProvider } from "./contexts/DirectoryContext";
import "./styles.css";

export default function App() {
  return (
    <DirectoryContextProvider>
      <div className="App">
        <Explorer />
      </div>
    </DirectoryContextProvider>
  );
}
