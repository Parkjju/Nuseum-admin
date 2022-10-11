import axios from 'axios';
import { Helmet } from 'react-helmet';
import { GlobalStyle } from './components/atom/Global';
import { Container, Contents } from './components/pages/Home/styled';
import Today from './components/pages/Today/Today';
import Router from './router';

axios.defaults.baseURL = 'https://www.nuseum.site';
axios.defaults.withCredentials = true;

function App() {
    return (
        <>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400;500;600;700;900&display=swap'
                    rel='stylesheet'
                />
            </Helmet>
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
