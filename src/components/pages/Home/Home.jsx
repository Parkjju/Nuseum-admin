import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../atom/Title';
import { AnalysisBtn, Container, Contents, UserTab } from './styled';

const Home = () => {
    const token = useSelector((state) => state.auth.token);
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const fetchUserList = async () => {
        try {
            const response = await axios.get(
                'https://www.nuseum.site/api/v1/consumption/admin/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUserList(response.data.userList);
        } catch (error) {
            alert('오류가 발생했습니다');
        }
    };

    useEffect(() => {
        if (window.sessionStorage.getItem('isLoggedIn') !== 'true') {
            navigate('/login');
            return;
        }
        fetchUserList();
    }, []);
    return (
        <Container>
            <Contents>
                <Title text='회원' />
                {userList.map((item) => (
                    <UserTab
                        state={{
                            id: item.username,
                        }}
                        to={`./${item.id}`}
                        key={item.id}
                    >
                        {item.username}
                        <AnalysisBtn
                            state={{
                                id: item.username,
                            }}
                            to={`./${item.id}/analysis`}
                        >
                            분석
                        </AnalysisBtn>
                    </UserTab>
                ))}
            </Contents>
        </Container>
    );
};

export default Home;
