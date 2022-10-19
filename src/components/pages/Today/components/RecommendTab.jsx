import { useState } from 'react';
import { TabBox, TabContents, TabInput, TabTitle } from './Recommend.styled';
import RecommendTag from './RecommendTag';

const RecommmendTab = () => {
    const [main, setMain] = useState('');
    const [subList, setSubList] = useState([]);
    const [subText, setSubText] = useState('');
    const onChangeMain = (e) => {
        setMain(e.target.value);
    };
    const onChangeSub = (e) => {
        setSubText(e.target.value);
    };
    const onKeyDown = (e) => {
        if (e.keyCode === 188) {
        }
    };
    return (
        <TabBox>
            <TabTitle>과일</TabTitle>
            <TabContents>
                <TabInput
                    value={main}
                    onChange={onChangeMain}
                    placeholder='음식이름 1'
                />
                <TabInput
                    onKeyDown={onKeyDown}
                    onChange={onChangeSub}
                    placeholder='음식이름 2,3,4,5'
                />
                <div
                    style={{
                        display: 'flex',
                        width: 240,
                        flexWrap: 'wrap',
                    }}
                ></div>
            </TabContents>
        </TabBox>
    );
};

export default RecommmendTab;
