import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Container, Contents } from '../Home/styled';

import postImage from '../../../assets/postComment.png';
import {
    Answer,
    AnswerBox,
    AnswerContent,
    InputComment,
    QuestionBox,
    QuestionContent,
    QuestionTitle,
    Username,
    UtilBtn,
    UtilGroup,
    UtilImg,
} from './QuestionDetail.style';
import { Button } from '../QuestionForm/QuestionForm.style';
import modify from '../../../assets/modifyImg.png';
import deleteImg from '../../../assets/deleteImg.png';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { DiaryTitle, Name } from '../Today/Today.style';

const QuestionDetail = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [answerData, setAnswerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
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
                setAnswerData([...response.data.answerList]);
                setTitle(response.data.question.title);
                setDate(response.data.question.created_at);
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 404) {
                    alert('?????? ????????? ??????????????????.');
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
                    alert('????????? ??????????????????. ??????????????? ??????????????????!');
                }
                setLoading(false);
            });
    }, [isPosted]);

    const deleteComment = (id) => {
        if (window.confirm('????????? ???????????????????')) {
            setLoading(true);
            axios
                .delete(`/api/v1/qna/answer/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    alert('?????? ????????? ?????????????????????!');
                    setLoading(false);
                    setIsPosted((prev) => !prev);
                })
                .catch(async (err) => {
                    if (err.response.data.validation_err) {
                        alert('????????? ????????? ????????? ??? ????????????.');
                        setLoading(false);
                        return;
                    }
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
                        alert('????????? ??????????????????. ??????????????? ??????????????????!');
                    }
                    setLoading(false);
                });
        }
    };
    const onChangeComment = (e) => {
        setComment(e.target.value);
    };
    const deletePost = async () => {
        if (window.confirm('????????? ????????? ??????????????????????')) {
            try {
                await axios.delete(`/api/v1/qna/${param.id}/delete/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('????????? ?????????????????????!');
                navigate('/question');
            } catch (error) {
                console.log(err);
                if (err.response.status === 401) {
                    const { exp, token } = await handleExpired();
                    dispatch(
                        authActions.login({
                            token: token.data.access,
                            exp,
                        })
                    );
                    setLoading(false);
                } else {
                    alert('????????? ??????????????????. ??????????????? ??????????????????!');
                    setLoading(false);
                    return;
                }
            }
        }
    };
    console.log(author);

    const modifyPost = () => {
        if (window.confirm('?????? ????????? ????????????????')) {
            navigate(`/question/post/`, {
                state: { title, content, id: param.id },
            });
        }
    };

    const postComment = async (e) => {
        if (e.keyCode === 13) {
            if (e.target.value === '') {
                return;
            }
            if (window.confirm('????????? ??????????????????????')) {
                setLoading(true);

                try {
                    await axios.post(
                        `/api/v1/qna/${param.id}/answer/`,
                        {
                            content: comment,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } catch (error) {
                    if (err.response.status === 401) {
                        const { exp, token } = await handleExpired();
                        dispatch(
                            authActions.login({
                                token: token.data.access,
                                exp,
                            })
                        );
                    } else {
                        alert('????????? ??????????????????. ??????????????? ??????????????????!');
                    }
                    alert('????????? ??????????????????. ??????????????? ??????????????????!');
                }
                setLoading(false);
                setComment('');
                setIsPosted((prev) => !prev);
            } else {
                return;
            }
        } else {
            return;
        }
    };

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
                    <AnswerBox>
                        {answerData.map((answer) => (
                            <Answer key={answer.id}>
                                <Username>
                                    <span>{answer.author}</span>
                                    <span
                                        style={{
                                            borderBottom: '1px solid black',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => deleteComment(answer.id)}
                                    >
                                        ?????????
                                    </span>
                                </Username>
                                <AnswerContent>{answer.content}</AnswerContent>
                            </Answer>
                        ))}
                    </AnswerBox>
                    <>
                        <InputComment
                            onKeyDown={postComment}
                            placeholder='????????? ???????????????...'
                            value={comment}
                            onChange={onChangeComment}
                        />
                        <div
                            style={{
                                width: '80%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <img
                                src={postImage}
                                alt='post'
                                style={{
                                    width: 23,
                                    position: 'relative',
                                    top: -28,
                                    left: -20,
                                }}
                            />
                        </div>
                    </>

                    <Link to='/question' style={{ textDecoration: 'none' }}>
                        <Button style={{ marginTop: 30 }}>??????</Button>
                    </Link>
                </Contents>
            )}
        </Container>
    );
};

export default QuestionDetail;
