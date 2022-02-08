import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
export const Table = () => {
	const [data, setdata] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/profile")
			.then(function (response) {
				// handle success
				// console.log(response);
				setdata(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	}, []);
	setTimeout(console.log(data), 0);

	return (
		<>
			<h1>
				hey its
				workingxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdf
				{data.map((e) => (
					<div key={e.id}>{e.Name}</div>
				))}
			</h1>
		</>
	);
};
