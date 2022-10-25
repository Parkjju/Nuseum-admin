import styled from 'styled-components';

export const TabBox = styled.div`
    width: 90%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: white;
    height: 84px;
    padding: 20px;
    display: flex;
    align-items: center;
    max-width: 460px;
    margin: 0 auto;
    margin-bottom: 30px;
    cursor: pointer;
`;

export const TabTitle = styled.span`
    margin-right: 20px;
    width: 80px;
    text-align: center;
    line-height: 1.5;
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
    border: none;
    border-bottom: 1px solid #bfc5c6;
    &:focus {
        outline: none;
    }
`;

export const SubList = styled.span`
    margin-right: 5px;
    font-size: 12px;
    margin-bottom: 5px;
    &:hover {
        opacity: 0.5;
    }
    cursor: pointer;
`;
