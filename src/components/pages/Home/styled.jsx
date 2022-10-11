import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled.img`
    height: 200px;
`;

export const Contents = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Container = styled.div`
    margin: 0 auto;
    padding-top: 40px;
    min-height: 600px;
`;

export const UserTab = styled(Link)`
    width: 80%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    border-bottom: 1px solid black;
    max-width: 480px;
    color: black;
    &:hover {
        opacity: 0.8;
        transition: 0.1s linear;
        cursor: pointer;
    }
    &:visited {
        color: black;
    }
    text-decoration: none;
`;

export const AnalysisBtn = styled(Link)`
    height: 32px;
    width: 68px;
    background-color: #e3e3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
    border-radius: 100px;
    cursor: pointer;
    border: none;
    &:active {
        opacity: 0.8;
        transition: 0.1s linear;
    }
`;
