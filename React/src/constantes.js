const base = 'http://127.0.0.1:5000' //server do flask

const URLS = {
    base: `${base}/api`,
    cidade: `${base}/get_city`,
    temp_cidade: `${base}/get_temp`,
    temp_regiao: `${base}/get_regiao`,
    setDefault: `${base}/set_default`,
    get24h: `${base}/get_24h`,
    login: `${base}/login`,
    get_users: `${base}/users`,
    del_users: `${base}/delete_user`,
    edit_users: `${base}/edit_user`,
    create_users: `${base}/create_user`,
    teste: `${base}/teste`

    
}
Object.freeze(URLS)

export default URLS