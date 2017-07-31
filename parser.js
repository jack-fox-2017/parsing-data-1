"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.phone = phone;
      this.size = 0
      this.created_at = new Date (created_at);
  }
  get insert(){
    return `${this.id}, ${this.first_name}, ${this.last_name}, ${this.email}, ${this.phone}, ${this.created_at}`
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.peopleArr = []
    this.peopleObj = []
  }

  get people() {
    // return this._people
    return this.peopleArr
  }

  addPerson(data) {
    fs.appendFile('people.csv', data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  }



  readFile(fileName, callback){
    let fileContent = fs.readFileSync(fileName, 'utf8');
    callback(fileContent);
  }

  readcsv() {
    this.readFile('people.csv', fileContent => {
      // console.log(fileContent.split('\n'));
      let row_split = fileContent.trim().split('\n')
      //trim berfungsi untuk menghilangkan line kosong di row paling bawah file csv

      //setelah file dibaca displit berdasarkan karakter enter \n
      //akan menghasilkan array yg setiap barisnya sesuai row di csv
      //tinggal push hasil split dan displit lagi berdasarkan koma ,

      for(let i = 0; i < row_split.length; i++){
        var row_data = row_split[i].split(',')
        this.peopleArr.push(row_data)
      }
        // console.log(this.peopleArr)//[0][0]);

        // convert peopleArr ke object
        for(let i = 1; i < this.peopleArr.length; i++){
        let toObject = {};
          for(let j = 0; j < this.peopleArr[0].length; j++){
            toObject[this.peopleArr[0][j]]=this.peopleArr[i][j];
          }
        this.peopleObj.push(toObject);
        }
        console.log(this.peopleObj);
    })

  }

}


let parser = new PersonParser('people.csv')
parser.addPerson('202,Achim,Baggins,achim_baggins@yahoo.com,8-180-370-43434,2013-12-02T06:45:30-08:00\n');
parser.readcsv();
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
