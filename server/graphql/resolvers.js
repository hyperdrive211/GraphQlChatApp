const {user} = require('../models'); 

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
            try{
                //validate data 

                //check that username and email already exist

                //check that passwords match

                //create User

                //return User

            }catch(err){
                throw new Error(err); 
            }
        }
    }
}