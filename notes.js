const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return "Your Notes..."
}

const addNotes = function(title, body){
    const notes = loadNotes()

    notes.push({
        title: title,
        body : body
    })

    saveNotes(notes)
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
    console.log(chalk.green(('...Note Saved...')))
}

const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        console.log(chalk.red('...Error Occured In Reading File...'))
        return []
    }
}

module.exports = {
    addNotes : addNotes,
    getNotes : getNotes
}