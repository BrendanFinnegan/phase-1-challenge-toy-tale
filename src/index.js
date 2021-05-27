let addToy = false;


  
  // function likerClick() {
    
  
  const cardCreator = (obj) => {
    let newDiv = document.createElement('div')
    let newH2 = document.createElement('h2')
    let newimg = document.createElement('img')
    let newP = document.createElement('p')
    let newButton = document.createElement('button')
    let likes = obj.likes
    newH2.textContent = obj.name
    newimg.src = obj.image
    newimg.className = 'toy-avatar'
    newP.textContent = `${obj.likes} likes`
    newP.id = obj.id
    newButton.className = "like-btn"
    newButton.id = obj.id
    newButton.textContent = 'like'
    document.querySelector('#toy-collection').append(newDiv)
    newDiv.append(newH2,newimg,newP,newButton)
    newButton.addEventListener('click', (e)=>{
   let currentLikes = parseFloat(e.target.previousElementSibling.innerText)
      fetch(`http://localhost:3000/toys/${e.target.id}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({likes: (currentLikes+1)})
        
      }).then(res => res.json()).then(data => {
        e.target.previousElementSibling.innerText = `${currentLikes+1} likes`})
    }
    )}
  
  fetch(`http://localhost:3000/toys`).then(res => res.json())
  .then(data => data.forEach(element => cardCreator(element)))
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
  e.preventDefault()
fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
     name: e.target.name.value,
     image: e.target.image.value,
     likes: 0
   })
   
}).then(res => res.json()).then(cardCreator)

})


  


