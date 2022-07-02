import React, { useState, useEffect, useMemo } from 'react';

import {BookListElement, BookListElementFragment} from '../book-list-element/book-list-element';

const gqlQuery = {
	query: `
		query BookList {
			books {
				...BookListElementFragment
			}
		}

		${BookListElementFragment}
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
	}, []);

	const books = useMemo(() => {
		return bookList.map(book => (
			<BookListElement key={`book-list-element-${book.id}`} data={book} />
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