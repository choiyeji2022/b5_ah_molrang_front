
// 회원정보를 기입받아 백엔드에 보내기 위해 에이싱크 펑션 비동기함수 작성
async function signup_button() {
    if (document.querySelector("#user_create_password").value == document.querySelector("#user_create_password_check").value) {
        const signupData = {
            email: document.querySelector("#user_create_email").value,
            username: document.querySelector("#user_create_id").value,
            password: document.querySelector("#user_create_password").value,
        }

        const response = await fetch(`${backend_base_url}/users/signup/`, {
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers': 'Content-Type',
                // Accept: "application/json",
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(signupData)
        }
        )
        // response_json = await response.json()
        const data = await response.json()
        console.log(data["message"])
        if (response.status == 201) {
            alert("회원가입완료!!")
            window.location.replace(`${frontend_base_url}/templates/signin.html`);
        } else {
            alert(response.status)
        }
    } else {
        alert("재확인 비밀번호가 일치하지 않습니다.")
    }
}

checkLogin()
// {
//     const password1 = document.querySelector("#user_create_password").value
//     const password2 = document.querySelector("#user_create_password_check").value

//     if (password1 == password2) { /* 비밀번호와 재확인 비밀번호 일치하는지 확인 */
//         const user_create_id = document.querySelector("#user_create_id").value
//         console.log(user_create_id)
//         const user_create_password = document.querySelector("#user_create_password").value
//         console.log(user_create_password)
//         const user_create_email = document.querySelector("#user_create_email").value
//         console.log(user_create_email)
//     } else {
//         alert("재확인 비밀번호가 일치하지 않습니다.")
//     }
// }

// 카카오 로그인
// async function kakaoLoginApi(kakaoUserData) {

//     const response = await fetch(`${backEndBaseUrl}/users/api/kakao/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrftoken,
//         },
//         body: JSON.stringify(kakaoUserData),
//     }
//     )
//     response_json = await response.json()

//     if (response.status == 200) {
//         setLocalStorageItems()
//         alert(response_json['msg'])
//         window.location.reload()

//     } else if (response.status == 201) {
//         setLocalStorageItems()
//         alert("원활한 서비스 이용을 위해 주소를 입력해주세요.")
//         addressModalView();
//     }
// }

// function kakaoLogin() {
//     window.Kakao.Auth.login({
//         scope: 'profile_nickname, account_email',
//         success: function (authObj) {
//             window.Kakao.API.request({
//                 url: '/v2/user/me',
//                 success: res => {
//                     kakaoAccount = res.kakao_account;
//                     kakaoUserData = {
//                         'email': kakaoAccount['email'],
//                         'nickname': kakaoAccount['profile']['nickname']
//                     }
//                     kakaoLoginApi(kakaoUserData)
//                 }
//             });
//         }
//     });
// }

