const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

// adding add property
yargs.command({
    command : 'add',
    describe : 'add notes',
    builder : {
        title : {
            describe : 'define title of note',
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : 'define the body of note',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})

//adding remove property
yargs.command({
    command : 'remove',
    describe : 'remove notes',
    builder : {
        title : {
            describe : 'define title of note to remove',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

//adding list property
yargs.command({
    command : 'list',
    describe : 'list the notes',
    handler(){
        notes.listNotes()
    }
})

//adding read property
yargs.command({
    command : 'read',
    describe : 'read notes',
    builder : {
        title : {
            describe : 'define title of note to read',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()

