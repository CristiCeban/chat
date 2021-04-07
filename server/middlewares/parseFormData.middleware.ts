module.exports =  (req, res, next) => {
    if (req.method === 'POST') {
        const formData = {}
        req.on('data', data => {
            const parsedData =
                decodeURIComponent(data).split('&')
            for (let data of parsedData) {
                const decodedData = decodeURIComponent(
                    data.replace(/\+/g, '%20'))
                const [key, value] =
                    decodedData.split('=')
                formData[key] = value
            }
            req.body = formData
            next()
        })
    } else {
        next()
    }
}
