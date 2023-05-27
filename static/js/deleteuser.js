// Access Token 값 불러오기
const access_token = localStorage.getItem("access");

// payload 값 가져오기 -> name, user_id 가능!
const payload = localStorage.getItem('payload');
const payload_parse = JSON.parse(payload);
const user = JSON.parse(payload)['user_id'];
console.log(payload_parse);

// 사용자의 ID 값을 추출하여 변수에 할당
const user_id = user;

// API 객체 생성
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
});

// 회원 탈퇴 함수
const deleteUser = () => {
    // 서버로 회원 탈퇴 요청 보내기
    api.delete(`/users/`)
        .then(response => {
            console.log(response.data.message);  // 회원 탈퇴 완료 메시지 출력
            // 여기서 추가적인 동작을 수행할 수 있습니다.
        })
        .catch(error => {
            console.error(error);
            // 에러 처리 로직을 추가할 수 있습니다.
        });
};


