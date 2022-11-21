import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    QuestionBox,
    QuestionContent,
    QuestionTitle,
} from './QuestionDetail.style';
import { Button } from '../QuestionForm/QuestionForm.style';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { Container, Contents } from '../Home/styled';
import { DiaryTitle, Name } from '../Today/Today.style';

const QuestionDetail = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(false);

    const [isPosted, setIsPosted] = useState(false);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    const param = useParams();
    const token = useSelector((state) => state.auth.token);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/v1/qna/${param.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAuthor(response.data.question.author);
                setContent(response.data.question.content);

                setTitle(response.data.question.title);
                setDate(response.data.question.created_at);
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 404) {
                    alert('이미 삭제된 게시물입니다.');
                    navigate('/question');
                    return;
                }
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
    }, [isPosted]);

    return (
        <Container>
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <CircularProgress sx={{ margin: '0px auto' }} />
                </div>
            ) : (
                <Contents>
                    <DiaryTitle layoutId={'question'}>
                        <Name style={{ marginBottom: 10 }}>{author}</Name>
                        <Name>{date?.split('T')[0]}</Name>
                    </DiaryTitle>
                    <QuestionBox>
                        <QuestionTitle>
                            <span style={{ marginRight: 5, fontSize: 16 }}>
                                Q.
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>
                                {title}
                            </span>
                        </QuestionTitle>
                        <QuestionContent>{content}</QuestionContent>
                    </QuestionBox>

                    <Link to={-1} style={{ textDecoration: 'none' }}>
                        <Button style={{ marginTop: 30 }}>목록</Button>
                    </Link>
                </Contents>
            )}
        </Container>
    );
};

export default QuestionDetail;
