import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

export const BookPage = () => {
	const urlParams = useParams();
	useEffect(() => {
		console.log('BookPage');
	}, []);

	return (
		<h2>Book Page {urlParams.bookId}</h2>
	)
};
