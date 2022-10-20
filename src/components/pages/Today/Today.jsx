import { CircularProgress } from '@mui/material';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Contents } from '../Home/styled';
import {
    ButtonBox,
    DiaryTitle,
    FetchButton,
    Name,
    SortBtn,
} from './Today.style';
import { Calendar } from 'react-calendar';
import { dateActions } from '../../../store/date-slice';
import Day from './components/Day';
import Recommend from './components/Recommend';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    TabBox,
    TabContents,
    TabInput,
    TabTitle,
} from './components/Recommend.styled';
import { groupActions } from '../../../store/group-slice';

const Today = () => {
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const date = useSelector((state) => state.date.date);
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState([true, false, false, false]);
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);
    const [sortByLatest, setSortByLatest] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isOrderChanged, setIsOrderChanged] = useState(false);
    const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const [comment, setComment] = useState('');
    const group = useSelector((state) => state.group.group);

    const fetchData = async (type) => {
        if (!type) {
            setList([]);
            return;
        }
        setIsLoading(true);
        setIsSelected([true, false, false, false]);
        try {
            const response = await axios.get(
                `/api/v1/consumption/admin/sum/?author=${location.state.id}&date=${date}&type=${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setList(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const onChange = async (d) => {
        setOrder([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        setIsOrderChanged((prev) => !prev);
        dispatch(dateActions.updateDate(d.getTime()));
        await fetchData('day');
        await fetchRecommendationData();
    };

    const saveRecommendation = async () => {
        setLoading(true);
        try {
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
            setLoading(false);
            alert('맞춤식품 추천이 완료되었습니다.');
        } catch (err) {
            console.log(err);
            setLoading(false);
            alert('로그인을 다시 해주세요');
        }
    };

    const onDragEnd = ({ destination, source }) => {
        if (!destination) return;
        console.log(source);

        setOrder((prev) => {
            const copy = [...prev];
            const deletedData = copy.splice(source.index, 1);
            copy.splice(destination.index, 0, deletedData[0]);

            return [...copy];
        });

        setIsOrderChanged((prev) => !prev);
    };

    console.log(group);
    useEffect(() => {
        dispatch(groupActions.updateOrder({ newOrder: [...order] }));
    }, [isOrderChanged]);

    const fetchRecommendationData = async () => {
        try {
            const response = await axios.get(
                `/api/v1/recommendation/admin/?user=${location.state.id}&date=${date}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeComment = (e) => {
        setComment(e.target.value);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Contents>
                <DiaryTitle>
                    <Name>{location.state.id}</Name>
                </DiaryTitle>
                <Calendar
                    locale='en-US'
                    onChange={onChange}
                    value={new Date(date)}
                />
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <ButtonBox>
                            <FetchButton
                                onClick={() => {
                                    fetchData('day');
                                }}
                                isClicked={isSelected[0]}
                            >
                                <span>오늘</span>
                            </FetchButton>
                            <FetchButton
                                onClick={() => {
                                    fetchData('week');
                                    setIsSelected([false, true, false, false]);
                                }}
                                isClicked={isSelected[1]}
                            >
                                <span>한 주</span>
                            </FetchButton>
                            <FetchButton
                                onClick={() => {
                                    fetchData('month');
                                    setIsSelected([false, false, true, false]);
                                }}
                                isClicked={isSelected[2]}
                            >
                                <span>한 달</span>
                            </FetchButton>
                            <FetchButton
                                onClick={() => {
                                    fetchData(null);
                                    setIsSelected([false, false, false, true]);
                                }}
                                isClicked={isSelected[3]}
                            >
                                <span>추천</span>
                            </FetchButton>
                        </ButtonBox>

                        {list.length === 0 ? null : (
                            <div
                                style={{
                                    width: '80%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: 20,
                                }}
                            >
                                <SortBtn
                                    onClick={() =>
                                        setSortByLatest((prev) => !prev)
                                    }
                                >
                                    {sortByLatest
                                        ? '오래된 순으로 정렬'
                                        : '최신 순으로 정렬'}
                                </SortBtn>
                            </div>
                        )}
                        {isSelected[3] ? (
                            <Droppable droppableId='recommend'>
                                {(magic) => (
                                    <div
                                        ref={magic.innerRef}
                                        {...magic.droppableProps}
                                        style={{ padding: '30px 0' }}
                                    >
                                        {console.log(order)}
                                        {order.map((idx, index) => (
                                            <Recommend
                                                name={group.data[idx].type}
                                                index={index}
                                                key={group.data[idx].id}
                                            />
                                        ))}
                                        {/* {group.data.map((item, index) => (
                                            <Recommend
                                                name={
                                                    group.data[item.order].type
                                                }
                                                index={index}
                                                key={group.data[item.order].id}
                                            />
                                        ))} */}
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
                        ) : null}

                        {Object.values(list).length > 0 && !sortByLatest
                            ? Object.entries(list).map((item) => (
                                  <Day key={item[0]} item={item} />
                              ))
                            : Object.entries(list)
                                  .slice(0)
                                  .reverse()
                                  .map((item) => (
                                      <Day key={item[0]} item={item} />
                                  ))}
                    </>
                )}
            </Contents>
        </DragDropContext>
    );
};

export default Today;
