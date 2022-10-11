import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/atom/Header/Header';
import Today from './components/pages/Today/Today';
import Login from './components/pages/Login';
import Home from './components/pages/Home';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<Today />} path='/today' />
                <Route element={<Login />} path='/login' />
                <Route element={<Home />} path='/' />
                <Route element={<Today />} path='/:userId' />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
