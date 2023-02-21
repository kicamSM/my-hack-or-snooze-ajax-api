"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
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
  evt.preventDefault()
console.debug("navAddStory", evt);
addNewStories()

// $navSubmit.hide();
// $storyForm.removeClass();
// $submitBtn.hide();
// $submitBtn.show();
// console.log('Clicked Submit!')
}

$navSubmit.on("click", unhideClass);

function unhideClass() {
  $storyForm.removeClass("hidden")
}

// $navSubmit.click(function(){
//   $navSubmit.removeClass("hidden")
// })