import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import handleExpired from '../../../../helpers/handleExpired';
import { authActions } from '../../../../store/auth-slice';
import { ModalInput, ModalSearch } from './Search.styled';

const Search = () => {
    const [searchFoodName, setSearchFoodName] = useState('');
    const onChangeName = (e) => {
        setSearchFoodName(e.target.value);
    };
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

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
            });

        setLoading(false);
    };
    console.log(searchResult);
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
        </>
    );
};

export default Search;
