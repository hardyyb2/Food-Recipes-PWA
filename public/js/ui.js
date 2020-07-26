let recipes = document.querySelector('.recipes')

document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});


//render recipe 
const renderRecipe = (data, id) => {
  let html = ` 
  <div class="card-panel recipe white row" id=${id}>
    <img src="/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
          <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
         <i style="cursor:pointer;" class="material-icons" data-id="${id}">delete_outline</i>
      </div>
  </div>
  `
  recipes.innerHTML += html

}

const removeRecipe = id => {
  console.log(id)
  const recipe = document.getElementById(`${id}`)
  console.log(recipe)
  recipe.remove()
}