import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Todos from './pages/Todos'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'


function App() {  
	return (
		  <Routes>
				<Route path="/" element={<Home />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/todos" element={<Todos />} />
                </Route>
				<Route path="/*" element={<NotFound />} />
			</Routes>
	);
}

export default App;
