function parseArray(string){
    if (!string.length) {
        return []
    }
    string = string.replace(/\[|\]|/gi, '')
    string = string.replace(/\,\s/gi, ',')
    string = string.split(',')

    return string
}

module.exports = {
    parseArray
}