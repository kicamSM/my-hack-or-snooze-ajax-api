"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $favoritesForm.addClass("hidden");
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


// $submit.on("click", navAddStory);
// const submitBtn = document.getElementById('submitBtn')
// console.log(submitBtn)
// submitBtn.on('click', navAddStory);
$submitBtn.on("click", navAddStory);
// console.log($submitBtn)

function navAddStory(evt) {
  console.debug("navAddStory", evt);
$allStoriesList.show()
  evt.preventDefault();
$storyForm.show();
submitNewStory();
// addNewStories();

}

// function navSubmitStoryClick(evt) {
//   console.debug("navSubmitStoryClick", evt);
//   hidePageComponents();
//   $allStoriesList.show();
//   $submitForm.show();
// }

// $navSubmitStory.on("click", navSubmitStoryClick);
// just added thiss function 

$navSubmit.on("click", unhideStoryClass);

function unhideStoryClass() {
  $storyForm.removeClass("hidden");
  $favoritesForm.addClass("hidden");
}

$navFavorites.on("click", unhideFavorites);

function unhideFavorites() {
  $favoritesForm.removeClass("hidden");
  $storyForm.addClass("hidden");
  hidePageComponents()
  console.log('you clicked favorites')
}
// unknow why this is running automatically it should not be 

// $favoritesStar.addEventListener("click", addFavorites())

// $favoritesStar.on("click", addFavorites);

// function addFavorites(evt) {
//   evt.preventDefault();
//   // console.debug("addFavorites", evt);
//   console.log('You clicked the star!')
// }
// console.log($favoritesStar)

// $favoritesStar.on("click", function(e) {
//   e.preventDefault()
//   console.log('you clicked the star')
// } )

// document.querySelector('.fa-star').addEventListener("click", function(e){console.log('click')})