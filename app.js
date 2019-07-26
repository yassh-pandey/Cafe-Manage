var db = firebase.firestore();
const collectionRef = db.collection('cafes');
const cafeName = document.querySelector("#cafeName");
const cafeCity = document.querySelector("#cafeCity");
const buttonWrapper = document.querySelector(".button-wrapper");


buttonWrapper.addEventListener('click', (e)=>{
	const name = cafeName.value;
	const city = cafeCity.value;
	collectionRef.add({
		name,
		city
	})
	.then(docRef=>{
		console.log("Doc added with id: "+ docRef.id);
	})
	.catch(err=>{
		console.log(err);
	});
	cafeName.value = "";
	cafeCity.value = "";
});

collectionRef.onSnapshot(querySnapshot=>{
	const oldList = document.querySelector(".list");
	const listWrapper = document.querySelector(".list-wrapper");
	const newList = document.createElement("ul");
	newList.className = "list";

	querySnapshot.forEach(doc=>{
		let itemTitle = document.createElement("div");
		itemTitle.className = "item-title";
		let name = document.createTextNode(doc.data().name);
		itemTitle.appendChild(name);

		let itemContent = document.createElement("div");
		itemContent.className = "item-content";
		let city = document.createTextNode(doc.data().city);
		itemContent.appendChild(city);

		let listItem = document.createElement("li");
		listItem.className = "item";
		listItem.appendChild(itemTitle);
		listItem.appendChild(itemContent);

		listItem.id = doc.id;

		newList.appendChild(listItem);

	});
	listWrapper.removeChild(oldList);
	listWrapper.appendChild(newList);

	const items = document.querySelectorAll(".item");
	itemsArr = [...items];
	if(itemsArr.length !== 0){
		itemsArr.forEach((item)=>{
			item.addEventListener('click', (e)=>{
			
			collectionRef.doc(e.currentTarget.id)
					.delete()
						.then(function() {
    						console.log("Document successfully deleted!");
						})
						.catch(function(error) {
    						console.error("Error removing document: ", error);
						});
			});
		})
	
	}

});

