const {user} = require('../models'); 
const bcrypt = require('bcryptjs'); 
const {UserInputError} = require('apollo-server'); 

module.exports = {
    Query: {
        getUsers: async () => {
            try {
              const users = await user.findAll();
              return users;  
            } catch (err){
                console.log(err); 
            }
        }
    }, 
    Mutation: {
        register: async (_, args) => {
            const {username, email, password, confirmPassword} = args; 
            let errors = {}; 
            try{
                //validate data 
                if(email.trim() === '') errors.email = "Email must not be empty"; 
                if(username.trim() === '') errors.username = "Username must not be empty"; 
                if(password.trim() === '') errors.password = "Password must not be empty"; 
                if(confirmPassword.trim() === '') errors.password = "Confirm Password must not be empty"; 
                if(password !== confirmPassword) errors.password = "Passwords do not match"; 
                //check that username and email already exist
                if(Object.keys(errors).length > 0){
                      throw new UserInputError("Incorrect input", {errors}); 
                }
                //hash the password
                hashedPassword = await bcrypt.hash(password, 6); 

                //create User
                const newUser = await user.create({
                    username, email, password: hashedPassword, 
                })
                
                //return new User
                return newUser; 
            }catch(err){
                if(err.name === 'SequelizeUniqueConstraintError'){
                     err.errors.forEach(e => {errors[e.path] = `${e.path} is already taken`}); 
                } 
                else if(err.name === 'SequelizeValidationError'){
                    err.errors.forEach(e => errors[e.path] = e.message); 
                }
                throw new UserInputError('Bad Input', {errors}); 
            }
        }
    }
}