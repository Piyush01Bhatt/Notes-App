const fs = require('fs')
const chalk = require('chalk')

const getNotes = ()=>{
    return "Your Notes..."
}

const addNotes = (title, body)=>{
    const notes = loadNotes()

    const duplicateNote = notes.find((note)=>note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body : body
        })
    
        saveNotes(notes)
        console.log(chalk.green('...New Note Saved...'))
    }else{
        console.log(chalk.red('...Duplicate Title...'))
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

const listNotes = ()=>{
    const notes = loadNotes()
    if(notes.length >= 0){
        console.log(chalk.magenta('\n...Your Notes...\n'))
        var k = 1
        notes.forEach((note)=>{
            console.log(`${k} - ${chalk.cyan(note.title)}`)
            k += 1
        })
        console.log('\n')
    }else{
        console.log(chalk.red('...No notes to display...'))
    }
}

const readNote = (title)=>{
    const notes = loadNotes()

    const findNote = notes.find((note)=>note.title === title)

    if(findNote){
        console.log(`\n ${chalk.yellow(findNote.title)}`)
        console.log(`\n ${chalk.green(findNote.body)} \n`)
    }else{
        console.log(chalk.red('...Note note Found...'))
    }
}

module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNote : readNote
}