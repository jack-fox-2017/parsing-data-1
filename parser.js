'use strict'

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
    this.createAt = new Date().toISOString();
  }
  // addPerson() {
  //   return `${this.id}, ${this.first_name}, ${this.last_name}, ${this.email}, ${this.phone}, ${this.createAt}`;
  // }
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
    for (var i = 0; i < list.length; i++) {
      data[i] = list[i].split(',')
    }
    for (var i = 0; i < data.length; i++) {
      arrObj[i] = new Person(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5]);

    }
    return arrObj;
    console.log(arrObj);
  }

  get people() {
    let people = {}
    people.size = this._people.length;
    return people
  }

  addPerson(Obj) {
   this._people.push(new Person(Obj));
   let ObjBaru = Obj;
   this.string = `${ObjBaru.id},${ObjBaru.first_name},${ObjBaru.last_name},${ObjBaru.email},${ObjBaru.phone},${ObjBaru.createAt}`
   console.log(ObjBaru);
  fs.appendFileSync(this._file,'\n' + this.string)
   return ObjBaru
  }

}

let personParser = new PersonParser('people.csv')
// console.log(parser.parser());
personParser.addPerson(new Person('201','Ahmad','Nasikin','nasikin@mail.com','021-213'))
// console.log(`There are ${personParser.people.length} people in the file '${personParser.file}'.`)
// console.log(personParser.people);
// let parser = new PersonParser('people.csv')

console.log(`There are ${personParser.people.size} people in the file '.`)
