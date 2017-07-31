"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at = new Date()) {
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = new Date(created_at)
  }

  write() {
    return `${this._id},${this._first_name},${this._last_name},${this._email},${this._phone},${this._created_at.toISOString()}`
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.allPerson()
  }

  allPerson() {
    let file = fs.readFileSync(this._file, 'utf-8').trim().split('\r\n')
    let result = []
    for (let i = 1; i < file.length; i++) {
      let item = file[i].split(',')
      result.push(new Person(item[0],item[1],item[2],item[3],item[4],item[5]))
    }
    return result
  }

  get people() {
    return {arr: this._people, size: this._people.length}
  }

  addPerson(person) {
    this._people.push(person)
  }

  save() {
    let people = this._people.map(item => {return item.write()}).join('\r\n')
    // console.log(this._people);
    let data = 'id,first_name,last_name,email,phone,created_at\r\n'
    data += people
    fs.writeFileSync(this._file, data)
  }

}

let parser = new PersonParser('people.csv')
let rahmat = new Person(201, 'Rahmat', 'Hidayat', 'rahmatramahidayat@gmail.com', '081334132495')

console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
parser.addPerson(rahmat)
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
parser.save()
