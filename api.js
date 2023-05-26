// // api.js

// import axios from 'axios';

// // API 서버의 기본 URL
// const API_BASE_URL = 'http://127.0.0.1:8000/';

// // API 호출 함수
// async function callApi(endpoint, method = 'GET', data = null, headers = {}) {
//     const url = API_BASE_URL + endpoint;
//     const token = localStorage.getItem('token');

//     // 토큰을 헤더에 추가합니다.
//     if (token) {
//         headers['Authorization'] = 'Bearer ' + token;
//     }

//     try {
//         const response = await axios({
//             method: method,
//             url: url,
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...headers
//             },
//             data: data
//         });

//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }

// // 사용자 등록 요청 함수
// export async function registerUser(userData) {
//     try {
//         const response = await callApi('signup/', 'POST', userData);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 로그인 요청 함수
// export async function login(username, password) {
//     const data = {
//         username: username,
//         password: password
//     };

//     try {
//         const response = await callApi('login/', 'POST', data);
//         // 토큰을 로컬 스토리지에 저장합니다.
//         localStorage.setItem('token', response.access);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 사용자 상세 정보 요청 함수
// export async function getUserDetails() {
//     try {
//         const response = await callApi('', 'GET');
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 프로필 조회 요청 함수
// export async function getProfile(userId) {
//     try {
//         const response = await callApi(`${userId}/`, 'GET');
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 토큰 갱신 요청 함수
// export async function refreshToken() {
//     try {
//         const response = await callApi('api/token/refresh/', 'POST');
//         // 갱신된 토큰을 로컬 스토리지에 저장합니다.
//         localStorage.setItem('token', response.access);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 로그아웃 함수
// export function logout() {
//     // 로컬 스토리지에서 토큰을 제거합니다.
//     localStorage.removeItem('token');
// }

// // 상품 등록 요청 함수
// export async function createProduct(productData) {
//     try {
//         const response = await callApi('products/', 'POST', productData);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 상품 목록 조회 요청 함수
// export async function getProductList() {
//     try {
//         const response = await callApi('products/', 'GET');
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// // 장바구니에 상품 추가 요청 함수
// export async function addToCart(productId) {
//     try {
//         const response = await callApi(`carts/${productId}/`, 'POST');
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

