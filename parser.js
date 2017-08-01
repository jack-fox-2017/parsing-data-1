"use strict"
let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.create_at = new Date().toISOString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parser();
  }

  parser() {
    let list = fs.readFileSync('people.csv','utf8').trim().split('\n');
    let data = [];
    let arrObj = [];
    for (var j = 1; j < list.length; j++) {
      data.push(list[j].split(','))
    }
    for (var i = 0; i < data.length; i++) {
      arrObj[i] = new Person(data[i][0], data[i][1], data[i][2],data[i][3], data[i][4], data[i][5])
    }
    return arrObj;
    //console.log(arrObj);
  }
  get people() {
    let people ={}
    people.size = this._people.length;
    return people
  }

  addPerson(Obj) {
    this._people.push(new Person(Obj));
    let ObjBaru = Obj;
    this.string = `${ObjBaru.id}, ${ObjBaru.first_name}, ${ObjBaru.last_name}, ${ObjBaru.email}, ${ObjBaru.phone}, ${ObjBaru.create_at}`
    console.log(this.string);
    fs.appendFileSync(this._file, this.string + '\n')
      return ObjBaru
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person('201','Anggie','Laras','syalalagonjreng@mail.com','0274-587653'));

console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
