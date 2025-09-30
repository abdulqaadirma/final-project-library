
const users = [
  {
    username: "admin",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "admin@library.com",
    firstName: "John",
    lastName: "Smith",
    role: "admin"
  },
  {
    username: "librarian1",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "librarian1@library.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "librarian"
  },
  {
    username: "librarian2",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "librarian2@library.com",
    firstName: "Michael",
    lastName: "Brown",
    role: "librarian"
  },
  {
    username: "member1",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member1@email.com",
    firstName: "Mike",
    lastName: "Davis",
    role: "member"
  },
  {
    username: "member2",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member2@email.com",
    firstName: "Emily",
    lastName: "Wilson",
    role: "member"
  },
  {
    username: "member3",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member3@email.com",
    firstName: "David",
    lastName: "Miller",
    role: "member"
  },
  {
    username: "member4",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member4@email.com",
    firstName: "Lisa",
    lastName: "Taylor",
    role: "member"
  },
  {
    username: "member5",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member5@email.com",
    firstName: "James",
    lastName: "Anderson",
    role: "member"
  },
  {
    username: "member6",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member6@email.com",
    firstName: "Karen",
    lastName: "Thomas",
    role: "member"
  },
  {
    username: "member7",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member7@email.com",
    firstName: "Robert",
    lastName: "Jackson",
    role: "member"
  },
  {
    username: "member8",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member8@email.com",
    firstName: "Nancy",
    lastName: "White",
    role: "member"
  },
  {
    username: "member9",
    password: "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
    email: "member9@email.com",
    firstName: "Paul",
    lastName: "Harris",
    role: "member"
  }
];


/*
    Database - create users table
    insert some users to users table
*/
function initTableUsers(mydb){
    const createQuery = "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL,\
                    email VARCHAR(100) UNIQUE NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL,\
                    role VARCHAR(20) DEFAULT 'member' CHECK(role IN ('admin', 'librarian', 'member')), profile_image VARCHAR(255),\
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME CURRENT_TIMESTAMP, is_active BOOLEAN DEFAULT 1)";
    mydb.run(createQuery, (error) => {
        if(error){
            console.log("ERROR: ", error);
        }else{
            console.log("----> Table users create");
            users.forEach((user)=>{
                const insertQuery = "INSERT INTO users(username, password_hash, email, first_name, last_name, role) \
                                                 values(?, ?, ?, ?, ?, ?)";
                mydb.run(insertQuery, [user.username, user.password, user.email, user.firstName, user.lastName, user.role], (error)=>{
                    if(error){
                        console.log("ERROR: ", error);
                    }else{
                        console.log("Line add into users table");
                    }
                })
            })
        }
    })
}

module.exports = {initTableUsers};