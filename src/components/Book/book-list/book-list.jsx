import React, { useState, useEffect, useMemo } from 'react';
import * as classes from './book-list.module.css';

import { Link, Outlet } from "react-router-dom";

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
			<Link to={`/book/${book.id}`} key={`book-list-element-${book.id}`}>
				<BookListElement data={book} />
			</Link>
		))
	}, [bookList]);

	return (
		<div className={classes.wrapper}>
			<ul className={classes.bookListWrapper}>{ books }</ul>
			<Outlet />
		</div>
	);
}

export const BookListSomeStr = 'SomeStr';