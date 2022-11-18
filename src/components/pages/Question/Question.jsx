import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';

import QuestionCard from '../../molecules/QuestionCard';
import { Container, Contents } from '../Home/styled';
import { DiaryTitle, Name } from '../Today/Today.style';

const Question = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const location = useLocation();

    const token = useSelector((state) => state.auth.token);
    //
    useEffect(() => {
        setLoading(true);
        axios
            .get('/api/v1/qna/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setQuestions([...response.data.results]);

                setLoading(false);
            })
            .catch(async (err) => {
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
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                }
                setLoading(false);
            });
    }, [token]);

    return (
        <Container>
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                    }}
                >
                    <CircularProgress sx={{ margin: '0px auto' }} />
                </div>
            ) : (
                <Contents>
                    <DiaryTitle layoutId={'question'}>
                        <Name>{'Q&A'}</Name>
                    </DiaryTitle>

                    {questions.map((item) =>
                        item.author === location.state.id ? (
                            <QuestionCard
                                key={item.id}
                                data={item.title}
                                id={item.id}
                                isAnswered={item.is_answered}
                                author={item.author}
                            />
                        ) : null
                    )}
                    <div style={{ height: '100px' }}></div>
                </Contents>
            )}
        </Container>
    );
};

export default Question;
