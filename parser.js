"use strict"
let fs = require('fs');

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date().toISOString()
  }

  get insert(){
    return `${this.id},${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    let size = {}
    size.size = this._people.length
    return size
  }

  ambil (){
    let dataAwal = fs.readFileSync('people.csv','utf8');
    let data = dataAwal.trim().split("\n");
    for(let i=0;i<data.length;i++){
      data[i] = data[i].split(",")
    }
    // console.log(data);
    for(let i=1;i<data.length;i++){
        let persons = new Person(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],new Date(data[i][5]))
          this._people.push(persons)
    }
  return this._people
  }

  save() {
   fs.appendFileSync(this._file,this._people + ("\n"),'utf8')
  }

  addPerson(addData) {
    this._people.push(addData.insert)
    return this._people
  }
}


let parser = new PersonParser('people.csv')
let addData = new Person("290","Resti","Nurul","Resti@gmail.com","08983783321",(new Date))
parser.addPerson(addData)
parser.save()
// console.log(parser.ambil());

console.log(parser.ambil());

// console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
//console.log(parser._people[170 - 1].last_name);
//console.log(list);
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
//
