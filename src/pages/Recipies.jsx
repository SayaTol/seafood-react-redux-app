import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../app/recipeSlice";

import {
	Card,
	CardContent,
	Divider,
	Grid,
	CardMedia,
	Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

function Recipies() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.meals.recipes);
	const data2 = useSelector((state) => state.search.searchData);
	console.log(data2, "it is data from search");
	console.log(data, "it is from seafood");

	let params = useParams();
	const [allRecipies, setAllRecipies] = useState([]);
	const howManyElements = 6;
	const [pageNow, setPageNow] = useState(Number(params?.page) || 0);
	const [howManyPages, setHowManyPages] = useState(0);
	const start = pageNow === 0 ? 0 : pageNow * howManyElements;
	const end = start + howManyElements;

	useEffect(() => {
		dispatch(callAPI());
	}, [dispatch]);

	useEffect(() => {
		setAllRecipies(data2);
	}, [data2]);

	useEffect(() => {
		setHowManyPages(Math.ceil(allRecipies?.length / howManyElements));
	}, [allRecipies]);

	const handlerPage = (value) => {
		setPageNow(value);
	};

	const btn = new Array(howManyPages).fill("pages");

	const styleHeader = {
		height: 50,
	};

	return (
		<>
			<h1 className="title"> Seafood recipes for every day </h1>

			
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
						<Grid key={recipe.idMeal} item sx={10} md={4}>
							<Card>
								<CardContent>
									<CardMedia
										component="img"
										image={recipe.strMealThumb}
										height="300"
									/>
								</CardContent>
								<Divider />
								<CardContent>
									<Typography variant="button">{recipe.strMeal}</Typography>
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