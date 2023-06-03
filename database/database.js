const books = [
    {
        ISBN: "12345Book",
        title: "OnePiece",
        pubDate: "1998-07-15",
        language: "en",
        numPage: 450,
        author: [1,2],
        publications:[1],
        category: ["manga","supernatural","shonen","fantasy"]
    }
]

const author=[
    {
        id:1,
        name:"Eichiro Oda",
        books:["12345Book","End of OP"]
    },
    {
        id:2,
        name:"Robin",
        books:["12345Book"]
    }
]

const publication=[
    {
        id:1,
        name:"writex",
        books:["12345Book"]
    },
    {
        id:2,
        name:"Toei",
        books:[]
    }
]

//exporting database
module.exports = {books,author,publication}