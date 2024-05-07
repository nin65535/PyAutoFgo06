import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './appRoutes';
import { BrowserRouter } from 'react-router-dom';
import { WebSocketProvider } from './modules/websocket';

function App() {

  return <WebSocketProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </WebSocketProvider>
}

export default App
