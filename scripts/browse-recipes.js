recipeList = JSON.parse(localStorage.getItem('recipeList')) || []
let quantityTracker = []
shoppingRecipeList = []
let titleList = []
console.log(recipeList)
sortTabs('cookBook', 'cookbook')
reHighlightClasses()
importCuisines()

//sortNewToOld()
//recipeList[20].ingredients[0][3] = "parmesan"
//localStorage.setItem('recipeList', JSON.stringify(recipeList));


findTitle()

function setShoppingListTitles(){
  let shoppingListTitles = document.getElementById('nextPage')
  localStorage.setItem('shoppingListTitles', shoppingListTitles.innerHTML);
}

function reHighlightClasses(){
  let array = document.getElementsByClassName('recipe-popup-list')
  let ids = []
  for(let i=0; i<array.length; i++){
  let stringType = array[i].outerHTML
  stringType = stringType.substring(0, stringType.indexOf('>'))
  let numbers = stringType.match(/\d/g)
  numbers = numbers.join("")
  ids.push(numbers)
  }
  console.log(ids)
  
  for(let i=0; i<ids.length; i++){
    let id = ids[i]
    let box = document.getElementById(`box${id}`)
    let quantity = document.getElementById(`quantityContainer${id}`)
    if(box !== null){
    box.classList.add('title-and-picture-selected')
    box.classList.remove('title-and-picture')
    quantity.classList.add('display-on')
    }
  }

}

function importCuisines(){
  let cuisineList = []
  cuisineList = []
  for(let i = 0; i<recipeList.length; i++){
    if(cuisineList.includes(recipeList[i].cuisine)){
  } else{
    cuisineList.push(recipeList[i].cuisine)
    }
  }
  cuisineList.sort()
  console.log(cuisineList)
  let location = document.getElementById('cuisineContainer')
  location.innerHTML=''
  for(let i=0; i<cuisineList.length; i++){
    let html = `<div onclick="sortCuisines('${cuisineList[i]}')" class="cuisine-list">${toTitleCase(cuisineList[i])}</div>`
    location.insertAdjacentHTML('beforeend', html)
  }
}


function findTitle(){
  let classMarker = 'a'
  let i = 0
  let recipeListNewToOld = recipeList.reverse()
  for (let recipeIndexNumber = 0; recipeIndexNumber < recipeList.length; recipeIndexNumber++){
  let newRecipeTitle = recipeListNewToOld[recipeIndexNumber].title
  let newRecipePicture = recipeListNewToOld[recipeIndexNumber].picture
  let exisitingRecipes = document.querySelector(`.recipe-${classMarker}`)
  let html = 
  ` <div class="recipe-box-container">
      <div onclick="addToRecipeBox(${i})" id="box${i}" class="title-and-picture">
        <img id="picture${i}" src="${newRecipePicture}" class="recipe-picture">
        <div id="name${i}" class="just-name">${toTitleCase(newRecipeTitle)}</div>
      </div>
      <div id="quantityContainer${i}" class="quantity-container"><div onclick="subtractQuantity(${i})" class="minus-button">-</div><div>/</div><div onclick="addQuantity(${i})" class="plus-button">+</div></div>
      <div onclick="showPreview(${i})" class="preview-button"><p>Preview</p></div>
    </div>
    `
  exisitingRecipes.insertAdjacentHTML("beforeend", html)
  if(classMarker === 'a'){
    classMarker = 'b'
  } else if(classMarker === 'b') {
    classMarker = 'c'
  } else{
    classMarker = 'a'
  }
  i++
  }
}

function sortCuisines(cuisine){
  
  let indexList = []
  for(let i=0; i<recipeList.length; i++){
    if(recipeList[i].cuisine === cuisine){
      indexList.push(i)
    } else {continue;}
  }
  console.log(indexList)

  document.getElementById('recipeA').innerHTML = ''
  document.getElementById('recipeB').innerHTML = ''
  document.getElementById('recipeC').innerHTML = ''

  let classMarker = 'a'
  for(let i = 0; i<indexList.length; i++){
    let newRecipeTitle = recipeList[indexList[i]].title
    let newRecipePicture = recipeList[indexList[i]].picture
    let exisitingRecipes = document.querySelector(`.recipe-${classMarker}`)
    let html = 
    ` <div class="recipe-box-container">
        <div onclick="addToRecipeBox(${indexList[i]})" id="box${indexList[i]}" class="title-and-picture">
          <img id="picture${indexList[i]}" src="${newRecipePicture}" class="recipe-picture">
          <div id="name${indexList[i]}" class="just-name">${toTitleCase(newRecipeTitle)}</div>
        </div>
        <div id="quantityContainer${indexList[i]}" class="quantity-container"><div onclick="subtractQuantity(${indexList[i]})" class="minus-button">-</div><div>/</div><div onclick="addQuantity(${indexList[i]})" class="plus-button">+</div></div>
        <div onclick="showPreview(${indexList[i]})" class="preview-button"><p>Preview</p></div>
      </div>
      `
    exisitingRecipes.insertAdjacentHTML("beforeend", html)
    if(classMarker === 'a'){
      classMarker = 'b'
    } else if(classMarker === 'b') {
      classMarker = 'c'
    } else{
      classMarker = 'a'
    }
    }
    reHighlightClasses()

}


