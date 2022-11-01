import { useState } from 'react';
import { Radio, RadioBox, RadioLabel, RadioWrapper } from './DayModify.styled';
import Search from './Search';

const DayModify = () => {
    const [type, setType] = useState([true, false, false, false]);
    const onChangeType = (e) => {
        switch (e.target.value) {
            case 'morning':
                setType([true, false, false, false]);
                break;
            case 'lunch':
                setType([false, true, false, false]);
                break;
            case 'dinner':
                setType([false, false, true, false]);
                break;
            case 'snack':
                setType([false, false, false, true]);
                break;
            default:
                break;
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <RadioBox onChange={onChangeType}>
                <RadioWrapper>
                    <Radio
                        checked={type[0]}
                        value='morning'
                        name='modify'
                        type='radio'
                        id='morning'
                    />
                    <RadioLabel for='morning'>아침</RadioLabel>
                </RadioWrapper>
                <RadioWrapper>
                    <Radio
                        checked={type[1]}
                        name='modify'
                        type='radio'
                        id='lunch'
                        value='lunch'
                    />
                    <RadioLabel for='lunch'>점심</RadioLabel>
                </RadioWrapper>
                <RadioWrapper>
                    <Radio
                        checked={type[2]}
                        name='modify'
                        type='radio'
                        id='dinner'
                        value='dinner'
                    />
                    <RadioLabel>저녁</RadioLabel>
                </RadioWrapper>
                <RadioWrapper>
                    <Radio
                        checked={type[3]}
                        name='modify'
                        type='radio'
                        id='snack'
                        value='snack'
                    />
                    <RadioLabel>간식</RadioLabel>
                </RadioWrapper>
            </RadioBox>
            <Search />
        </div>
    );
};

export default DayModify;
