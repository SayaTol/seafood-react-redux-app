import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../app/recipeSlice";

import {
	Card,
	CardContent,
	Divider,
	Grid,
	CardMedia,
	CardHeader	
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

function Recipies() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state);
	let params = useParams();
	const [allRecipies, setAllRecipies] = useState([]);
	const howManyElements = 8;
	const [pageNow, setPageNow] = useState(Number(params?.page) || 0);
	const [howManyPages, setHowManyPages] = useState(0);
	const start = pageNow === 0 ? 0 : pageNow * howManyElements;
	const end = start + howManyElements;
	//const recipiesToShow = allRecipies.slice(start, end)

	useEffect(() => {
		dispatch(callAPI());
		setAllRecipies(data.meals);
	}, []);
	console.log(data);
	//console.log(allRecipies);

	useEffect(() => {
		setHowManyPages(Math.ceil(allRecipies.length / howManyElements));
	}, [allRecipies]);

	const handlerPage = (value) => {
		setPageNow(value);
	};
	const btn = new Array(howManyPages).fill("pages");
	//	console.log(btn);

	const styleHeader = {
		height: 50,
	};

	return (
		<>
			<h1> Recipes </h1>

			{btn.map((btn, index) => {
				return (
					<Link to={`/page/${index + 1}`}>
						<button
							key={btn + index}
							onClick={() => handlerPage(index)}
							className="pagination"
						>
							{index + 1}
						</button>
					</Link>
				);
			})}

			<Grid container spacing={2} style={styleHeader}>
				{allRecipies.slice(start, end).map((recipe) => {
					return (
						<Grid item sx={6} md={3}>
							<Card>
								<CardHeader title={recipe.strMeal} />
								<Divider />
								<CardContent>
									<CardMedia
										component="img"
										image={recipe.strMealThumb}
										height="200"
									/>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

export default Recipies;