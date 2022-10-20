import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { groupActions } from '../../../../store/group-slice';
import { TabBox, TabContents, TabInput, TabTitle } from './Recommend.styled';

const Recommend = ({ name, index }) => {
    const [main, setMain] = useState('');
    const [subText, setSubText] = useState('');
    const group = useSelector((state) => state.group.group);
    const dispatch = useDispatch();

    const onChangeMain = (e) => {
        setMain(e.target.value);
        const modifiedIndex = group.data.findIndex(
            (item) => item.type === name
        );
        dispatch(
            groupActions.updateMain({
                newElement: e.target.value,
                index: modifiedIndex,
            })
        );
    };
    const onChangeSub = (e) => {
        setSubText(e.target.value);
    };
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value === '') return;
            const modifiedIndex = group.data.findIndex(
                (item) => item.type === name
            );
            dispatch(
                groupActions.updateContent({
                    index: modifiedIndex,
                    newElement: e.target.value,
                })
            );

            setSubText('');
        }
    };

    return (
        <Draggable draggableId={name} index={index}>
            {(magic) => (
                <TabBox
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    <TabTitle>
                        {name === '주의' ? '피해야할 음식' : name}
                    </TabTitle>
                    <TabContents>
                        <TabInput
                            value={main}
                            onChange={onChangeMain}
                            placeholder='대표 음식 1가지'
                        />
                        <TabInput
                            onKeyDown={onKeyDown}
                            onChange={onChangeSub}
                            value={subText}
                            placeholder='추천 음식 4가지'
                        />

                        <div
                            style={{
                                display: 'flex',
                                marginTop: 5,
                                width: '100%',
                                flexWrap: 'wrap',
                            }}
                        >
                            {group.data
                                .filter((item) => item.type === name)[0]
                                .list.map((item, index) => (
                                    <span
                                        style={{
                                            marginRight: 5,
                                            fontSize: 12,
                                            marginBottom: 5,
                                        }}
                                        key={index}
                                    >
                                        {item}
                                    </span>
                                ))}
                        </div>
                    </TabContents>
                </TabBox>
            )}
        </Draggable>
    );
};
export default React.memo(Recommend);
