const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");
const dbFile = "library.sqlite3";
db = new sqlite3.Database(dbFile);


const users = [
];


/*
    Database - create users table
    insert some users to users table
*/
function initTableUsers() {
  //mydb.run("DROP TABLE users");
  const createQuery = "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL,\
                  email VARCHAR(100) UNIQUE NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL,\
                  role VARCHAR(20) DEFAULT 'member' CHECK(role IN ('admin', 'librarian', 'member')), profile_image VARCHAR(255),\
                  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME CURRENT_TIMESTAMP, is_active BOOLEAN DEFAULT 1)";
  db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table users create");
      users.forEach((user) => {
        const insertQuery = "INSERT INTO users(username, password_hash, email, first_name, last_name, role) \
                                                values(?, ?, ?, ?, ?, ?)";
        db.run(insertQuery, [user.username, user.password, user.email, user.firstName, user.lastName, user.role], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into users table");
          }
        })
      })
    }
  })
}

// get all users
function getUsers() {
  return new Promise((resolve, reject)=>{
    const query = "SELECT * FROM users";
    db.all(query, (error, users)=>{
      if(error){
        reject(error);
      }else{
        resolve(users);
      }
    })
  })
}

// get a user either by username or email
async function getUserByUsernameOrEmail(usernameOrEmail) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.get(query, [usernameOrEmail, usernameOrEmail], (error, user) => {
      if (error) {
        reject(error);
      } else {
        //console.log("sucess to get usernameOrEmail");
        resolve(user);
      }
    })
  })
}

// add new user
async function addUser(username, password, email, first_name, last_name, role) {
  const password_hash = await hashPassword(password, 12);
  //console.log(password_hash);
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users(username, password_hash, email, first_name, last_name, role) values(?, ?, ?, ?, ?, ?)"
    db.run(query, [username, password_hash, email, first_name, last_name, role], (error) => {
      if (error) {
        console.log("ERROR: ", error);
        reject(error);
      } else {
        //console.log("Line add into users table");
        resolve("success added");
      }
    })
  })
}

// update a user
async function updateUser(username, password, email, first_name, last_name, role) {
  const password_hash = await hashPassword(password, 12);
  return new Promise((resolve, reject)=>{
    const query = "UPDATE users SET first_name = ?, last_name = ?, password_hash = ?, role = ? WHERE username = ? AND email = ?";
    db.run(query, [first_name, last_name, password_hash, role, username, email], (error)=>{
      if(error){
        reject(error);
      }else{
        resolve("success updated");
      }
    })

  })
}

// delete a user
async function deleteUser(username) {
  return new Promise((resolve, reject)=>{
    const query = "DELETE FROM users WHERE username = ?";
    db.run(query, [username], (error)=>{
      if(error){
        reject(error);
      }else{
        resolve("seccess deleted");
      }
    })
  })
}


function hashPassword(pass, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pass, saltRounds, (error, hash) => {
      if (error) reject(error);
      else resolve(hash);
    });
  });
}

function bcryptPassword(hashPass, password){
  return new Promise((resolve, reject)=>{
    bcrypt.compare(hashPass, password, (error, pass)=>{
      if(error){
        reject(error);
      }else{
        resolve(pass);
      }
    })
  })
  
}


module.exports = { initTableUsers, getUsers, addUser, getUserByUsernameOrEmail, bcryptPassword , updateUser, deleteUser };