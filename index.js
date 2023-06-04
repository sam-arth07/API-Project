require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
var bodyParser = require("body-parser")
//Database
const database = require("./database/database.js")

//Models
const BookModel = require("./database/book.js")
const AuthorModel = require("./database/author.js")
const PublicationModel = require("./database/publication.js")

//initialise express
const booky = express()

//use bodyParser
booky.use(bodyParser.urlencoded({extended:true}))
booky.use(bodyParser.json())

//connecting to MongoDB
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection Established!"))

//GET

/*
Route           /
Description     Get all the books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

/*BEFORE*/
// booky.get("/",(req,res)=>{
//     return res.json({books:database.books})
// })

/*AFTER*/
booky.get("/",async (req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

/*
Route           /is
Description     Get Specific book based on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/

/*BEFORE*/
// booky.get("/is/:isbn",(req,res)=>{
//     const getSpecificBook = database.books.filter((book)=>book.ISBN === req.params.isbn)
    // if (getSpecificBook.length===0){
    //     return res.json({error:`No Books found for ISBN ${req.params.isbn}`})
    // }
//     return res.json({book:getSpecificBook})
// })

/*AFTER*/
booky.get("/is/:isbn",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn})
    // if no book found ,i.e, null
    if (!getSpecificBook){
        return res.json({error:`No Books found for ISBN ${req.params.isbn}`})
    }
    return res.json(getSpecificBook)
})

/*
Route           /c
Description     Get Specific book based on category 
Access          PUBLIC
Parameter       category
Methods         GET
*/

/*BEFORE*/
// booky.get("/c/:category",(req,res)=>{
//     const getSpecificBook = database.books.filter((book)=>book.category.includes(req.params.category))
//     if(getSpecificBook.length === 0){
//         return res.json({error:`No Books found for category ${req.params.category}`})
//     }
//     return res.json({book:getSpecificBook})
// })

/*AFTER*/
booky.get("/c/:category",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({category:req.params.category})
    if(!getSpecificBook){
        return res.json({error:`No Books found for category ${req.params.category}`})
    }
    return res.json(getSpecificBook)
})
/*
Route           /lang
Description     Get Specific book based on language 
Access          PUBLIC
Parameter       language
Methods         GET
*/

/*BEFORE*/
// booky.get("/lang/:language",(req,res)=>{
//     const getSpecificBook = database.books.filter((book)=>book.language===req.params.language)
//     if(getSpecificBook.length === 0){
//         return res.json({error:`No Books found for language ${req.params.language}`})
//     }
//     return res.json({book:getSpecificBook})
// })

/*AFTER*/
booky.get("/lang/:language",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({language:req.params.language})
    if(!getSpecificBook){
        return res.json({error:`No Books found for language ${req.params.language}`})
    }
    return res.json(getSpecificBook)
})
/*
Route           /author
Description     Get all authors 
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

/*BEFORE*/
// booky.get("/author",(req,res)=>{
//     return res.json({authors:database.author})
// })

/*AFTER*/
booky.get("/author",async (req,res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
})

/*
Route           /author
Description     Get specific author based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/

/*BEFORE*/
// booky.get("/author/:name",(req,res)=>{
//     const getSpecificAuthor = database.author.filter((auth)=>auth.name === req.params.name)
//     if(getSpecificAuthor.length===0){
//         return res.json({error:`No Authors Found by the name ${req.params.name}`})
//     }
//     return res.json({authors:getSpecificAuthor})
// })

/*AFTER*/
booky.get("/author/:name",async (req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({name:req.params.name})
    if(!getSpecificAuthor){
        return res.json({error:`No Authors Found by the name ${req.params.name}`})
    }
    return res.json(getSpecificAuthor)
})

/*
Route           /author/book
Description     Get specific author based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
/*BEFORE*/
// booky.get("/author/book/:isbn",(req,res)=>{
//     const getSpecificAuthor = database.author.filter((auth)=>auth.books.includes(req.params.isbn))
//     if(getSpecificAuthor.length===0){
//         return res.json({error:`No Authors found for the book ${req.params.isbn}`})
//     }
//     return res.json({authors:getSpecificAuthor})
// })

/*AFTER*/
booky.get("/author/book/:isbn",async (req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({books:req.params.isbn})
    if(!getSpecificAuthor){
        return res.json({error:`No Authors found for the book ${req.params.isbn}`})
    }
    return res.json(getSpecificAuthor)
})
/*
Route           /pub
Description     Get all the publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
/*BEFORE*/
// booky.get("/pub",(req,res)=>{
//     return res.json({publications:database.publication})
// })

/*AFTER*/
booky.get("/pub",async (req,res)=>{
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
})

/*
Route           /pub
Description     Get specific publication based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/
/*BEFORE*/
// booky.get("/pub/:name",(req,res)=>{
//     const getSpecificPub = database.publication.filter((pub)=>pub.name === req.params.name)
//     if(getSpecificPub.length===0){
//         return res.json({error:`No publications found with name ${req.params.name}`})
//     }
//     return res.json({publications:getSpecificPub})

// })

/*AFTER*/
booky.get("/pub/:name",async (req,res)=>{
    const getSpecificPub = await PublicationModel.findOne({name:req.params.name})
    if(!getSpecificPub){
        return res.json({error:`No publications found with name ${req.params.name}`})
    }
    return res.json(getSpecificPub)
})

