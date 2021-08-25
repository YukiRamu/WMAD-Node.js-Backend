/* CRUD Operation Practice : Create module */
fs = require("fs");

const crudDB = () => {

  // store your records here
  let inMemoryDB = [];

  const operations = {
    Create(username, password) {
      //#1 : check if the user already exists. If yes, return false
      if (operations.Read(username) !== undefined) {
        return false;
      } else {
        //#2 : add the user to the DB
        inMemoryDB.push({
          loginUserName: username.db,
          loginPW: password
        });
        //#3 : Check DB is the new user is there
        if (inMemoryDB.some(e => e.loginUserName === username)) {
          return true;
        } else {
          return false;
        }
      }
    },

    Read(username) {
      // return undefined if no record exists, otherwise, return the record
      let result = inMemoryDB.find(e => e.loginUserName === username);
      return result;
    },

    Update(username, newRecordData) {
      //#1 : check if the target user exists, if not return false
      if (operations.Read(username)) {
        return false;
      }

      // return true if success, false if not


    },

    Delete(username) {
      // add code to delete a user in the database


      // return true if success, false if not


    },


    flushDB() {
      // save to DISK
      // flush the inmemoryDatabase to disk (ie: save the database to disk)
    },


    reloadDB() {
      // reload the database from disk
    }
  };

};

/* Class Approach  */
class SimpleCrudDB {
  // store your records here
  inMemoryDatabase = [];
  // import this and begin to use it
  //fs = require("fs");

  constructor(fileName) {
    this.fileName = fileName;
    // this is the filename you will save to add code below to create that file, or
    // open it when this class is instantiated, ie: your program start, it loads
    // the database from the file, into the this.inMemoryDatabase
  }

  Create(username, password) {
    // add code to store a record in your database
    // return true if success, false if not

    //check if the db exists


    //#1 : check if the user already exists. If yes, return false
    //#2 : add the user to the DB
    this.inMemoryDatabase.push(); //push json
    //#3 : Check DB is the user is there

  };

  Read(username) {
    // add code to read record from database
    // return undefined if no record exists, otherwise, return the record

  }

  Update(username, newRecordData) {
    // add code to update a record in the database


    // return true if success, false if not


  };

  Delete(username) {
    // add code to delete a user in the database


    // return true if success, false if not


  };


  flushDB() {
    // save to DISK
    // flush the inmemoryDatabase to disk (ie: save the database to disk)
  }


  reloadDB() {
    // reload the database from disk
  }
}

let db = new SimpleCrudDB('./database.json');
let db = new SimpleCrudDB('./database.txt');

module.exports = crudDB;