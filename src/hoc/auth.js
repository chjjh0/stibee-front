import React, { useEffect } from 'react';
import Axios from 'axios';

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        useEffect(() => {
            console.log('Auth hoc');
            Axios.get('/api/user/auth')
                .then(res => {
                    console.log('auth 다녀옴', res);
                })
                .catch(err => {
                    console.log('auth err', err.response);
                    alert('토큰이 만료되어 재로그인이 필요합니다.')
                    window.location.href = '/';
                })
        }, [])

        return (
            <ComposedClass {...props} />
        )
    }
    return AuthenticationCheck
}