function sortAZ(){
  let alphabetList = []
  let indexList = []
  for(let i=0; i<recipeList.length; i++){
    let AZtitle = recipeList[i].title
    alphabetList.push(AZtitle)
  }
  alphabetList.sort()
  console.log(alphabetList)
  loop1: for(let i=0; i<alphabetList.length; i++){
    loop2: for(let z=0; z<recipeList.length; z++){
      if(alphabetList[i] === recipeList[z].title){
        indexList.push(`${z}`)
        continue loop1;
      } else{
        continue loop2;
      }
    }  
  }
  console.log(indexList)
 
  document.getElementById('recipeA').innerHTML = ''
  document.getElementById('recipeB').innerHTML = ''
  document.getElementById('recipeC').innerHTML = ''

  let classMarker = 'a'
  for(let i = 0; i<indexList.length; i++){
    let newRecipeTitle = recipeList[indexList[i]].title
    let newRecipePicture = recipeList[indexList[i]].picture
    let exisitingRecipes = document.querySelector(`.recipe-${classMarker}`)
    let html = 
    ` <div class="recipe-box-container">
        <div onclick="addToRecipeBox(${indexList[i]})" id="box${indexList[i]}" class="title-and-picture">
          <img id="picture${indexList[i]}" src="${newRecipePicture}" class="recipe-picture">
          <div id="name${indexList[i]}" class="just-name">${toTitleCase(newRecipeTitle)}</div>
        </div>
        <div id="quantityContainer${indexList[i]}" class="quantity-container"><div onclick="subtractQuantity(${indexList[i]})" class="minus-button">-</div><div>/</div><div onclick="addQuantity(${indexList[i]})" class="plus-button">+</div></div>
        <div onclick="showPreview(${indexList[i]})" class="preview-button"><p>Preview</p></div>
      </div>
      `
    exisitingRecipes.insertAdjacentHTML("beforeend", html)
    if(classMarker === 'a'){
      classMarker = 'b'
    } else if(classMarker === 'b') {
      classMarker = 'c'
    } else{
      classMarker = 'a'
    }
    }
    reHighlightClasses()
  }

function sortOldToNew(){
  document.getElementById('recipeA').innerHTML = ''
  document.getElementById('recipeB').innerHTML = ''
  document.getElementById('recipeC').innerHTML = ''

  findTitle()
  reHighlightClasses()

}

function sortNewToOld(){
  let indexList = []
  for(let i=0; i<recipeList.length; i++){
    indexList.push(i)
  }
  indexList=indexList.reverse()
  console.log(indexList)

  document.getElementById('recipeA').innerHTML = ''
  document.getElementById('recipeB').innerHTML = ''
  document.getElementById('recipeC').innerHTML = ''

  let classMarker = 'a'
  for(let i = 0; i<indexList.length; i++){
    let newRecipeTitle = recipeList[indexList[i]].title
    let newRecipePicture = recipeList[indexList[i]].picture
    let exisitingRecipes = document.querySelector(`.recipe-${classMarker}`)
    let html = 
    ` <div class="recipe-box-container">
        <div onclick="addToRecipeBox(${indexList[i]})" id="box${indexList[i]}" class="title-and-picture">
          <img id="picture${indexList[i]}" src="${newRecipePicture}" class="recipe-picture">
          <div id="name${indexList[i]}" class="just-name">${toTitleCase(newRecipeTitle)}</div>
        </div>
        <div id="quantityContainer${indexList[i]}" class="quantity-container"><div onclick="subtractQuantity(${indexList[i]})" class="minus-button">-</div><div>/</div><div onclick="addQuantity(${indexList[i]})" class="plus-button">+</div></div>
        <div onclick="showPreview(${indexList[i]})" class="preview-button"><p>Preview</p></div>
      </div>
      `
    exisitingRecipes.insertAdjacentHTML("beforeend", html)
    if(classMarker === 'a'){
      classMarker = 'b'
    } else if(classMarker === 'b') {
      classMarker = 'c'
    } else{
      classMarker = 'a'
    }
    }
    reHighlightClasses()

}



