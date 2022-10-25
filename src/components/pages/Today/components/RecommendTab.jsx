import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import handleExpired from '../../../../helpers/handleExpired';
import { authActions } from '../../../../store/auth-slice';
import { groupActions } from '../../../../store/group-slice';
import Recommend from './Recommend';
import { TabBox, TabContents, TabInput, TabTitle } from './Recommend.styled';

const RecommendTab = ({ droppableId }) => {
    const group = useSelector((state) => state.group.group);
    const dispatch = useDispatch();
    const [comment, setComment] = useState(group.comment);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const onChangeComment = (e) => {
        setComment(e.target.value);
    };
    const date = useSelector((state) => state.date.date);

    const isFetched = useSelector((state) => state.group.isFetched);

    const saveRecommendation = async () => {
        setLoading(true);
        try {
            if (isFetched) {
                const response = await axios.patch(
                    `/api/v1/recommendation/admin/${isFetched}/`,
                    {
                        data: [...group.data],
                        comment,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
            } else {
                await axios.post(
                    '/api/v1/recommendation/admin/',
                    {
                        target: location.state.id,
                        created_at: `${date}`,
                        data: [...group.data],
                        comment,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            setLoading(false);
            alert('맞춤식품 추천이 완료되었습니다.');
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
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
            setLoading(false);
        }
    };

    return (
        <Droppable droppableId={droppableId}>
            {(magic) => (
                <div
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                    style={{ padding: '30px 0' }}
                >
                    {[...group.data]
                        .sort((item1, item2) => item1.order - item2.order)
                        .map((obj, index) => (
                            <Recommend
                                name={obj.type}
                                index={index}
                                key={obj.id}
                                id={obj.id}
                            />
                        ))}

                    <TabBox
                        style={{
                            cursor: 'default',
                            height: 300,
                            alignItems: 'flex-start',
                        }}
                    >
                        <TabTitle>코멘트</TabTitle>
                        <TabContents>
                            <TabInput
                                as='textarea'
                                rows={2}
                                value={comment}
                                onChange={onChangeComment}
                                style={{
                                    resize: 'none',
                                    height: 280,
                                    padding: 5,
                                    cursor: 'default',
                                    border: '1px solid #EEEEEE',
                                }}
                                placeholder='내용을 작성해주세요'
                            />
                        </TabContents>
                    </TabBox>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <button
                            style={{
                                display: 'block',
                                margin: '0 auto',
                            }}
                            onClick={saveRecommendation}
                        >
                            저장
                        </button>
                    )}
                    {magic.placeholder}
                </div>
            )}
        </Droppable>
    );
};
export default React.memo(RecommendTab);
