import {
    getAll,
    getById,
    create,
    update,
    remove,
    existsByUserName
  } from '../repositories/userRepo.js';

  export async function getAllUsers() {
    return await getAll();
  }


export async function getUserById(id){
    let result = await getById(id); 
    if (result) return result;       
    else {
      const error = new Error(`Cannot find user with id ${id}`);
      error.status = 404;
      throw error;
    }
}

 export async function createUser(data) {
    if (await existsByUserName(data.username)) {
        const error = new Error(`Username already taken: ${data.username}`);
        error.status = 400; 
        throw error;
      }
    return await create(data);  
  }


  export async function updateUser(id, data) {
    const updatedUser = await update(id, data); 
    if (updatedUser) return updatedUser;     
    else {
      const error = new Error(`Cannot find user with id ${id}`);
      error.status = 404;
      throw error;
    }
  }


 export async function deleteUser(id) {
    const result = await remove(id);  
    if (!result) {
      const error = new Error(`Cannot find user with id ${id}`);
      error.status = 404;
      throw error;
    }
    
    return true;  
  }
  

  



  


