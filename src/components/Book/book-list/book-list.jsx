import React, { useState, useEffect, useMemo } from 'react';

const gqlQuery = {
	query: `
		query BookList {
			books {
				id
				title
				author
				genre
				pubYear
			}
		}
	`
}

export const BookList = () => {

	const [bookList, setBookList] = useState([]);

	useEffect(() => {
		const fetchingData = async () => {
			const response = await fetch('http://localhost:3005/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(gqlQuery)
			});
			const fetchedBooks = await response.json();

			setBookList([...fetchedBooks.data.books]);
		}

		fetchingData();

		console.log(bookList);
	}, []);

	const books = useMemo(() => {
		return bookList.map(book => (
			<li key={book.id}>
				{book.title}
			</li>
		))
	}, [bookList]);

	return (
		<>
			<h2>BookList</h2>
			<ul>{ books }</ul>
		</>
	);
}

export const BookListSomeStr = 'SomeStr';