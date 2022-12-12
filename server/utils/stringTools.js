function parseColumns(string){
    string = string.replace(/\[|\]|\,/ig,'')
    string = string.split(/\s/)

    return string
}

module.exports = {
    parseColumns
}