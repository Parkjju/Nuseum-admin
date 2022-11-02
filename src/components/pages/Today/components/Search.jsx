import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import handleExpired from '../../../../helpers/handleExpired';
import { authActions } from '../../../../store/auth-slice';
import { ModalInput, ModalSearch } from './Search.styled';
import SearchResult from './SearchResult';

const Search = ({ type }) => {
    const [searchFoodName, setSearchFoodName] = useState('');
    const onChangeName = (e) => {
        setSearchFoodName(e.target.value);
    };
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const [page, setPage] = useState(2);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [searchParam, setSearchParam] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .get(`/api/v1/food/?search=${searchFoodName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(async (response) => {
                if (response.data.results.length === 0) {
                    alert('검색 결과가 없어요!');
                } else {
                    setSearchResult(response.data.results);
                    console.log(response.data);
                }
                setSearchParam(searchFoodName);
            })
            .catch(async (err) => {
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
                setSearchParam('');
            });

        setLoading(false);
    };

    // scroll 이벤트 핸들링을 위한 클린업 함수
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (window.innerHeight + scrollTop >= offsetHeight - 100) {
                setIsFetching(true);
            }
        };
        const addEventIdentifier = setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
            window.attached = true;
        }, 500);

        return () => {
            clearTimeout(addEventIdentifier);
            if (window.attached) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [document.documentElement.scrollTop]);

    useEffect(() => {
        if (isFetching && hasNextPage) fetchFoods(); // nextPage가 null이면
        else if (!hasNextPage) setIsFetching(false); // 요청을 취소
    }, [isFetching]);

    const fetchFoods = useCallback(async () => {
        if (searchParam === '') {
            setIsFetching(false);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(
                `/api/v1/food/?page=${page}&search=${searchParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSearchResult((prev) => [...prev, ...response.data.results]);
            setPage((prev) => prev + 1);
            setHasNextPage(response.data.next ? true : false);
            setIsFetching(false);
        } catch (error) {
            // handleExpired 로직 추가 필요
            console.log(error);
        }
    }, [page, searchParam]);

    return loading ? (
        <CircularProgress />
    ) : (
        <>
            <ModalSearch
                style={{ marginTop: 30 }}
                as='form'
                onSubmit={onSubmit}
            >
                <span className='material-symbols-outlined'>search</span>
                <ModalInput value={searchFoodName} onChange={onChangeName} />
            </ModalSearch>

            <SearchResult type={type} data={searchResult} />
        </>
    );
};

export default Search;
