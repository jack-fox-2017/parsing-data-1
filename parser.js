"use strict"

// add library fs untuk membaca file
const fs = require('fs');

class Person {

  // Menambahkan attributes [erson]
  constructor(id,firstName,lastName,email,phone,created_at){
    this._id = id
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
    this._phone = phone
    this._createdAt = created_at
  }

  toString(){
    return this._id+','+this._firstName+','+this._lastName+','+this._email+','+this._phone+','+this._createdAt
  }
}

class PersonParser extends Person {

  constructor(file,firstName,lastName,email,phone) {
    super(' ',firstName,lastName,email,phone)
    this._file = file
    this._people = null
  }

  readFile(file){
    return fs.readFileSync(file, 'utf8').trim().split("\n").map(function(x){return x.split(',')})
  }

  get people() {
    // membaca file 1 level tingkat berdasarkan nama
    let arrPerson = this.readFile(this._file)
    let objPerson = []
    // memasukkan data dari csv menjadi object dengan parameter header data atau index 0
    // conver data dari csv menjadi object
    for (let j = 1; j < arrPerson.length; j++) {
      // push new class Person
      objPerson.push(new Person(arrPerson[j][0],arrPerson[j][1],arrPerson[j][2],arrPerson[j][3],arrPerson[j][4],arrPerson[j][5]))
    }
    // mengirim array dalam bentuk array object
    this._people = objPerson
    return this
  }

  get size(){
    return this._people.length
  }

  addPerson() {
    var today = new Date()
    var add = new Person(this._people.length+1,this._firstName,this._lastName,this._email,this._phone,today.toISOString())
    var arrNewPeople = []
    // console.log(add);
    // console.log(today.toISOString());
    // add new people first
    this._people.push(add)

    //push header
    arrNewPeople.push(['id','first_name','last_name','email','phone','created_at'])

    // push data kedalam temporarry array
    for (let j = 0; j < this._people.length; j++) {
      arrNewPeople.push(this._people[j].toString())
    }
    this.writeFile(arrNewPeople)
  }

  writeFile(arr) {
    // add data kedalam CSV
    fs.writeFile(this._file, arr.join("\n"), function (err) {
      if (err) throw err;
      return 'Csv sudah terudate!';
    });
  }

}

let parser = new PersonParser('people.csv','udin','tampan','siTampan@gmail.com','086-1771-911')
parser.people;
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
parser.addPerson();
