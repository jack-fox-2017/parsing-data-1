"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name  = last_name
    this.email      = email
    this.phone      = phone
    this.created_at = created_at
  }

}


class PersonParser{

  constructor(file) {
    this._file = file
    this._people = []


  }

  get people() {

    return this._people
  }

  fileData(){
    let fileContent = fs.readFileSync('people.csv', 'utf8');
    let arr = fileContent.trim().split('\n')
    // console.log(arr[1]);
      for(let i = 1; i < arr.length; i++){
        let arrPisah = arr[i].split(',');

        /*
        console.log(arrPisah);
        [ '1',
          'Lani',
          'Rollins',
          'blandit@quam.com',
          '1-633-389-7173',
          '2012-05-10T03:53:40-07:00' ]
        */
        this._people.push(new Person(arrPisah[0],arrPisah[1],arrPisah[2],arrPisah[3],arrPisah[4],arrPisah[5]));
      }

    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let tambah = new Person(id, first_name, last_name, email, phone, created_at);

    // console.log(tambah.id, tambah.first_name, tambah.last_name, tambah.email, tambah.phone, tambah.created_at);

    this._people.push(tambah.id, tambah.first_name, tambah.last_name, tambah.email, tambah.phone, tambah.created_at)

    return this._people
  }

  save(){
    // let savePerson = fs.writeFileSync('people.csv', this._people);
    fs.appendFileSync(this._file, this._people + '\n' )
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson('203','roy','Joyce', 'fringilla@elitNullafacilisi.edu',new Date().toISOString())
parser.save();
console.log(parser.fileData());
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
