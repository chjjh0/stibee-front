import client from './client';

// 로그인
export const login = ({ email, password }) =>
  client.post('/api/user/login', { email, password });

// 회원가입
// export const register = ({ username, password }) =>
//   client.post('/api/auth/register', { username, password });
export const join = payload => client.post('/api/user/join', { ...payload });

// 로그인 상태 확인
export const check = () => client.get('/api/user/check');

// 로그아웃
export const logout = () => client.get('/api/user/logout');
