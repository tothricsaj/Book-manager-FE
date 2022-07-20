import React, { useRef, useState, useEffect } from 'react';

const graphqlQuery = {
	query: 
		`
			mutation UpdateBook($bookValues: updateBookInput) {
				updateBook(updateBook: $bookValues)
			}
		`,
	variables: {
		bookValues: {}
	}
}

const bookInitValue = {
	title: '',
	author: '',
	genre: '',
	pubYear: '',
};


export const BookForm = ({book}) => {
	const { title, author, genre, pubYear } = book;

	const [queryVar, setQueryVar] = useState({});
	const [inputsVals, setInputsVals] = useState(bookInitValue);

	const bookTitle = useRef(title);
	const bookAuthor = useRef(author);
	const bookGenre = useRef(genre);
	const bookPubYear = useRef(pubYear);

	useEffect(() => {
		setInputsVals({
			title: title,
			author: author,
			genre: genre,
			pubYear: pubYear
		})
	}, []);

	const handleInputChange = (event) => {
		const {name, value} = event.target;

		setInputsVals({
			...inputsVals,
			[name]: value
		});

		setQueryVar(createQueryVariables());
		console.log('queryVar -> ', queryVar);
	};

	const createQueryVariables = () => {
		return {
			...(title !== bookTitle.current.value) ? {title: bookTitle.current.value} : null,
			...(author !== bookAuthor.current.value) ? {author: bookAuthor.current.value} : null,
			...(genre !== bookGenre.current.value) ? {genre: bookGenre.current.value} : null,
			...(pubYear !== bookPubYear.current.value) ? {pubYear: bookPubYear.current.value} : null,
		}
	}

	return (
		<>
			<h2>BookForm</h2>
			<input type="text" name="title" value={inputsVals.title} ref={bookTitle} onChange={handleInputChange} />
			<input type="text" name="author" value={inputsVals.author} ref={bookAuthor} onChange={handleInputChange}/>
			<input type="text" name="genre" value={inputsVals.genre} ref={bookGenre} onChange={handleInputChange}/>
			<input type="text" name="pubYear" value={inputsVals.pubYear} ref={bookPubYear} onChange={handleInputChange}/>
		</>
	)
}