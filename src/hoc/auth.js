import React, { useEffect } from 'react';
import Axios from 'axios';

export default function (ComposedClass, required=false) {
	function AuthenticationCheck(props) {

		const checkLogin = () => {
			Axios.get('/api/user/auth')
				.then(res => {
					if (res.data.success && props.match.path === '/') {
						alert('이미 로그인 중입니다.');
						props.history.push('/list');
					}
				})
				.catch(err => {
					alert('토큰이 만료되어 재로그인이 필요합니다.')
					props.history.push('/');
				})
		}

		const checkCookie = () => {
			return document.cookie.split(';').filter(item => item.trim().includes('userId') && item.trim().includes('w_auth'))
		}

		useEffect(() => {
			// console.log('auth', props);
			if (required || checkCookie) checkLogin()
		}, [])

		return (
			<ComposedClass {...props} />
		)
	}

	return AuthenticationCheck;
}