import { CircularProgress } from '@mui/material';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Tag, TagBox } from '../../atom/Tag';
import { Contents } from '../Home/styled';
// import { Box, Gauge } from '../Water/Water.style';
import {
    ButtonBox,
    DayBox,
    DayTitle,
    DiaryTitle,
    FetchButton,
    Image,
    ImageBox,
    MealType,
    Name,
    SortBtn,
    Summary,
    SummaryTitle,
    VerticalImageBox,
} from './Today.style';
import { Calendar } from 'react-calendar';
import { dateActions } from '../../../store/date-slice';
import Day from './Day';

const Today = () => {
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const date = useSelector((state) => state.date.date);
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState([true, false, false]);
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);
    const [sortByLatest, setSortByLatest] = useState(true);

    const fetchData = async (type) => {
        setIsLoading(true);
        setIsSelected([true, false, false]);
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
        dispatch(dateActions.updateDate(d.getTime()));
        await fetchData('day');
    };

    // window.onload = () => {
    //     setBoxWidth(boxRef.current.clientWidth);
    // };
    // const boxRef = useRef();
    // const [waterAmount, setWaterAmount] = useState(0);

    const [supplementImages, setSupplementImages] = useState([]);

    return (
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
                            <span>이 날의 섭취 영양소</span>
                            <span>확인하기</span>
                        </FetchButton>
                        <FetchButton
                            onClick={() => {
                                fetchData('week');
                                setIsSelected([false, true, false]);
                            }}
                            isClicked={isSelected[1]}
                        >
                            <span>한 주간 섭취 영양소</span>
                            <span>확인하기</span>
                        </FetchButton>
                        <FetchButton
                            onClick={() => {
                                fetchData('month');
                                setIsSelected([false, false, true]);
                            }}
                            isClicked={isSelected[2]}
                        >
                            <span>한 달간 섭취 영양소</span>
                            <span>확인하기</span>
                        </FetchButton>
                    </ButtonBox>

                    <div
                        style={{
                            width: '80%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 20,
                        }}
                    >
                        <SortBtn
                            onClick={() => setSortByLatest((prev) => !prev)}
                        >
                            {sortByLatest
                                ? '오래된 순으로 정렬'
                                : '최신 순으로 정렬'}
                        </SortBtn>
                    </div>

                    {Object.values(list).length > 0 && !sortByLatest
                        ? Object.entries(list).map((item) => (
                              <Day key={item[0]} item={item} />
                          ))
                        : Object.entries(list)
                              .slice(0)
                              .reverse()
                              .map((item) => <Day key={item[0]} item={item} />)}
                </>
            )}
        </Contents>
    );
};

export default Today;
