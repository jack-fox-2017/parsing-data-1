"use strict"
let fs = require('fs')
class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date()
  }

  Insert(){
    return `${this.id},${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`
  }
}

class PersonParser {

  constructor(data) {
    this._file = data
    this._people = this.x()
  }

  x(){
    let tampung = []
    let fileContent = fs.readFileSync(this._file, 'utf8').trim().split('\n')
      //split by comma
      for(let i = 1; i < fileContent.length; i++){
        fileContent[i] = fileContent[i].split(',')
      }

      //split by row
      for(let i = 0; i < fileContent.length; i++){
        let persons = new Person(fileContent[i][0], fileContent[i][1], fileContent[i][2], fileContent[i][3],fileContent[i][4], fileContent[i][5])
        tampung.push(persons)
      }
      return tampung
  }

  get people() {
      let people = {};
      people.size = this._people.length
      return people
    }

    addPerson(addNewPerson){
      this._people.push(addNewPerson)
      return this._people
    }

    save(){
      fs.writeFileSync('people.csv', this._people.map(item => {return item.Insert()}).join('\n'), 'utf8')
    }

  }

  let parser = new PersonParser('people.csv')
  let addNewPerson = new Person ('201', 'Ali', 'Hikmat', 'alihikmat@yahoo.com', '081314151617', `${new Date()}`)
  parser.addPerson(addNewPerson)
  parser.save()


  console.log(`There are ${parser.people.size} people in the file ${parser._file}.`)
