const queries = {
    getAllAuthors:`SELECT * FROM authors`,
    getAuthorByEmail:`SELECT * FROM authors
    WHERE email=$1`,
    createAuthor:`INSERT INTO authors(name,surname,email,image)
    VALUES($1,$2,$3,$4)`,
    updateAuthor:`UPDATE authors
    SET name=$2, surname=$3, email=$4, image=$5
    WHERE email=$1;`,
    deleteAuthor:`DELETE FROM authors
    WHERE email=$1`
}

module.exports = queries;