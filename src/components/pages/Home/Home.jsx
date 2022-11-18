import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import Title from '../../atom/Title';
import { AnalysisBtn, Container, Contents, UserTab } from './styled';

const Home = () => {
    const token = useSelector((state) => state.auth.token);
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserList = async () => {
        try {
            const response = await axios.get('/api/v1/consumption/admin/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserList(response.data.userList);
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) {
                const { exp, token } = await handleExpired();
                dispatch(
                    authActions.login({
                        token: token.data.access,
                        exp,
                    })
                );
            } else {
                alert('오류가 발생했습니다. ');
            }
        }
    };

    useEffect(() => {
        if (window.sessionStorage.getItem('isLoggedIn') !== 'true') {
            navigate('/login');
            return;
        }
        fetchUserList();
    }, [token]);
    return (
        <Container>
            <Contents>
                <Title text='회원' />
                {userList.map((item) => (
                    <UserTab
                        state={{
                            id: item.username,
                            userId: item.id,
                        }}
                        to={`./${item.id}`}
                        key={item.id}
                    >
                        {item.username}
                        <div
                            style={{
                                position: 'relative',
                                right: 0,
                                width: 160,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <AnalysisBtn
                                state={{
                                    id: item.username,
                                }}
                                to={`./question`}
                            >
                                Q&A
                            </AnalysisBtn>
                            <AnalysisBtn
                                state={{
                                    id: item.username,
                                }}
                                to={`./${item.id}/analysis`}
                            >
                                분석
                            </AnalysisBtn>
                        </div>
                    </UserTab>
                ))}
            </Contents>
        </Container>
    );
};

export default Home;
