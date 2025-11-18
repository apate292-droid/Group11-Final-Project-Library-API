import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } from "../services/userService.js";

  export async function getAllUsersHandler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
  }

  export async function getUserByIdHandler(req, res) {
    let id = parseInt(req.params.id);
    let user = await getUserById(id);
    res.status(200).json(user);
  }


  export async function createUserHandler(req,res){
    const data = req.body
    let newUser = await createUser(data);
    res.status(201).json(newUser);
  }

  export async function updateUserHandler(req, res) {
    let id = parseInt(req.params.id);
    let updates = req.body;
    const updatedUser = await updateUser(id, updates);
    res.status(200).json(updatedUser);
  }


  export async function deleteUserHandler(req, res) {
    let id = parseInt(req.params.id);
    await deleteUser(id);
    res.status(204).send(); 
 }
    


    


  







  