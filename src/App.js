import './App.css';
import { ChatBot } from './components/ChatBot/ChatBot';
import { AllRoutes } from './routes/AllRoutes';
import { useTheme } from "./context/theme-context";
import { Footer, Header } from './components';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  const { darkMode } = useTheme();
  const location = useLocation();
  const noHeaderRoutes = ['/books/edit', '/register', '/login'];
  const noFooterRoutes = ['/books/edit'];

const hideHeader = noHeaderRoutes.some((route) => location.pathname.startsWith(route));
const hideFooter = noFooterRoutes.some((route) => location.pathname.startsWith(route));
  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="flex-grow-1">
        <AllRoutes />
      </div>
      {/* <ChatBot /> */}
     {!hideFooter && <Footer />}
    </div>
  )
}

export default App;