function sortTabs(page, style){
  let home = document.getElementById('homeTab')
  let recipeBox = document.getElementById('recipeBoxTab')
  let cookBook = document.getElementById('cookBookTab')
  let list = document.getElementById('listTab')
    if(home.classList.contains('home-tab')){
      home.classList.remove('home-tab')
    } else if(recipeBox.classList.contains('recipe-box-tab')){
      recipeBox.classList.remove('recipe-box-tab')
    } else if(cookBook.classList.contains('cookbook-tab')){
      cookBook.classList.remove('cookbook-tab')
    } else if(list.classList.contains('list-tab')){
      list.classList.remove('list-tab')
    } else {}

    let current = document.getElementById(`${page}Tab`)
    current.classList.add(`${style}-tab`)
}



function addToRecipeBox(indexNumber){
  let recipeName = document.getElementById(`name${indexNumber}`)
  let boxClass = document.getElementById(`box${indexNumber}`)
  let nextPage = document.getElementById('nextPage')
  let quantityBox = document.getElementById(`quantityContainer${indexNumber}`)
  let html = `<div id="${indexNumber}popup" class="recipe-popup-list">${recipeName.innerText}</div>`
  if(boxClass.classList.contains('title-and-picture-selected')){
    boxClass.classList.remove('title-and-picture-selected')
    boxClass.classList.add('title-and-picture')
    quantityBox.classList.remove('display-on')
    recipeName.classList.add('recipe-hover')
    document.getElementById(`${indexNumber}popup`).innerHTML = ''
    document.getElementById(`${indexNumber}popup`).outerHTML = ''
    loop1: for(let i=0; i<shoppingRecipeList.length; i++){
      if(shoppingRecipeList[i].title === recipeName.innerText.toLowerCase()){
        shoppingRecipeList.splice(i,1)
        i= i-1
        continue loop1;
      } else {continue loop1}
    }   


  } else{
    boxClass.classList.add('title-and-picture-selected')
    boxClass.classList.remove('title-and-picture')
    quantityBox.classList.add('display-on')
    nextPage.insertAdjacentHTML("beforeend", html)
    for(let i=0; i<recipeList.length; i++){
      if(recipeList[i].title === recipeName.innerText.toLowerCase()){
        shoppingRecipeList.push(recipeList[i])
      } else {}
    }
  
  }
  showGetIngredients()
  localStorage.setItem('shoppingRecipeList', JSON.stringify(shoppingRecipeList))
  setShoppingListTitles()
}

function addQuantity(index){
  shoppingRecipeList.push(recipeList[index])
  let location = document.getElementById(`${index}quantity`)
  let newLocation = document.getElementById(`${index}popup`)
  let html = `<div id="${index}x" class="x-quantity">x</div><div class="recipes-quantity" id="${index}quantity">2</div>`
  if(location === null){
    newLocation.insertAdjacentHTML("beforeend", html)
  } else {
    let newHTML = Number(location.innerHTML) + 1
    location.innerHTML = `${newHTML}`
  }
  setShoppingListTitles()
}

function subtractQuantity(index){
  let boxClass = document.getElementById(`box${index}`)
  let quantityBox = document.getElementById(`quantityContainer${index}`)
  let recipeName = document.getElementById(`name${index}`)
  let quant = 0
  for(let i = 0; i<shoppingRecipeList.length; i++){
    if(shoppingRecipeList[i].title === recipeName.innerText.toLowerCase()){
      quant++}}
    for(let i = 0; i<shoppingRecipeList.length; i++){
      if(shoppingRecipeList[i].title === recipeName.innerText.toLowerCase()){
        shoppingRecipeList.splice(i,1)
        quant = quant - 1
        //groceryTitles.splice(index, 1)
        showGetIngredients()
        //localStorage.setItem('groceryTitles', JSON.stringify(groceryTitles))
        break;
      }
    }
  let location = document.getElementById(`${index}quantity`)
  if(location !== null){
  let newHTML = Number(location.innerHTML) - 1
  location.innerHTML = `${newHTML}`
  if(location.innerHTML === '1'){
    document.getElementById(`${index}x`).innerHTML = ''
    document.getElementById(`${index}quantity`).innerHTML = ''
  } else{}
} 

  if(quant === 0){
    boxClass.classList.remove('title-and-picture-selected')
    boxClass.classList.add('title-and-picture')
    quantityBox.classList.remove('display-on')
    recipeName.classList.add('recipe-hover')
    document.getElementById(`${index}popup`).innerHTML = ''
    document.getElementById(`${index}popup`).outerHTML = ''
  } else{}
showGetIngredients() 
setShoppingListTitles()
}

