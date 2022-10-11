import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderBox, Icon } from './Header.style';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();

    const loc = useLocation();
    const locationArray = loc.pathname.split('/');

    const [backActive, setBackActive] = useState(true);
    const [homeActive, setHomeActive] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(
        window.sessionStorage.getItem('isLoggedIn')
    );

    return (
        <HeaderBox>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
            </Helmet>

            {isLoggedIn ? (
                <>
                    <div
                        style={{
                            paddingLeft: 30,
                            width: 80,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {location.pathname === '/' ? null : (
                            <>
                                <Icon
                                    onClick={() => {
                                        if (!backActive) return;
                                        if (
                                            locationArray.length > 1 &&
                                            locationArray.length < 4
                                        ) {
                                            navigate('/');
                                            return;
                                        }
                                        if (locationArray[1].length > 0) {
                                            navigate(-1);
                                            return;
                                        }
                                        if (backActive) {
                                            navigate(-1);
                                        } else {
                                            return null;
                                        }
                                    }}
                                    active={backActive}
                                    className='material-symbols-outlined'
                                >
                                    arrow_back
                                </Icon>
                                <Icon
                                    onClick={() => {
                                        if (!homeActive) return;
                                        if (homeActive) {
                                            navigate('/');
                                        } else {
                                            return null;
                                        }
                                    }}
                                    active={homeActive}
                                    className='material-symbols-outlined'
                                >
                                    home
                                </Icon>
                            </>
                        )}
                    </div>

                    <Icon
                        onClick={async () => {
                            if (window.confirm('로그아웃 하시겠습니까?')) {
                                if (homeActive) {
                                    try {
                                        await axios.post(
                                            'https://www.nuseum.site/api/v1/account/logout/'
                                        );

                                        window.sessionStorage.removeItem(
                                            'isLoggedIn'
                                        );
                                        alert('로그아웃 되었습니다!');
                                        navigate('/login');
                                    } catch (error) {
                                        console.log(error);
                                    }
                                } else {
                                    return null;
                                }
                            }
                        }}
                        active={homeActive}
                        className='material-symbols-outlined'
                        style={{ paddingRight: 30 }}
                    >
                        logout
                    </Icon>
                </>
            ) : null}
        </HeaderBox>
    );
};

export default Header;
