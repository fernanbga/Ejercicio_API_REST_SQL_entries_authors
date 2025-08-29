const entry = require('../models/entries.model');

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
  let entries;
    try{ 
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getALLEntries();
    }
    if (!entries){
         return res.status(404).json({ message: 'Entry not found'});
    }
     res.status(200).json(entries);
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// POST http://localhost:3000/api/entries
// let newEntry = {
//   "title": "Noticias Nuevas",
//   "content": "Holaaaaaa",
//   "email": "guilleeeeee@thebridgeschool.es",
//   "category": "sucesos"
// }
const createEntry = async (req, res) => {
    try {
        // const {title, content, email, category} = req.body;
        const newEntry = req.body; // {title,content,email,category}
        if (!newEntry.title || !newEntry.content || !newEntry.email || !newEntry.category){
           res.status(400).json({ msj: "Datos Obligatorios faltantes"}); 
        }
        const response = await entry.createEntry(newEntry);
        res.status(201).json({
            "items_created": response,
            data: newEntry
        });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// PUT http://localhost:3000/api/entries
// let updatedEntry = {
//   "oldTitle": "El rayo gana la champions",
//   "newTitle": "El rayo contrata a Cris",
//   "content": "Rinde Bien",
//   "email": "alejandru@thebridgeschool.es",
//   "category": "deportes"
// }
const updateEntry = async (req, res) => {
    try{
        const updatedEntry = req.body;
        if (!updatedEntry.oldTitle || !updatedEntry.newTitle || !updatedEntry.content || !updatedEntry.email || !updatedEntry.category){
            res.status(400).json({ msj: "Datos Obligatorios faltantes"});
        }
        const response = await entry.updateEntry(updatedEntry);
        res.status(200).json({
            "items_updated": response,
            "Modificado correctamente": updatedEntry.oldTitle,
            data: updatedEntry
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

// DELETE http://localhost:3000/api/entries
// {
//  "title": "Amanece Madrid lleno de arena"
// }
const deleteEntry = async (req, res) => {
    try{
        const {title} = req.body;
        if(!title){
           res.status(400).json({ msj: "Título no válido"}); 
        }
        const response = await entry.deleteEntry(title);
        res.status(200).json({
            "Borrado": title
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
}