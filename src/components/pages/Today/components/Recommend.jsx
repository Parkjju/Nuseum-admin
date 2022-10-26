import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { groupActions } from '../../../../store/group-slice';
import {
    SubList,
    TabBox,
    TabContents,
    TabInput,
    TabTitle,
} from './Recommend.styled';

const Recommend = ({ name, index, id }) => {
    const group = useSelector((state) => state.group.group);
    const [main, setMain] = useState(group.data[index].main);
    const [subText, setSubText] = useState('');
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

    const removeSubList = (id, index) => {
        dispatch(groupActions.removeContent({ id, index }));
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
                                    <SubList
                                        onClick={() => {
                                            removeSubList(id, index);
                                        }}
                                        key={index}
                                    >
                                        {item}
                                    </SubList>
                                ))}
                        </div>
                    </TabContents>
                </TabBox>
            )}
        </Draggable>
    );
};
export default React.memo(Recommend);