/*
Route           /pub/book
Description     Get specific publication based on isbn of books published
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
/*BEFORE*/
// booky.get("/pub/book/:isbn",(req,res)=>{
//     const getSpecificPub = database.publication.filter((pub)=>pub.books.includes(req.params.isbn))
//     if(getSpecificPub.length===0){
//         return res.json({error:`No publications found for book ${req.params.isbn}`})
//     }
//     return res.json({publications:getSpecificPub})

// })

/*AFTER*/
booky.get("/pub/book/:isbn",async (req,res)=>{
    const getSpecificPub = await PublicationModel.findOne({books:req.params.isbn})
    if(!getSpecificPub){
        return res.json({error:`No publications found for book ${req.params.isbn}`})
    }
    return res.json(getSpecificPub)

})

/**************POST***********/
/*
Route           /book/new
Description     Add New Books
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
/*BEFORE*/
// booky.post("/book/new",(req,res)=>{
//     const newBook = req.body
//     database.books.push(newBook)
//     return res.json({updatedBooks : database.books})
// })

/*AFTER*/
booky.post("/book/new",async (req,res)=>{
    const { newBook } = req.body
    const addNewBook = BookModel.create(newBook)

    return res.json({
        books:addNewBook,
        message:"Book was Successfully Added!"
    })
})

/*
Route           /author/new
Description     Add New Author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/author/new",(req,res)=>{
    const { newAuthor } = req.body
    const addNewAuthor = AuthorModel.create(newAuthor)
    return res.json({
        author:addNewAuthor,
        message:"Author added Successfully!"
    })
})

/*
Route           /pub/new
Description     Add New Publications
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/pub/new",(req,res)=>{
    const { newPublication } = req.body
    const addNewPublication = PublicationModel.create(newPublication)
    return res.json({
        publication:addNewPublication,
        message:"Publication added successfully!"
    })
})

/*************PUT**************/
/*
Route           /book/update
Description     Update book title on isbn
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/:isbn",async (req,res)=>{
    const updatedBooks = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            title:req.body.bookTitle
        },
        {
            new:true
        }
    )
    return res.json({
        books:updatedBooks
    })
})
/*
Route           /book/auhtor/update
Description     Update/add new auhtor on isbn of book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/author/update/:isbn",async(req,res)=>{
    //Update the books DB
    const updatedBooks = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {$addToSet : {
            author:req.body.authorId
        }},
        {
            new:true
        }
    )
    //Update the author DB
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id:req.body.authorId
        },
        {$addToSet : {
            books:req.params.isbn
        }},
        {
            new:true
        }
    )
    return res.json({
        books:updatedBooks,
        author:updatedAuthor
    })
})

/*
Route           /pub/update/book
Description     Update / add new publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/pub/update/book/:isbn",(req,res)=>{
    //Task1 = Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn)
        }
    })
    //joh publication ka id match nhi karta but still book included h usme se book ko remove karna h
    database.publication.forEach((pub) => {
        if (!(pub.id === req.body.pubId)){
            if(pub.books.includes(req.params.isbn)){
                const bookIndex = pub.books.indexOf(req.params.isbn)
                return pub.books.splice(bookIndex,1)
            }
        }   
    })
    //Task2 = Update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.publications = [req.body.pubId] 
        } 
    })
    return res.json(
        {
            books : database.books,
            publcations:database.publication,
            message:"Successfully updated publications"
        }
    )
})

/*************DELETE**************/
/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn",async(req,res)=>{
    /* My method to delete books*/
    // database.books.forEach((book)=>{
    //     if (book.ISBN === req.params.isbn){
    //         bookIndex = database.books.indexOf(req.params.isbn)
    //         return database.books.splice(bookIndex,1)
    //     }
    // })

    /* Maam ka method to delete books */
//     const updatedBooksDB = database.books.filter((book)=>
//         book.ISBN !== req.params.isbn
//     )
//     database.books = updatedBooksDB
//     return res.json(database.books)
    
    /*Using MongoDB*/
    const updatedBooksDB = await BookModel.findOneAndDelete(
        {
            ISBN:req.params.isbn
        }
    )
    return res.json(
        {
            books:updatedBooksDB,
            message:"Above Book Successfully deleted"
        }
    )
})



/*
Route           /book/delete/author
Description     Delete an author from book and related book from author
Access          PUBLIC
Parameter       isbn,authorId
Methods         DELETE
*/

//Multiple Params ka use kiya h
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //delete author from book db
    database.books.forEach((book)=>{
        if (book.ISBN === req.params.isbn){
            const authorId = parseInt(req.params.authorId)
            if(book.author.includes(authorId)){
                const authorIndex = book.author.indexOf(authorId)
                return book.author.splice(authorIndex,1)
            }
        }
    })
    //delete related book from author db
    database.author.forEach((auth) => {
        const authorId = parseInt(req.params.authorId)
        if (auth.id === authorId){
            if(auth.books.includes(req.params.isbn)){
                const bookIndex = auth.books.indexOf(req.params.isbn)
                return auth.books.splice(bookIndex,1)
            }
        }
    })
    return res.json({"books" : database.books,"author":database.author})
})

booky.listen(3000,()=>{
    console.log("Successfully started server!");
})