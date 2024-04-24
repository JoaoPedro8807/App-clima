const convertData = (data) => {
    let [dia, hora] = data.split(' ')
    let dia_f = dia.split('-').reverse().join('/')
    return `${dia_f} ${hora}`
}

export const convertUserDate = (data) => new Date(data).toLocaleString()

export default convertData
