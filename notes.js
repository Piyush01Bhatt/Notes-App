const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return "Your Notes..."
}

const addNotes = function(title, body){
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body : body
        })
    
        saveNotes(notes)
    }else{
        console.log(chalk.red('...Duplicate Title Found...'))
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
    console.log(chalk.green('...New Note Saved...'))
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