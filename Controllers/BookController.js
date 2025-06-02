const Book = require("..Models/Books.js");

//Control to create a book
exports.CreateBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json(book);
    } catch (error){
        res.status(500).json({message:error.message})
    }
}

//Control to view all the books
exports.getAllBook = async (req, res) => {
    try{
        const book = await Book.find({});
        res.status(200).json(book);
    } catch(error){
        res.status(500).json({message:error.message})
    }
}

//control to view a specific Book using ID
exports.getOneBook = async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error){
        res.status(500).json({message:error.message})
    }
}

//Control to update a book
exports.UpdateOneBook = async (req, res)=> {
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book){
            return res.status(404).json({message:"Book Not Found!!"})
        }
        const updatedBook = await findById(id);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//Control to delete a book
exports.DeleteBook = async (req, res)=> {
    try{
    const {id} = req.params;
    const book = await Book.findByIdAndDelete(id);
    if(!book) {
        return res.status(404).json({message:"Book Not Found!"})
    }
    res.status(200).json({message:"Book Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}