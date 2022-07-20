import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

const graphqlQuery = {
	query: 
		`
			query BookById($bookById: queryParamInput) {
				complexBookSearch(params: $bookById) {
					id
					title
					author
					genre
					pubYear
				}
			}
		`,
}

export const BookPage = ({manageBook}) => {
	const urlParams = useParams();
	const { book, setBook } = manageBook;

	useEffect(() => {

		graphqlQuery.variables = {
			bookById: {
				id: +urlParams.bookId
			}
		};

		const fetchingData = async () => {
			const response = await fetch('http://localhost:3005/graphql', {
				method: 'POST', // TODO: is it surley POST?
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(graphqlQuery)
			});
			const fetchedBook = await response.json();

			setBook({...fetchedBook.data.complexBookSearch[0]});
		}

		fetchingData();
	}, []);

	return (
		<>
			<h2>{book.title || 'title'}</h2>
			<h3>{book.author || 'author'}</h3>
			<h3>{book.genre || 'genre'}</h3>
			<h3>{book.pubYear || 'pubYear'}</h3>

			<Link to={`/book/update/${book.id}`}>Update</Link>
		</>
	)
};
