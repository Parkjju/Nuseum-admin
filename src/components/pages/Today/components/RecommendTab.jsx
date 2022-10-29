import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import handleExpired from '../../../../helpers/handleExpired';
import { authActions } from '../../../../store/auth-slice';
import { groupActions } from '../../../../store/group-slice';
import Preview from '../../Preview';
import CSVReader from 'react-csv-reader';
import Recommend from './Recommend';
import {
    SubList,
    TabBox,
    TabContents,
    TabInput,
    TabTitle,
} from './Recommend.styled';

const parserOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    // transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
};

const RecommendTab = ({ droppableId }) => {
    const group = useSelector((state) => state.group.group);
    const dispatch = useDispatch();
    const [comment, setComment] = useState(group.comment);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const onChangeComment = (e) => {
        setComment(e.target.value);
        dispatch(groupActions.updateComment(e.target.value));
    };
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const [hashTagList, setHashTagList] = useState(
        group.hashTag.length > 0 ? [...group.hashTag] : []
    );
    const [hashTag, setHashTag] = useState('');
    const date = useSelector((state) => state.date.date);

    const isFetched = useSelector((state) => state.group.isFetched);
    const saveRecommendation = async () => {
        setLoading(true);
        try {
            if (isFetched) {
                const response = await axios.patch(
                    `/api/v1/recommendation/admin/${isFetched}/`,
                    {
                        data: [...group.data],
                        comment,
                        hashtag:
                            hashTagList.length !== 0
                                ? hashTagList.join('')
                                : '',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
            } else {
                await axios.post(
                    '/api/v1/recommendation/admin/',
                    {
                        target: location.state.id,
                        created_at: `${date}`,
                        data: [...group.data],
                        comment,
                        hashtag:
                            hashTagList.length !== 0
                                ? hashTagList.join('')
                                : '',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            setLoading(false);
            alert('맞춤식품 추천이 완료되었습니다.');
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) {
                const { exp, token } = await handleExpired();
                dispatch(
                    authActions.login({
                        token: token.data.access,
                        exp,
                    })
                );
            } else {
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
            setLoading(false);
        }
    };
    const onChangeHashTag = (e) => {
        setHashTag(e.target.value);
    };
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value === '') return;
            setHashTagList((prev) => [...prev, e.target.value]);

            setHashTag('');
        }
    };
    useEffect(() => {
        dispatch(groupActions.updateHashtag(hashTagList));
    }, [hashTagList.length]);
    const onLoadCSV = (data, fileInfo) => {
        console.log(data);
    };
    console.log('hashtg', group);
    return (
        <Droppable droppableId={droppableId}>
            {(magic) => (
                <div
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                    style={{ padding: '30px 0' }}
                >
                    {/* <CSVReader
                        cssClass='react-csv-input'
                        label='맞춤식품 CSV파일을 업로드해주세요.'
                        onFileLoaded={onLoadCSV}
                        parserOptions={parserOptions}
                    /> */}
                    {[...group.data]
                        .sort((item1, item2) => item1.order - item2.order)
                        .map((obj, index) => (
                            <Recommend
                                name={obj.type}
                                index={index}
                                key={obj.id}
                                id={obj.id}
                            />
                        ))}

                    <TabBox
                        style={{
                            cursor: 'default',
                            height: 300,
                            alignItems: 'flex-start',
                        }}
                    >
                        <TabTitle>코멘트</TabTitle>
                        <TabContents>
                            <TabInput
                                as='textarea'
                                rows={2}
                                value={comment}
                                onChange={onChangeComment}
                                style={{
                                    resize: 'none',
                                    height: 280,
                                    padding: 5,
                                    cursor: 'default',
                                    border: '1px solid #EEEEEE',
                                }}
                                placeholder='내용을 작성해주세요'
                            />
                        </TabContents>
                    </TabBox>

                    <TabBox>
                        <TabTitle>해시태그</TabTitle>
                        <TabContents>
                            <TabInput
                                onKeyDown={onKeyDown}
                                onChange={onChangeHashTag}
                                value={hashTag}
                                placeholder='#해시태그 입력 후 엔터'
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: 5,
                                    width: '100%',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {hashTagList.map((item, index) =>
                                    item === '' ? null : (
                                        <SubList
                                            onClick={() => {
                                                setHashTagList((prev) => [
                                                    ...prev.slice(0, index),
                                                    ...prev.slice(index + 1),
                                                ]);
                                            }}
                                            key={index}
                                        >
                                            {item}
                                        </SubList>
                                    )
                                )}
                            </div>
                        </TabContents>
                    </TabBox>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div
                            style={{
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '0 auto',
                            }}
                        >
                            <button onClick={saveRecommendation}>저장</button>
                            <button
                                onClick={() =>
                                    setIsPreviewVisible((prev) => !prev)
                                }
                            >
                                미리보기
                            </button>
                        </div>
                    )}
                    {isPreviewVisible ? (
                        <Preview
                            hashtag={group.hashTag}
                            recommend={group.data}
                            comment={group.comment}
                        />
                    ) : null}
                    {magic.placeholder}
                </div>
            )}
        </Droppable>
    );
};
export default React.memo(RecommendTab);
