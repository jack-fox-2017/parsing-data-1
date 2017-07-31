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
    let list = fs.readFileSync('people.csv', 'utf8').toString().trim().split('\n')
    let data = [];
    let arrObj = [];
    for (var i = 0; i < list.length; i++) {
      data[i] = list[i].split(',')
    }
    for (var j = 0; j < data.length; j++) {
      arrObj[j] = new Person(data[j][0], data[j][1], data[j][2], data[j][3], data[j][4], data[j][5]);

    }
    return arrObj;
    console.log(arrObj);
  }

  get people() {
    let people = {}
    people.size = this._people.length-1;
    return people
  }

  addPerson(Obj) {
   this._people.push(new Person(Obj));
   let ObjBaru = Obj;
   this.string = `${ObjBaru.id},${ObjBaru.first_name},${ObjBaru.last_name},${ObjBaru.email},${ObjBaru.phone},${ObjBaru.createAt}`
  //  console.log(ObjBaru);
  console.log(this.string);
  fs.appendFileSync(this._file, this.string + '\n')
   return ObjBaru
  }

}

let personParser = new PersonParser('people.csv')
// console.log(parser.parser());
personParser.addPerson(new Person('201','Ahmad','Nasikin','nasikin@mail.com','021-213'))
personParser.addPerson(new Person('202','Nasikin','Nasikin','nasikin@mail.com','021-213'))
personParser.addPerson(new Person('203','Ahmad','Ahmad','nasikin@mail.com','021-213'))
personParser.addPerson(new Person('204','Nasikin','Ahmad','nasikin@mail.com','021-213'))
// console.log(`There are ${personParser.people.length} people in the file '${personParser.file}'.`)
// console.log(personParser.people);
// let parser = new PersonParser('people.csv')

console.log(`There are ${personParser.people.size} people in the file '${personParser._file}''.`)
