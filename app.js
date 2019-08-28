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
    handler : function(argv){
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
    handler : function(argv){
        notes.removeNotes(argv.title)
    }
})

//adding list property
yargs.command({
    command : 'list',
    describe : 'list the notes',
    handler : function(){
        console.log(chalk.blue('Listing Notes...'))
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
    handler : function(argv){
        console.log(chalk.blue('Reading Notes...'),argv)
    }
})

yargs.parse()

