import styled from 'styled-components';

export const ModalSearch = styled.div`
    width: 90%;
    padding-right: 10px;
    height: 30px;
    padding-left: 10px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

export const ModalInput = styled.input`
    border: none;
    &:focus {
        border: none;
        outline: none;
    }
    width: 100%;
    font-size: 16px;
    background-color: transparent;
`;
