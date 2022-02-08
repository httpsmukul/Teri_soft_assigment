// All import section
import axios from "axios";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import DateMomentUtils from "@date-io/moment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import "./style/cal.css";
//
// start with component function
function Day() {
	// ALl usestate constant vaible
	const [currentDate, setCurrentData] = useState(null);
	const [show_hobbies, setshow_hobbies] = useState(false);
	const [checked1, setChecked1] = useState(true);
	const [checked2, setChecked2] = useState(false);
	const [checked3, setChecked3] = useState(false);
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [number, setnumber] = useState("");
	const [hobbie, sethobbie] = useState("");
	const [gender, setgender] = useState("");
	const [data, setdata] = useState([]);
	const [deleteele, setdeleteele] = useState("");

	// all handeler_function
	//for gender_handeler function
	const gender_handel = () => {
		console.log("working");
	};
	//for seting gender
	const female = (e) => {
		console.log(e.target.value);
		setgender(e.target.value);
	};
	// hobbie handeler functions
	const hobbie_one = (event) => {
		setChecked1(event.target.checked);
		sethobbie("Reading");
		setChecked2(false);
		setChecked3(false);
	};
	const hobbie_two = (event) => {
		setChecked2(event.target.checked);
		sethobbie("Runging");
		setChecked1(false);
		setChecked3(false);
	};
	const hobbie_three = (event) => {
		setChecked3(event.target.checked);
		sethobbie("Writting");
		setChecked1(false);
		setChecked2(false);
	};
	const handel_hobbies = () => {
		console.log("hobbeies");
		setshow_hobbies(!show_hobbies);
	};

	// main data post function
	const submmit_handel = () => {
		let Date = date(currentDate);
		function date(currentDate) {
			let arr = [];
			if (currentDate != null) {
				let newdate = currentDate._d;
				let data = newdate.toString().split(" ").slice(1, 4);
				// console.log(data);
				arr.push(data[1]);
				arr.push(data[0]);
				arr.push(data[2]);
				let final = arr.join(" ");
				return final;
			}
			return null;
		}
		// here we push data into db.json file
		axios
			.post("http://localhost:3001/profile", {
				Name: name,
				Email: email,
				Number: number,
				DOB: Date,
				Hobbie: hobbie,
				Gender: gender,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	//
	//useEffect section for get data from db.json file
	useEffect(() => {
		axios
			.get("http://localhost:3001/profile")
			.then(function (response) {
				// handle success
				setdata(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);
	//table section for difinding title
	const columns = [
		{ title: "ID", field: "id" },
		{ title: "Name", field: "Name" },
		{ title: "Email", field: "Email" },
		{ title: "Number", field: "Number" },
		{ title: "Hobbies", field: "Hobbie" },
		{ title: "DOB", field: "DOB" },
		{ title: "Gender", field: "Gender" },
	];
	// for delete request for delete button function
	function handel_delete(arr) {
		console.log("deelete");
		console.log(arr);
		let id = arr + 1;
		axios.delete(`http://localhost:3001/profile/${id}`);
		window.location.reload(true);
	}
	//
	//start with page data
	return (
		<>
			{/* starting */}
			<div className="fix">
				<form>
					<div className="flex_add_menu">
						<div className="">
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									"& > :not(style)": { m: 1 },
								}}
							>
								<TextField
									id="demo-helper-text-misaligned"
									label="Name"
									onChange={(e) => setname(e.target.value)}
								/>
								<TextField
									id="demo-helper-text-misaligned"
									label="Email"
									onChange={(e) => setemail(e.target.value)}
								/>
								<TextField
									id="demo-helper-text-misaligned"
									label="Phon_no"
									onChange={(e) => setnumber(e.target.value)}
								/>
							</Box>
						</div>
						<br />
						<br />
						{/* date picker ___________ */}
						<div>
							<MuiPickersUtilsProvider
								utils={DateMomentUtils}
								className="remove"
							>
								<KeyboardDatePicker
									variant="inline"
									label="age"
									clearLabel=""
									value={currentDate}
									onChange={setCurrentData}
								/>
							</MuiPickersUtilsProvider>
						</div>

						{/* gebder section ______________________ */}
						<div className="gender_main" onClick={gender_handel}>
							<div>Gender :</div>
							<FormControl>
								<RadioGroup
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
								>
									<FormControlLabel
										value="Female"
										control={<Radio />}
										label="Female"
										onClick={female}
									/>
									<FormControlLabel
										value="Male"
										control={<Radio />}
										label="Male"
										onClick={female}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div className="hobbies" onClick={handel_hobbies}>
							Hobbies
						</div>

						<input type="submit" id="button" onClick={submmit_handel} />
					</div>
				</form>
				{/* conditional rendring ____________________*/}
				{show_hobbies && (
					<div className="hobbies_popup">
						<div className="display">
							<Checkbox
								checked={checked1}
								onChange={hobbie_one}
								inputProps={{ "aria-label": "controlled" }}
							/>
							<div>Reading</div>
						</div>
						<div className="display">
							<Checkbox
								checked={checked2}
								onChange={hobbie_two}
								inputProps={{ "aria-label": "controlled" }}
							/>
							<div>Running</div>
						</div>
						<div className="display">
							<Checkbox
								checked={checked3}
								onChange={hobbie_three}
								inputProps={{ "aria-label": "controlled" }}
							/>
							<div>Writing</div>
						</div>
					</div>
				)}
				<br />
				<br />
				<br />
				<br />
			</div>

			<h1>
				{/* {data.map((e) => (
					<div key={e.id}>{e.Name}</div>
				))} */}
			</h1>

			{/* table section _______________________________________ */}
			<div>
				<MaterialTable
					title="All Profiles"
					data={data}
					columns={columns}
					editable={{
						onRowDelete: (selectedRow) =>
							new Promise((resolve, reject) => {
								console.log(selectedRow.tableData);
								setdeleteele(selectedRow.tableData.id);
								handel_delete(selectedRow.tableData.id);
								resolve();
							}),
					}}
					options={{
						actionsColumnIndex: -1,
					}}
				></MaterialTable>
			</div>
		</>
	);
}

export default Day;
