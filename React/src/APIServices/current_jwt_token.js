const current_jwt_token = () => {
    return JSON.parse(localStorage.getItem('currentUser')).jwt_token    
}

export default current_jwt_token