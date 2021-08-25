/* CRUD Operation Practice : Create module */
const fs = require("fs");

const crudDB = () => {

  // store your records here
  let inMemoryDB = [];

  //directory and db name
  const dirPath = "./dbFolder/";
  const crudDB = "crudDB.json";

  //methods object
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
      // return undefined if no record exists, otherwise, return the record or undefinded
      let result = inMemoryDB.find(e => e.loginUserName === username);
      return result;
    },

    Update(username, newRecordData) {
      //#1 : check if the target user exists, if not return false
      if (operations.Read(username) === undefined) {
        return false;
      } else {
        //#2 find the index of the new data
        let indexToBeUpdated = inMemoryDB.indexOf(newRecordData);
        //#3 update a record 
        inMemoryDB.splice(indexToBeUpdated, 1, newRecordData);
        return true;
      }
    },

    Delete(username) {
      //#1 : check if the target user exists, if not return false
      let recordToBeDeleted = operation.Read(username);
      if (recordToBeDeleted === undefined) {
        return false;
      } else {
        //#2 find the index of the new data
        let indexToBeUpdated = inMemoryDB.indexOf(recordToBeDeleted);
        //#3 update a record with an empty object
        inMemoryDB.splice(indexToBeUpdated, 1, {});
        return true;
      }
    },

    flushDB(record) {
      //* note : record is supposed to be an json format
      //#1 : check if the db path exists
      if (checkDirectory(dirPath)) {
        //#2 : check if db (file) exists in the db path
        if (checkDB(dirPath, crudDB)) {
          //#3 : update db (file)
          createOrUpdateDB(record);
        } else {
          //#4 : create a new db (file)
          createOrUpdateDB({});
        }
      } else {
        //create a new directory and a new db (files)
        craeteDirectory();
        createOrUpdateDB({});
      }
    },

    reloadDB() {
      //#1 : check if the db path exists
      if (checkDirectory(dirPath)) {
        //#2 : list up db
        for (let i = 0; i < fs.readdirSync(dirPath).length; i++) {
          return fs.readdirSync(dirPath)[i], true;
        }
      } else {
        console.error(`Failed to load DB`);
        return false;
      }
    },

    checkDirectory(dirPath) {
      if (fs.existsSync(`${dirPath}`)) {
        return true;
      } else {
        return false;
      }
    },

    craeteDirectory() {
      fs.mkdir("./dbFolder", (error) => {
        if (error) {
          console.error(`Failed to create a new db path ${error}`);
          return false;
        } else {
          //success!
          return true;
        }
      });
    },

    checkDB(dirPath, dbName) {
      if (fs.existsSync(`${dirPath}${dbName}`)) {
        return true;
      } else {
        return false;
      }
    },

    createOrUpdateDB(record) {
      fs.writeFile(`${dirPath}${crudDB}`, record, (error) => {
        if (error) {
          console.error(`${error}: A new db failed to be created`);
          return false;
        } else {
          console.log("A new file has successfully been created!");
          return true;
        }
      });
    }
  };

};

module.exports = crudDB;