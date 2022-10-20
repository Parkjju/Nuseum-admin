import styled from 'styled-components';

export const VerticalImageBox = styled.div`
    box-sizing: border-box;
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media all and (max-width: 480px) {
        width: 85%;
    }
`;
export const ImageBox = styled.div`
    width: 90%;
    margin-right: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;

export const DataBox = styled.div`
    width: 80%;
    height: auto;
    background-color: black;
`;

export const Summary = styled.div`
    width: 100%;
    height: auto;
    padding-top: 20px;
    margin-bottom: 20px;
    @media all and (max-width: 480px) {
        width: 90%;
    }
`;

export const SummaryTitle = styled.p`
    width: 100%;
    text-align: center;
    font-size: 14px;
    text-decoration: 1px solid #7f8c8d underline;
`;

export const DiaryTitle = styled.div`
    padding: 10px 0;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* &:hover {
        background-color: #ecf0f1;
        transition: 0.2s linear;
    } */
    span {
        font-size: 16px;
    }
`;
export const Name = styled.span`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
`;

export const ButtonBox = styled.div`
    display: flex;
    padding-top: 50px;
    justify-content: space-between;
    width: 85%;
    @media all and (max-width: 480px) {
        width: 90%;
    }
    @media all and (max-width: 389px) {
        width: 97%;
    }
`;
export const FetchButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isClicked ? '#8D8D8D' : '#f1f1f1')};
    border-radius: 80px;
    color: ${(props) => (props.isClicked ? 'white' : 'black')};
    width: 25%;
    padding: 10px 3px;
    font-size: 8px;
    border: none;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.isClicked ? '0px 3px 3px rgba(0, 0, 0, 0.2)' : 'none'};
    span {
        font-size: 12px;
        @media all and (max-width: 480px) {
            font-size: 11px;
        }
        @media all and (max-width: 389px) {
            font-size: 10px;
        }
    }
`;

export const DayBox = styled.div`
    width: 80%;
    height: auto;
    padding: 20px;
    border: 1px solid #7f8c8d;
    border-radius: 10px;
    margin: 20px 0;
`;

export const DayTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    text-align: center;
`;

export const MealType = styled(DayTitle)`
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
`;

export const SortBtn = styled.button`
    background-color: #f1f1f1;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    padding: 8px;
    font-size: 12px;
`;

export const TagBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
`;

export const Tag = styled.div`
    border-radius: 8px;
    font-size: 14px;
    padding: 8px;
    background-color: #7f8c8d;
    color: white;
    margin-right: 5px;
    margin-bottom: 5px;
`;

export const Gauge = styled.div`
    height: 50px;
    width: ${(props) =>
        props.water <= 1500
            ? (props.water / 1500) * props.maxWidth
            : props.maxWidth}px;
    background-color: #7f8c8d;
    border-radius: 20px;
`;

export const Box = styled.div`
    width: 80%;
    height: 50px;
`;
