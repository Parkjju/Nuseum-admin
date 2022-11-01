import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/atom/Header/Header';
import Today from './components/pages/Today/Today';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Analysis from './components/pages/Analysis';
import Preview from './components/pages/Preview';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<Login />} path='/login' />
                <Route element={<Home />} path='/' />
                <Route element={<Today />} path='/:userId' />
                <Route element={<Preview />} path='/:userId/preview' />
                <Route element={<Analysis />} path='/:userId/analysis' />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
