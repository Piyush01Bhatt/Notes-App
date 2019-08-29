const fs = require('fs')
const chalk = require('chalk')

const getNotes = ()=>{
    return "Your Notes..."
}

const addNotes = (title, body)=>{
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note)=>note.title === title)

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body : body
        })
    
        saveNotes(notes)
        console.log(chalk.green('...New Note Saved...'))
    }else{
        console.log(chalk.red('...Duplicate Title Found...'))
    }
}

const removeNotes = (title)=>{
    const notes = loadNotes()

    const filteredNotes = notes.filter((note)=>note.title !== title)

    if(notes.length === 0){
        console.log(chalk.bgRed(`There are no notes to be deleted`))
    }else {
            if(filteredNotes.length === notes.length){
            console.log(chalk.red(`No note with matching title ${chalk.yellow(title)} found`))
        }else{
            saveNotes(filteredNotes)
            console.log(chalk.green(`Removed Note with title : ${chalk.yellow(title)}`))
        }
    }
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = ()=>{
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
    getNotes : getNotes,
    removeNotes : removeNotes
}