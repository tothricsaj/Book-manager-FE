import React from 'react';
import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div>
			<h2>Book manager app</h2>
			<Link to="books">Books</Link> 
		</div>
	)
};