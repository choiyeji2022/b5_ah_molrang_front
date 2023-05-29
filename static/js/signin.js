async function signin_button() {
    const loginData = {
        username: document.querySelector("#user_login_id").value,
        password: document.querySelector("#user_login_password").value,
    }

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    }
    )


    response_json = await response.json()
    console.log(response_json.access)

    if (response.status == 200) {
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        const payload = localStorage.getItem("payload")
        const payload_parse = JSON.parse(payload)
        alert(`${payload_parse.username}님, 아몰약에 오신 것을 환영합니다!`)
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert("정보가 일치하지 않습니다! 다시 입력해주세요!")
        window.location.replace(`${frontend_base_url}/templates/signin.html`);
    }


}