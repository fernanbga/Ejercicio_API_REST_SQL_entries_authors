const entry = require('../models/authors.model');

// GET http://localhost:3000/api/authors --> ALL
// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
const getAuthors = async (req, res) => {
    let authors;
        try{
            if(req.query.email) {
                authors = await entry.getAuthorByEmail(req.query.email);
            }
            else {
                authors = await entry.getAllAuthors();
            }
            if (!authors){
                return res.status(404).json({ message: 'Entry not found'});
            }
        res.status(200).json(authors);
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// POST http://localhost:3000/api/authors
// let newAuthor = {
//     "name":"Hugo",
//     "surname":"Rodriguez",
//     "email":"alejandru@thebridgeschool.es",
//     "image":"https://randomuser.me/api/portraits/thumb/men/75.jpg"}
const createAuthor = async (req, res) => {
    try{
        const newAuthor = req.body; // {name,surname,email,image}
        if (!newAuthor.name || !newAuthor.surname || !newAuthor.email || !newAuthor.image){
           res.status(400).json({ msj: "Faltan datos obligatorios"}); 
        }
        const response = await entry.createAuthor(newAuthor);
        res.status(201).json({
            "items_created": response,
            data: newAuthor
        });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

// PUT http://localhost:3000/api/authors
// let updatedAuthor = {
//   "oldEmail": "alejandru@thebridgeschool.es",
//   "name": "Al",
//   "surname": "Alex",
//   "newEmail": "alejando@thebridgeschool.es",
//   "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }
const updateAuthor = async (req,res) => {
    try{
        const updatedAuthor = req.body;
        if(!updatedAuthor.oldEmail || !updatedAuthor.name || !updatedAuthor.surname || !updatedAuthor.newEmail || !updatedAuthor.image){
            res.status(400).json({ msj: "Faltan datos obligatorios"});
        }
        const response = await entry.updateAuthor(updatedAuthor);
        res.status(200).json({
            "items_updated": response,
            "Usuario actualizado": updatedAuthor.oldEmail,
            data: updatedAuthor
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

// DELETE http://localhost:3000/api/authors
//{
//  "email": "alejandru@thebridgeschool.es"
//}
const deleteAuthor = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            res.status(400).json({ msj: "Falta email valido"}); 
        }
        const response = await entry.deleteAuthor(email);
        res.status(200).json({
            "Se ha borrado el usuario": email
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}