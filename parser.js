"use strict"
let fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

  }

  get people() {
    let Obj = {}
    Obj.size = this._people.length-1

    return Obj
  }

  getPeople(){
    let getData = fs.readFileSync('./people.csv', 'utf8').toString().split('\n')
    let files = []
    this._people = []

    for(let i=1; i < getData.length; i++){
      files.push(getData[i].split(','))
    }
    for (let j = 0; j < files.length; j++) {
      this._people[j]= new Person(files[j][0],files[j][1],files[j][2],files[j][3],files[j][4],files[j][5])
    }
    return this._people
  }

  addPerson(newPerson) {
    let obj = newPerson
    this.data = `${obj.id},${obj.first_name},${obj.last_name},${obj.email},${obj.phone},${obj.created_at.toISOString()} \n`
    fs.appendFileSync('people.csv',this.data)
    this._people.push(newPerson)
    return newPerson
    // console.log(this);
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person('201','Muhammad','Sayyaf', 'msrabbani@gmail.com','0856958690',new Date()))

console.log(parser.getPeople());
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
