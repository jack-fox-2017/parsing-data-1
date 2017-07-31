"use strict"

const fs = require('fs')

class Person {
  constructor(id, firstName, lastname, email, phone, createdAt) {
    this.id = id;
    this.FirstName = firstName;
    this.LastName = lastname;
    this.email = email;
    this.phone = phone;
    this.created = createdAt;
  }
}
class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this.bikinObj()
  }



  bikinObj() {
    var arry = [];
    var obj = [];
    var file = fs.readFileSync('people.csv')
      .toString()
      .trim()
      .split('\n')
    for (var i = 0; i < file.length; i++) {
      arry.push(file[i].split(','))
    }
    for (var i = 1; i < arry.length; i++) {
      var object = new Person(arry[i][0], arry[i][1], arry[i][2], arry[i][3], arry[i][4], arry[i][5])
      this._people.push(object)
    }


  }
  get people() {
    return this._people
  }

  addPerson() {
    var satu = new Person(`203`, `otong`, `Zidan`, `ZSteven@google.com`, `1-5-4-6-855-879`, `20 juli`)
    var dua = new Person(`201`, `otong`, `steven`, `OSteven@google.com`, `1-5-4-6-855-879`, `20 juli`)
    this._people.push(satu)
    this._people.push(dua)
    var satuTmp = `${satu.id},${satu.FirstName},${satu.LastName},${satu.email},${satu.phone},${satu.created},${new Date()}\n`
    var duaTmp = `${dua.id},${dua.FirstName},${dua.LastName},${dua.email},${dua.phone},${dua.created},${new Date()}\n`
    fs.appendFile('people.csv', duaTmp, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }
}





let parser = new PersonParser('people.csv')
parser.bikinObj();
parser.addPerson();
console.log(parser.people);


// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
