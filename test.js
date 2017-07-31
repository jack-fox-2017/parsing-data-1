"use strict"
let fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  consructor(id,first_name, last_name, email, phone, create_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.create_at = create_at
  }
}

//module.exports = Person

class PersonParser{

  constructor(file) {
    this._file = file
    this._people = this.parser();
  }

  parser() {
    let listFile = fs.readFileSync('people.csv','utf8').split('\n');
    let data = [];
    let arrObj = [];

    for (var j = 0; j < listFile.length; j++) {
      data[j] = listFile[j].split(',')
      //console.log(data);
    }
    for (var i = 0; i < data.length; i++) {
      arrObj[i] = new Person(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5])
    }
    return arrObj;
    //console.log(arrObj);
  }

  get people() {
    return this._people
  }

  addPerson(data) {
    this.people.push(new Person(data));
    let newObj = data;
    this.string = `${newObj.id}, ${newObj.first_name}, ${newObj.last_name}, ${newObj.email}, ${newObj.phone}, ${newObj.create_at.toISOString()}\n`
    fs.appenFileSync(this._file.string,'utf8')
    return data
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.parser());
console.log(parser.people);
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
