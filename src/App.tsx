import "./App.css";
import { ThemeContextProvider } from "./shared/context/ThemeProvider";
import { AuthContextProvider } from "./shared/context/AuthProvider";
import Routing from "./shared/components/Routing/Routing";

function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <Routing />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
