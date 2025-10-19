const db = require("./db");
const generalFunction = require("./generalFunction");

// get all users
function adminGetUsers() {
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

// librarian can see and modify only memeber (not librarin and not admin)
function librarianGetUsers() {
  return new Promise((resolve, reject)=>{
    const query = "SELECT * FROM users WHERE role != 'admin' AND role != 'librarian';";
    db.all(query, (error, users)=>{
      if(error){
        reject(error);
      }else{
        resolve(users);
      }
    })
  })
}

// get user by id
async function getUserById(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.get(query, [id], (error, user) => {
      if (error) {
        reject(error);
      } else {
        //console.log("sucess to get usernameOrEmail");
        resolve(user);
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
  const password_hash = await generalFunction.hashPassword(password, 12);
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
async function updateUser(id, password, first_name, last_name, role) {
  const password_hash = await generalFunction.hashPassword(password, 12);
  return new Promise((resolve, reject)=>{
    const query = "UPDATE users SET first_name = ?, last_name = ?, password_hash = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.run(query, [first_name, last_name, password_hash, role, id], (error)=>{
      if(error){
        reject(error);
      }else{
        resolve("success updated");
      }
    })

  })
}

// delete a user
async function deleteUser(id) {
  return new Promise((resolve, reject)=>{
    const query = "DELETE FROM users WHERE id = ?";
    db.run(query, [id], (error)=>{
      if(error){
        reject(error);
      }else{
        resolve("seccess deleted");
      }
    })
  })
}

module.exports = { adminGetUsers, librarianGetUsers, addUser, getUserByUsernameOrEmail, updateUser, deleteUser,
                   getUserById };