"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    let readFile = fs.readFileSync(this._file).toString().trim().split('\n')
    let arr = [];
    for (let i = 0; i < readFile.length; i++) {
      //console.log(readFile[i]);
      arr.push(readFile[i].split(','));
    }
    for (let i = 1; i < arr.length; i++) {
      let person = new Person(arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5]);
      this._people.push(person);
    }
    return this._people;
  }

  addPerson(input) {
    let date = new Date();
    this._newPerson = new Person(input[0],input[1],input[2],input[3],input[4],date);
    //console.log(this._newPerson);
    this._people.push(this._newPerson);
    console.log(this._people);
  }

  save(){
    let newPerson = [];
    newPerson.push(['id','first_name','last_name','email','phone','created_at']);
    for(let i=0; i<this._people.length; i++){
      newPerson.push([this._people[i].id,this._people[i].first_name,this._people[i].last_name,this._people[i].email,this._people[i].phone,this._people[i].created_at]);
    }
    //console.log(newPerson.join('\n'));
    fs.writeFileSync(this._file, newPerson.join('\n'));
    console.log('All data(s) is saved!');
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.people);
//parser.people;
parser.addPerson(['201', 'Ahmad', 'Aidil', 'ahmdaidil@gmail.com', '62-811-780-1961']);
//console.log(parser.people);
parser.save();
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
