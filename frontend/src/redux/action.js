
export function userLogin(userData,token){

    return{
        type:"LOGIN",
        payload:userData,
        token:token
    }
}

export function userLogout(){

    return{
        type:"LOGOUT"
    }
}


