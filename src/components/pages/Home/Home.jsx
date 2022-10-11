import { useSelector } from 'react-redux';
import { Container, Contents } from './styled';

const Home = () => {
    const token = useSelector((state) => state.auth.accessToken);
    console.log(token);
    return (
        <Container>
            <Contents>HI</Contents>
        </Container>
    );
};

export default Home;
