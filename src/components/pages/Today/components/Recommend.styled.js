import styled from 'styled-components';

export const TabBox = styled.div`
    width: 80%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: white;
    height: 84px;
    padding: 20px;
    display: flex;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
`;

export const TabTitle = styled.p`
    width: 46px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
`;

export const TabContents = styled.div`
    min-height: 60px;
    height: auto;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const TabInput = styled.input`
    height: 20px;
    font-size: 13px;
    width: 100%;
    border: 1px solid #bfc5c6;
    &:focus {
        outline: none;
    }
`;
