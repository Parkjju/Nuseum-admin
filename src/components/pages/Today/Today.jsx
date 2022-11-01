import { CircularProgress } from '@mui/material';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useEffect, useState } from 'react';
import handleExpired from '../../../helpers/handleExpired';
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
import { DragDropContext } from 'react-beautiful-dnd';
import { groupActions } from '../../../store/group-slice';
import RecommendTab from './components/RecommendTab';
import { authActions } from '../../../store/auth-slice';

const Today = () => {
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const date = useSelector((state) => state.date.date);
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState([true, false, false, false]);
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);
    const [sortByLatest, setSortByLatest] = useState(true);
    const [isModifying, setIsModifying] = useState(false);

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
            setIsLoading(false);
        }
    };

    const onChange = (d) => {
        dispatch(dateActions.updateDate(d.getTime()));
        dispatch(groupActions.removeAll());
    };

    useEffect(() => {
        fetchData('day');
        fetchRecommendationData();
    }, [date, token]);

    const onDragEnd = ({ destination, source }) => {
        if (!destination) return;
        let sorted = [...group.data].sort(
            (item1, item2) => item1.order - item2.order
        );
        // 재정렬 후 index초기화

        const sourceData = sorted.splice(source.index, 1);
        sorted.splice(destination.index, 0, sourceData[0]);

        // 객체 immutable을 위해 빈 배열 생성
        let emptyArray = [];
        // 카운트 변수로 인덱싱
        let count = 0;

        for (let obj of sorted) {
            let modifiedObject = { ...obj };
            modifiedObject.order = count;
            emptyArray.push(modifiedObject);
            count += 1;
        }
        dispatch(
            groupActions.updateGroup({ sorted: emptyArray, sortNeed: true })
        );
    };

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

            dispatch(groupActions.fetched(response.data.id));

            dispatch(
                groupActions.updateGroup({
                    data: response.data.data.sort(
                        (item1, item2) => item1.order - item2.order
                    ),
                    comment: response.data.comment,
                    hashTag: [...response.data.hashtag.split('#')],
                })
            );
        } catch (err) {
            if (err.response.status === 401) {
                const { exp, token } = await handleExpired();
                dispatch(
                    authActions.login({
                        token: token.data.access,
                        exp,
                    })
                );
            } else if (
                err.response.data.err_msg ===
                '해당 날짜에 입력한 데이터가 없습니다.'
            ) {
                return;
            } else {
                console.log(err);
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
        }
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
                                    onClick={() => {
                                        setIsModifying((prev) => !prev);
                                    }}
                                    isClicked={isModifying}
                                >
                                    추가하기
                                </SortBtn>
                                <SortBtn
                                    onClick={() =>
                                        setSortByLatest((prev) => !prev)
                                    }
                                    isClicked={sortByLatest}
                                >
                                    {sortByLatest ? '오래된 순' : '최신 순'}
                                </SortBtn>
                            </div>
                        )}
                        {isSelected[3] ? (
                            <RecommendTab droppableId='recommend' />
                        ) : null}

                        {Object.values(list).length > 0 && !sortByLatest
                            ? Object.entries(list).map((item) => (
                                  <Day
                                      key={item[0]}
                                      isModify={isModifying}
                                      item={item}
                                      refetchToday={fetchData}
                                  />
                              ))
                            : Object.entries(list)
                                  .slice(0)
                                  .reverse()
                                  .map((item) => (
                                      <Day
                                          key={item[0]}
                                          isModify={isModifying}
                                          item={item}
                                          refetchToday={fetchData}
                                      />
                                  ))}
                    </>
                )}
            </Contents>
        </DragDropContext>
    );
};

export default Today;
