import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import handleExpired from '../../../../helpers/handleExpired';
import { authActions } from '../../../../store/auth-slice';

import {
    Divider,
    Nutrition,
    Result,
    ResultBox,
    Tag,
    TagBox,
} from './SearchResult.styled';

function SearchResult({ data, type }) {
    // 하위 컴포넌트 각각에 state를 부여해야함
    const token = useSelector((state) => state.auth.token);
    const date = useSelector((state) => state.date.date);
    const location = useLocation();
    const [changeResultState, setChangeResultState] = useState(false);
    const dispatch = useDispatch();

    const [tag, setTag] = useState([]);
    const slide = (item) => {
        if (item.open !== undefined) {
            item.open = !item.open;
        } else {
            item.open = true;
        }
    };

    const saveTag = async () => {
        try {
            if (tag.length === 0) {
                alert('하나 이상의 데이터를 추가해주세요!');
                return;
            }

            const response = await axios.post(
                'https://www.nuseum.site/api/v1/consumption/admin/addition/',
                {
                    type,
                    created_at: date,
                    author: location.state.id,
                    consumptions: [...tag],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('저장이 완료되었습니다.');
            setTag([]);
        } catch (error) {
            if (error.response.status === 401) {
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
        }
    };

    return (
        <ResultBox>
            <TagBox>
                {tag.map((item, index) => (
                    <Tag
                        onClick={async () => {
                            if (
                                window.confirm(
                                    '입력하신 데이터를 지우시겠어요?'
                                )
                            ) {
                                setTag((prev) => {
                                    const idx = prev.indexOf(
                                        prev.filter(
                                            (filterItem) =>
                                                filterItem.food === item.food
                                        )[0]
                                    );
                                    let copy = [...prev];
                                    copy.splice(idx, 1);
                                    return [...copy];
                                });
                            }
                        }}
                        key={index}
                    >
                        {item.name}
                        {` ${item.amount} (g 또는 ml)`}
                    </Tag>
                ))}
            </TagBox>
            <button onClick={saveTag}>저장</button>

            {/* 영양성분 국문화 */}
            {/* id, name, category 제외 */}
            {/* 단위 추가 */}
            {data
                ? data.map((item) => (
                      <>
                          <Result key={item.id}>
                              <p
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                      slide(item);
                                      setChangeResultState((prev) => !prev);
                                  }}
                              >
                                  {item.name}
                              </p>

                              <Nutrition
                                  style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                  }}
                                  item={item}
                                  open={item.open}
                                  setTag={setTag}
                              />

                              <Divider
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ delay: 0.5 }}
                              />
                          </Result>
                      </>
                  ))
                : null}
        </ResultBox>
    );
}
export default React.memo(SearchResult);
