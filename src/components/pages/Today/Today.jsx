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
                alert('????????? ??????????????????. ??????????????? ??????????????????!');
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
        // ????????? ??? index?????????

        const sourceData = sorted.splice(source.index, 1);
        sorted.splice(destination.index, 0, sourceData[0]);

        // ?????? immutable??? ?????? ??? ?????? ??????
        let emptyArray = [];
        // ????????? ????????? ?????????
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
                '?????? ????????? ????????? ???????????? ????????????.'
            ) {
                return;
            } else {
                console.log(err);
                alert('????????? ??????????????????. ??????????????? ??????????????????!');
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
                                <span>??????</span>
                            </FetchButton>
                            <FetchButton
                                onClick={() => {
                                    fetchData('week');
                                    setIsSelected([false, true, false, false]);
                                }}
                                isClicked={isSelected[1]}
                            >
                                <span>??? ???</span>
                            </FetchButton>
                            <FetchButton
                                onClick={() => {
                                    fetchData('month');
                                    setIsSelected([false, false, true, false]);
                                }}
                                isClicked={isSelected[2]}
                            >
                                <span>??? ???</span>
                            </FetchButton>
                            <FetchButton
                                onClick={() => {
                                    fetchData(null);
                                    setIsSelected([false, false, false, true]);
                                }}
                                isClicked={isSelected[3]}
                            >
                                <span>??????</span>
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
                                        fetchData('day');
                                    }}
                                    isClicked={isModifying}
                                >
                                    ????????????
                                </SortBtn>
                                <SortBtn
                                    onClick={() =>
                                        setSortByLatest((prev) => !prev)
                                    }
                                    isClicked={sortByLatest}
                                >
                                    {sortByLatest ? '????????? ???' : '?????? ???'}
                                </SortBtn>
                            </div>
                        )}
                        {isSelected[3] ? (
                            <RecommendTab droppableId='recommend' />
                        ) : null}
                        {console.log(
                            Object.values(list).forEach((item) =>
                                Object.values(item).forEach((obj) => {
                                    let arr = [];

                                    obj?.data?.forEach((elem) => {
                                        arr.push(
                                            `${elem.name}` +
                                                `${
                                                    elem.amount > 0
                                                        ? ` ${elem.amount}` +
                                                          'g'
                                                        : ''
                                                }`
                                        );
                                    });

                                    console.log(arr.join(' / '));
                                })
                            )
                        )}

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
