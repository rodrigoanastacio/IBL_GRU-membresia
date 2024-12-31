import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { GlobalDatePickerStyles } from './components/DatePicker/styles';
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalDatePickerStyles />
      <Router />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
