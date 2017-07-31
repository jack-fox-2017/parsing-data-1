"use strict"
const fs = require("fs")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this._arr = []
    this._tampung = {}
    let kumpulanData = fs.readFileSync("people.csv", "utf-8").split("\n");
    //console.log(kumpulanData)
    this._data = kumpulanData
  }

  parseData() {
    for (let i = 0; i < this._data.length; i++) {
      this._data[i].trim().split(",");
      let suka = this._data[i].split(",");
      this._arr.push(new Person(suka[0], suka[1], suka[2], suka[3], suka[4], suka[5]))
    }
    return this._arr;
  }

  // get people() {
  //   let people = {}
  //   people.size = this._arr.length;
  //   return people.size;
  // } masih undifend

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let person = new Person(id, first_name, last_name, email, phone, created_at)
    //console.log(person.id, person.first_name, person.last_name, person.email, person.phone, person.created_at)
    this._arr.push(person.id, person.first_name, person.last_name, person.email, person.phone, person.created_at)
    return this._arr
  }

  save() {
    fs.appendFileSync(this._file, this._arr + ("\n"), "Utf8")

  }
}

let parser = new PersonParser('people.csv')
parser.addPerson("201", "dimas", "gardenia", "dimas.gardenia@gmail.com", "08127839", new Date().toISOString())
parser.save();
console.log(parser.parseData());
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
