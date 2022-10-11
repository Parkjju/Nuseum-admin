import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tag, TagBox } from '../../atom/Tag';
import { Contents } from '../Home/styled';
// import { Box, Gauge } from '../Water/Water.style';
import {
    Image,
    ImageBox,
    Summary,
    SummaryTitle,
    VerticalImageBox,
} from './Today.style';

const Today = ({ date }) => {
    useEffect(() => {
        axios
            .get('https://www.nuseum.site/api/v1/consumption/admin/')
            .then((response) => console.log(response.data));
    }, []);
    // const token = useSelector((state) => state.auth.token);

    // const username = localStorage.getItem('username');
    // const dispatch = useDispatch();

    // const [loading, setLoading] = useState(false);
    // const [foodTag, setFoodTag] = useState([]);
    // const params = useParams();
    // const [supplementInformation, setSupplementInformation] = useState([]);
    // 이미지는 한번에 , 순서없이 나열만 진행
    // const [mealImages, setMealImages] = useState({
    //     breakfast: [],
    //     lunch: [],
    //     dinner: [],
    //     snack: [],
    // });
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
    const [waterAmount, setWaterAmount] = useState(0);

    const [supplementImages, setSupplementImages] = useState([]);

    return false ? (
        <CircularProgress />
    ) : (
        <Contents>
            <VerticalImageBox>
                {/* {Object.values(mealImages).map((arr) =>
                    arr.map((item, index) => (
                        <ImageBox key={index}>
                            <Image src={item.image} />
                        </ImageBox>
                    ))
                )} */}
                {supplementImages.map((item, index) => (
                    <ImageBox key={index}>
                        <Image src={item} />
                    </ImageBox>
                ))}
            </VerticalImageBox>
            <Summary>
                <SummaryTitle>오늘 먹은 음식</SummaryTitle>
                <TagBox
                    style={{ width: '80%', padding: '0px 30px', marginTop: 30 }}
                >
                    {[].map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item.name} ${item.amount}g 또는 ml`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>영양제</SummaryTitle>
                <TagBox style={{ padding: '0px 30px', marginTop: 30 }}>
                    {[].map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item.manufacturer} ${item.name}`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>오늘 섭취한 물의 양</SummaryTitle>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        margin: '30px auto',
                        fontSize: 14,
                    }}
                >
                    <span>마신 양 : {100}ml</span>
                    <span>
                        남은 양 :{' '}
                        {1500 - 100 > 0 ? 1500 - 100 : `+ ${100 - 1500}`}
                        ml
                    </span>
                </div>
                {/* <Box
                    ref={boxRef}
                    style={{
                        width: '90%',
                        margin: '0px auto',
                        paddingBottom: 30,
                    }}
                >
                    <Gauge
                        water={waterAmount}
                        maxWidth={boxWidth}
                        style={{
                            maxWidth: '100%',
                        }}
                    />
                </Box> */}
            </Summary>
        </Contents>
    );
};

export default Today;
