// Store the complete data
let allStudents = [];

// Task 1
fetch("https://cs571.org/rest/s25/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
.then((d) => d.json())
.then((data) => {
	console.log(data);
	allStudents = data;
	buildStudents(allStudents);	
})

function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	// Task 2
	document.getElementById("num-results").innerText = studs.length;
	// Task 3
	const container = document.getElementById("students");
	container.innerHTML = "";

	for (let stu of studs) {
		const nameHTML = document.createElement("h2");
		const majorHTML = document.createElement("b");
		const credHTML = document.createElement("p");
		const intenumHTML = document.createElement("p")
		const interHTML = document.createElement("ul");
		const name1 = stu.name.first;
		const name2 = stu.name.last;
		const credits = stu.numCredits;
		const major = stu.major;
		const isWI = stu.fromWisconsin ? "" : "NOT ";
		const interests = stu.interests;

		nameHTML.innerText = name1 + " " + name2;
		majorHTML.innerText = major;
		credHTML.innerText = `${name1} is taking ${credits} credits and is ${isWI}from Wisconsin.`;
		intenumHTML.innerText = "They have " + interests.length + " interests including...";
		
		for (let interest of interests) {
			const li = document.createElement("li");
			li.textContent = interest;
			// Task 6
			// Change the cursor to a pointer
			li.style.cursor = "pointer";
			
			li.addEventListener("click", (e) => {
				const selectedText = e.target.innerText;
				// TODO update the search terms to search just for the
				//      selected interest, and re-run the search!
				document.getElementById("search-name").value = "";
				document.getElementById("search-major").value = "";
				document.getElementById("search-interest").value = selectedText;

				handleSearch(e);
			})
			interHTML.appendChild(li);
		}
		//For evey student, create a `div`
		const stuDiv = document.createElement("div");

		// Task 4
		// There are 12 columns in total
		stuDiv.className = "col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3";

		stuDiv.appendChild(nameHTML);
		stuDiv.appendChild(majorHTML);
		stuDiv.appendChild(credHTML);
		stuDiv.appendChild(intenumHTML);
		stuDiv.appendChild(interHTML);

		container.appendChild(stuDiv);
	}
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	// Task 5
	// Use trim() to remove leading and trailing spaces
	const nameInput = document.getElementById("search-name").value.trim().toLowerCase();
	const majorInput = document.getElementById("search-major").value.trim().toLowerCase();
	const interestInput = document.getElementById("search-interest").value.trim().toLowerCase();
	// Clear all the data
	document.getElementById("students").innerHTML = "";
	// Search for all the matched results
	const matched = allStudents.filter(stu => {
		const name = (stu.name.first + " " + stu.name.last).toLowerCase();
		const major = stu.major.toLowerCase();
		const interests = stu.interests.map(i => i.toLowerCase());
		// If the input is left blank, then return true
		const nameMatch = name.includes(nameInput) || nameInput === "";
		const majorMatch = major.includes(majorInput) || majorInput === "";
		const interestMatch = interests.some(i => i.includes(interestInput)) || interestInput === "";

		return nameMatch && majorMatch && interestMatch
	})
	// Update the number of matching students
	document.getElementById("num-results").innerText = matched.length;
	// Update the page
	buildStudents(matched);
}

document.getElementById("search-btn").addEventListener("click", handleSearch);