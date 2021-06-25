
const taskContainer=document.querySelector(".task_container");

let globalStore = [];

const generateNewCard =(taskData)=>`   
<div class="col-md-4 sm-12" >
        
<div class="card text-center">
    <div class="card-header d-flex justify-content-end gap-3">
        
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pen"></i></button>
      <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash"></i></button>
    </div>
    
    <div class="card-body style=width: 18rem;">
    
        <img src=${taskData.imageUrl} class="card-img-top" alt="...">
 
      <h5 class="card-title"> ${taskData.title}</h5>
      <p class="card-text">${taskData.imgDescription}</p>
      <a href="#" class="btn btn-primary">${taskData.apiItegration}</a>
    </div>
    <div class="card-footer float-end ">
        <button type="button" class="btn btn-primary float-end ">Do</button>
    
    </div>
  </div>
  </div>
`;


// refresh issue

const loadInitialData=()=>{
 const getCardData= localStorage.getItem("tasky");
 
 const {cards} = JSON.parse(getCardData);

 cards.map((cardObject) =>{
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStore.push(cardObject);

 } )

};
const saveChanges= () => {
    const taskData={
        id:`${Date.now()}`,
        title:document.getElementById("tit").value,
        imageUrl:document.getElementById("img").value,
        apiItegration:document.getElementById("api").value,
        imgDescription:document.getElementById("description").value,

    };

//new card data


  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
  globalStore.push(taskData);
 localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};


//deletion
const deleteCard = (event) => {
    event = window.event;
    // id
    const targetID = event.target.id;
    const tagname = event.target.tagName; // BUTTON
    // match the id of the element with the id inside the globalStore
    // if match found remove
  
    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID); 
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); // an object
    // contact parent
  
    if(tagname === "BUTTON"){
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
  
  };
  