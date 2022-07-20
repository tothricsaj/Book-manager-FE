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
	const { id, title, author, genre, pubYear } = book;

	const [queryVar, setQueryVar] = useState({});
	const [inputsVals, setInputsVals] = useState(bookInitValue);

	const refTitle = useRef(null);
	const refAuthor = useRef(null);
	const refGenre = useRef(null);
	const refPubYear = useRef(null);

	useEffect(() => {
		setInputsVals({
			title: title,
			author: author,
			genre: genre,
			pubYear: pubYear
		})
		console.log('id type -> ', typeof +id);
		
	}, []);

	const handleInputChange = (event) => {
		const {name, value} = event.target;

		setInputsVals({
			...inputsVals,
			[name]: value
		});

		setQueryVar(createQueryVariables());
	};

	const createQueryVariables = () => {
		return {
			id: +id,
			...(title !== refTitle.current.value) ? {title: refTitle.current.value} : null,
			...(author !== refAuthor.current.value) ? {author: refAuthor.current.value} : null,
			...(genre !== refGenre.current.value) ? {genre: refGenre.current.value} : null,
			...(pubYear.toString() !== refPubYear.current.value) ? {pubYear: refPubYear.current.value} : null,
		}
	}

	const updateBook = (event) => {
		event.preventDefault();
		graphqlQuery.variables.bookValues = queryVar;

		console.log('graphqlQuery.variables -> ', graphqlQuery.variables);
		

		const fetchingData = async () => {
			const response = await fetch('http://localhost:3005/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(graphqlQuery)
			});
			const updatedBook = await response.json();
			console.log('updatedBook -> ', updatedBook);
			
		};

		fetchingData();
	};

	return (
		<>
			<h2>BookForm {id}</h2>
			<form onSubmit={updateBook}>
				<input type="text" name="title" value={inputsVals.title} ref={refTitle} onChange={handleInputChange} />
				<input type="text" name="author" value={inputsVals.author} ref={refAuthor} onChange={handleInputChange}/>
				<input type="text" name="genre" value={inputsVals.genre} ref={refGenre} onChange={handleInputChange}/>
				<input type="text" name="pubYear" value={inputsVals.pubYear} ref={refPubYear} onChange={handleInputChange}/>
				
				<input type="submit" value="Update book" />
			</form>
		</>
	)
}