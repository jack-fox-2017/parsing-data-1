"use strict"
const fs = require("fs")

class Person {
  constructor(value){
    this.id = value.id
    this.first_name = value.first_name
    this.last_name = value.last_name
    this.email = value.email
    this.phone = value.phone
    this.created_at = new Date().toISOString()

  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

  }
  parsingData(){
    this.parse = fs.readFileSync(this._file, "utf8").trim().toString().split("\n")
    return this.parse
  }
  toArr2d(){
    let data = this.parsingData()
    let arr2d = []
    for (var i = 0; i < data.length ; i++) {
      arr2d.push(data[i].split(","))
    }
    return arr2d;
  }
  toObj(){
    let data = this.toArr2d();
    let arrObj = [];
    for (let i = 1; i < data.length; i++) {
      let obj = {};
      for (let j = 0; j < data[0].length; j++) {
        obj[data[0][j]] = data[i][j]
      }
      arrObj.push(obj);
    }
    return arrObj;
  }
  get people() {
    let obj = {}
    obj.size = this.toArr2d().length
    return obj
  }

  addAllPerson() {
    let data = this.toObj();
    for (let i = 0; i < data.length; i++) {
      let orang = new Person(data[i])
      this._people.push(orang);
    }
    return this._people;
  }
  save(){
    var ObjtoStr = `${this.tambah.id},${this.tambah.first_name},${this.tambah.last_name},${this.tambah.email},${this.tambah.phone}, ${this.tambah.created_at}\n`
    fs.appendFile(this._file, ObjtoStr , "utf8")
  }
  addPerson(tambah){
    this.tambah = tambah
    this._people.push(tambah)
    return this._people
  }


}

let parser = new PersonParser('people.csv')
console.log(parser.addPerson(new Person({id:"201", first_name:"Ganang", last_name:"Wahyu", email : "gananggww@gmail.com",phone:"085372281600"})));

parser.parsingData();
parser.toArr2d();
parser.save()
parser.toObj();
parser.addPerson()


console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
