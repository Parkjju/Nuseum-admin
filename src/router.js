import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/atom/Header/Header';
import Today from './components/pages/Today/Today';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Analysis from './components/pages/Analysis';
import Preview from './components/pages/Preview';
import Question from './components/pages/Question/Question';
import QuestionDetail from './components/pages/QuestionDetail';

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
                <Route element={<Question />} path='/question' />
                <Route element={<QuestionDetail />} path='/question/:id' />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
