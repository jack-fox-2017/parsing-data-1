"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(objPerson) {
    this.id = objPerson.id;
    this.first_name = objPerson.first_name;
    this.last_name = objPerson.last_name;
    this.email = objPerson.email;
    this.phone = objPerson.phone;
    this.created_at = new Date().toISOString();
  }
  toStr(){
    return `${this.id},${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`
  }
} //end of Class

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.csvToObject()
  }

  read() {
    let csv = fs.readFileSync(this._file, 'utf8').trim().split('\n');
    return csv
  }

  splitFile() {
    let csv = this.read();
    let arr = [];
    for (let i=0; i<csv.length; i++) {
      arr.push(csv[i].split(','))
    }
    // console.log(arr);
    return arr;
  }

  csvToObject() {
    let file = this.splitFile();
    // let arr = [];
    // let a = new Person(objPerson)
    for (var i = 1; i < file.length; i++) {
      var newObj = {};
      for (var j = 0; j < file[0].length; j++) {
        newObj[file[0][j]] = file[i][j]
      }
      this._people.push(new Person(newObj))
    }
    return this._people;
  }

  get people() {
    let people = {}
    people.size = this._people.length;
    return people;
    //disini berupa object
  }

  addPerson(objPerson) {
    // push new obj to this._people
    // then, write new data to data.json
  //   for (var i = 0; i < array.length; i++) {
  //
  // }
    let newData = new Person(objPerson)
    // this._people.push(this.csvToObject())
    this._people.push(newData)
    // return this._people.push(newData)
  }

  save(){
    // var param = ``
    let len = this._people.length;
    fs.appendFileSync(this._file, this._people[len-1].toStr() + ('\n'), 'utf8')
  }


} //end of Class

let parser = new PersonParser('people.csv')
// let data = new Person(objPerson)
// console.log(parser.people);
// console.log(parser.splitFile());

let objPerson = {
  id: '201',
  first_name: 'Rahmat',
  last_name: 'Hidayat',
  email: 'dayat@gmail.com',
  phone: '081572016058',
  created_at: new Date()
}
// console.log(parser.csvToObject());
parser.addPerson(objPerson)
parser.save()
console.log(parser._people);

console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
