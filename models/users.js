const db = require("./db");
const generalFunction = require("./generalFunction");

const users = [
    {
      "username": "admin",
      "password_hash": "$2b$12$qsYe4uWwMr9fKFWBXnMUHuz.8nbEuu2RnPOkC7hBjQQwzfUiEhHyK",
      "email": "admin@library.com",
      "first_name": "John",
      "last_name": "Smith",
      "role": "admin",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "librarian1",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "librarian1@library.com",
      "first_name": "Sarah",
      "last_name": "Johnson",
      "role": "librarian",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "librarian2",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "librarian2@library.com",
      "first_name": "Michael",
      "last_name": "Brown",
      "role": "librarian",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member1",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member1@email.com",
      "first_name": "Mike",
      "last_name": "Davis",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member2",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member2@email.com",
      "first_name": "Emily",
      "last_name": "Wilson",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member3",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member3@email.com",
      "first_name": "David",
      "last_name": "Miller",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member4",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member4@email.com",
      "first_name": "Lisa",
      "last_name": "Taylor",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member5",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member5@email.com",
      "first_name": "James",
      "last_name": "Anderson",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member6",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member6@email.com",
      "first_name": "Karen",
      "last_name": "Thomas",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member7",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member7@email.com",
      "first_name": "Robert",
      "last_name": "Jackson",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member8",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member8@email.com",
      "first_name": "Nancy",
      "last_name": "White",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member9",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member9@email.com",
      "first_name": "Paul",
      "last_name": "Harris",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    }
]


/*
    Database - create users table
    insert some users to users table
*/
function initTableUsers() {
  //db.run("DROP TABLE users");
  const createQuery = "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL,\
                  email VARCHAR(100) UNIQUE NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL,\
                  role VARCHAR(20) DEFAULT 'member' CHECK(role IN ('admin', 'librarian', 'member')), profile_image VARCHAR(255),\
                  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME CURRENT_TIMESTAMP, is_active BOOLEAN DEFAULT 1)";
  db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table users create");
      users.forEach(async(user) => {
        const insertQuery = "INSERT INTO users(username, password_hash, email, first_name, last_name, role, profile_image, is_active) \
                                                values(?, ?, ?, ?, ?, ?, ?, ?)";
        //const password_hash = await generalFunction.hashPassword(user.password, 12);
        db.run(insertQuery, [user.username, user.password_hash, user.email, user.first_name, user.last_name,
          user.role, user.profile_image, user.is_active
        ], (error) => {
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


module.exports = { initTableUsers, adminGetUsers, librarianGetUsers, addUser, getUserByUsernameOrEmail, updateUser, deleteUser, getUserById };