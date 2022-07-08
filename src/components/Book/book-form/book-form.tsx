import React from 'react';
import { useParams } from "react-router-dom";

export const BookForm = () => {
	const book = useParams();

	return (
		<>
			<h2>BookForm</h2>
			<h3>{book.bookId}</h3>
		</>
	)
}