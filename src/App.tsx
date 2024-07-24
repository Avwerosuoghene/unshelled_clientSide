
import AppRoutes from './App-routes';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router >
      <main className="app" >

        <section>
          <AppRoutes />
        </section>
      </main>
    </Router>

  );
}

export default App;
