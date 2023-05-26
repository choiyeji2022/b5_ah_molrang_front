// 백엔드와 통신 위한 유알엘 설정
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


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

