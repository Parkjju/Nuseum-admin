import styled from 'styled-components';
const TagBox = styled.div`
    background-color: #8d8d8d;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
`;
const RecommendTag = ({ text }) => {
    return <TagBox>{text}</TagBox>;
};

export default RecommendTag;
