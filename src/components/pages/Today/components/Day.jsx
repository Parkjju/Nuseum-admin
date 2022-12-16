import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    DayBox,
    DayTitle,
    Gauge,
    Image,
    ImageBox,
    MealType,
    Summary,
    Tag,
    TagBox,
    VerticalImageBox,
} from '../Today.style';
import DayModify from './DayModify';

const Day = ({ item, isModify, refetchToday }) => {
    const token = useSelector((state) => state.auth.token);

    const [boxWidth, setBoxWidth] = useState(
        window.innerWidth > 800 ? 800 * 0.8 : window.innerWidth * 0.8
    );
    window.onresize = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    window.onload = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };
    const boxRef = useRef();

    const requestFetchOnDayComponent = (meal) => {
        if (window.confirm('입력된 음식 중량을 수정할까요?')) {
            const inputData = window.prompt('수정할 중량값을 입력하세요.');
            if (Number(inputData) === 0) {
                return;
            }

            axios
                .patch(
                    `/api/v1/consumption/food/${meal.id}/`,
                    {
                        amount: Number(inputData),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    alert('수정이 완료되었습니다!');
                    refetchToday('day');
                })
                .catch((err) => {
                    console.log(err);
                    alert('오류가 발생하였습니다!');
                });
        }
    };

    return (
        <DayBox key={item[0]}>
            {isModify ? (
                <DayModify />
            ) : (
                <>
                    <DayTitle>{item[0]}</DayTitle>

                    <Summary>
                        <>
                            <MealType>아침</MealType>

                            {item[1].breakfast.image.length === 0 &&
                            item[1].breakfast.data.length === 0 ? (
                                <TagBox>
                                    <Tag
                                        style={{
                                            opacity: 0.5,
                                        }}
                                    >
                                        입력된 데이터가 없습니다
                                    </Tag>
                                </TagBox>
                            ) : null}
                            <VerticalImageBox>
                                {item[1].breakfast.image.map((imageObject) => (
                                    <ImageBox key={imageObject.id}>
                                        <Image src={imageObject.image} />
                                    </ImageBox>
                                ))}
                            </VerticalImageBox>
                            <TagBox>
                                {item[1].breakfast.data.map((meal, index) => (
                                    <Tag
                                        key={index}
                                    >{`${meal.name} ${meal.amount}g 또는 ml`}</Tag>
                                ))}
                            </TagBox>
                            <MealType>점심</MealType>
                            {item[1].lunch.image.length === 0 &&
                            item[1].lunch.data.length === 0 ? (
                                <TagBox>
                                    <Tag
                                        style={{
                                            opacity: 0.5,
                                        }}
                                    >
                                        입력된 데이터가 없습니다
                                    </Tag>
                                </TagBox>
                            ) : null}
                            <VerticalImageBox>
                                {item[1].lunch.image.map((imageObject) => (
                                    <ImageBox key={imageObject.id}>
                                        <Image src={imageObject.image} />
                                    </ImageBox>
                                ))}
                            </VerticalImageBox>
                            <TagBox>
                                {item[1].lunch.data.map((meal, index) => (
                                    <Tag
                                        key={index}
                                    >{`${meal.name} ${meal.amount}g 또는 ml`}</Tag>
                                ))}
                            </TagBox>
                            <MealType>저녁</MealType>
                            {item[1].dinner.image.length === 0 &&
                            item[1].dinner.data.length === 0 ? (
                                <TagBox>
                                    <Tag
                                        style={{
                                            opacity: 0.5,
                                        }}
                                    >
                                        입력된 데이터가 없습니다
                                    </Tag>
                                </TagBox>
                            ) : null}
                            <VerticalImageBox>
                                {item[1].dinner.image.map((imageObject) => (
                                    <ImageBox key={imageObject.id}>
                                        <Image src={imageObject.image} />
                                    </ImageBox>
                                ))}
                            </VerticalImageBox>
                            <TagBox>
                                {item[1].dinner.data.map((meal, index) => (
                                    <Tag
                                        key={index}
                                    >{`${meal.name} ${meal.amount}g 또는 ml`}</Tag>
                                ))}
                            </TagBox>

                            <MealType>간식</MealType>
                            {item[1].snack.image.length === 0 &&
                            item[1].snack.data.length === 0 ? (
                                <TagBox>
                                    <Tag
                                        style={{
                                            opacity: 0.5,
                                        }}
                                    >
                                        입력된 데이터가 없습니다
                                    </Tag>
                                </TagBox>
                            ) : null}
                            <VerticalImageBox>
                                {item[1].snack.image.map((imageObject) => (
                                    <ImageBox key={imageObject.id}>
                                        <Image src={imageObject.image} />
                                    </ImageBox>
                                ))}
                            </VerticalImageBox>
                            <TagBox>
                                {item[1].snack.data.map((meal, index) => (
                                    <Tag
                                        key={index}
                                    >{`${meal.name} ${meal.amount}g 또는 ml`}</Tag>
                                ))}
                            </TagBox>
                        </>

                        <>
                            <MealType>영양제</MealType>
                            <TagBox>
                                <VerticalImageBox>
                                    {item[1].supplement.map(
                                        (supplementObject) => (
                                            <ImageBox key={supplementObject.id}>
                                                <Image
                                                    src={supplementObject.image}
                                                />
                                            </ImageBox>
                                        )
                                    )}
                                </VerticalImageBox>
                                {item[1].supplement.map((supplementObject) => (
                                    <Tag
                                        key={supplementObject.id}
                                    >{`(${supplementObject.manufacturer}) ${supplementObject.name}`}</Tag>
                                ))}
                            </TagBox>
                        </>

                        <>
                            <MealType>오늘 섭취한 물의 양</MealType>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '90%',
                                    margin: '30px auto',
                                    fontSize: 14,
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>
                                    마신 양 : {item[1].water}ml
                                </span>
                                <span style={{ fontWeight: 'bold' }}>
                                    남은 양 :{' '}
                                    {1500 - item[1].water > 0
                                        ? 1500 - item[1].water
                                        : `+ ${item[1].water - 1500}`}
                                    ml
                                </span>
                            </div>

                            <Box
                                ref={boxRef}
                                style={{
                                    width: '90%',
                                    margin: '0px auto',
                                    paddingBottom: 30,
                                }}
                            >
                                <Gauge
                                    water={item[1].water}
                                    maxWidth={boxWidth}
                                    style={{
                                        maxWidth: '100%',
                                    }}
                                />
                            </Box>
                        </>
                    </Summary>
                </>
            )}
        </DayBox>
    );
};

export default Day;