function showPreview(index){
  let recipeName = recipeList[index].title
  let recipeWebsite = recipeList[index].website
  let recipeCuisine = recipeList[index].cuisine
  let recipePicture = recipeList[index].picture
  let recipeServings = recipeList[index].servings
  let insertArea = document.getElementById('recipePreview')
  let checkArea = document.getElementById('previewContainer')

  if(checkArea === null){
  } else {
    checkArea.innerHTML = ''
  }

  insertArea.classList.add('display-on')

  let html = ` <div id="previewContainer" class="preview-contents">
  <div class="preview-title">${toTitleCase(recipeName)}</div>
  <div class="preview-website">${toTitleCase(recipeWebsite)}</div>
  <div class="preview-servings">${toTitleCase(recipeServings)} servings</div>
  <div class="preview-cuisine">${toTitleCase(recipeCuisine)}</div>
  <div id="ingredientPreviewContainer" class="ingredient-preview-container"></div>
  </div>`
  insertArea.insertAdjacentHTML("afterbegin", html)
  let ingredientInputArea = document.getElementById('ingredientPreviewContainer')
  for (let v=0; v<recipeList[index].ingredients[0].length; v++){
    let line = ' ' + String(recipeList[index].ingredients[0][v]) + ', ' + String(recipeList[index].ingredients[1][v]) + ' ' + String(recipeList[index].ingredients[2][v]);
    let uppercaseLine = toTitleCase(line)
    let ingredientHTML = `<div class="preview-ingredient">${uppercaseLine}</div>`
    ingredientInputArea.insertAdjacentHTML("beforeend", ingredientHTML)  
  }
 
}

function hidePreview(){
  let insertArea = document.getElementById('recipePreview')
  insertArea.classList.remove('display-on')
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function showGetIngredients(){
  let recipeList = document.querySelector('.recipe-popup-list')
  let button = document.getElementById('getIngredients')
  if(recipeList !== null){
    button.classList.add('display-on')
  } else{
    button.classList.remove('display-on')
  }
}

/*function populateShoppingList(){
  for (let i=0; i<recipeList.length; i++){
    let ingredientsList = recipeList[i].ingredients[0]
    let quantityList = recipeList[i].ingredients[1]
    let unitsList = recipeList[i].ingredients[2]
    for(let i=0; i<ingredientsList.length; i++){
      let separateIngredient = ingredientsList[i]
      let separateUnit = unitsList[i]
      let separateQuantity = quantityList[i]
      if (finalIngredientList.includes(separateIngredient)){
        let exisitingIndex = finalIngredientList.indexOf(separateIngredient)
        if(finalUnitList[exisitingIndex] === unitsList[i]){
          finalQuantityList[exisitingIndex] = Number(finalQuantityList[exisitingIndex]) + Number(quantityList[i])
        } else {
          finalQuantityList.splice(exisitingIndex, 0, quantityList[i])
          finalUnitList.splice(exisitingIndex, 0, unitsList[i])
          finalIngredientList.splice(exisitingIndex, 0, separateIngredient)
          //finalQuantityList[exisitingIndex] = finalQuantityList[exisitingIndex] + String(quantityList[i])
          //finalUnitList[exisitingIndex] = finalUnitList[exisitingIndex] + String(unitsList[i])
        }
      } else{
        finalIngredientList.push(separateIngredient)
        finalUnitList.push(separateUnit)
        finalQuantityList.push(separateQuantity)
        
      }
    }
  }

}


function finalList(){
  for (let i=0; i<finalIngredientList.length; i++){
  let listItem = String(finalQuantityList[i]) + ' ' + String(finalUnitList[i]) + ' ' + String(finalIngredientList[i])
  finalFinalList.push(listItem)
  }
}*/




