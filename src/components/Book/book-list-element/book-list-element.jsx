import React from 'react';
import * as classes from './book-list-element.module.css';

export const BookListElementFragment = `
		fragment BookListElementFragment on Book {
			id
			title
			author
			genre
			pubYear
		}
`;

export const BookListElement = ({ data }) => {
	const {id, title, author, genre, pubYear} = data;

	return (
		<li data-book-id={id} className={classes.wrapper}>
			<div>
				<h3>{ title }</h3>
			</div>
			<div>
				<h4>{ author }</h4>
			</div>
			<div>
				<p>{ genre }</p>
			</div>
			<div>
				<p>{ pubYear}</p>
			</div>
		</li>
	);
};