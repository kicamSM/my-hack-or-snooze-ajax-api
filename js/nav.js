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
  $myStoriesForm.addClass("hidden");
  $storyForm.addClass("hidden")
}

$body.on("click", "#nav-all", navAllStories);
// this is on click for Hack or Snooze 

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

$navSubmit.on("click", unhideStoryClass);

function unhideStoryClass() {
  console.debug("unhideStoryClass");
  console.log('unhideStoryClass is running');
  $storyForm.removeClass("hidden");
  $favoritesForm.addClass("hidden");
  $myStoriesForm.addClass("hidden");
  $storyForm.show();
  putStoriesOnPage();
}

//would like to know more about .show() vs removeClass()

$navFavorites.on("click", unhideFavorites);

function unhideFavorites() {
  console.debug("unhideFavorites");
  $favoritesForm.removeClass("hidden");
  $storyForm.addClass("hidden");
  $myStoriesForm.addClass("hidden");
  hidePageComponents();

}

$navMyStories.on("click", unhideMyStories) 

function unhideMyStories() {
  console.debug("unhideMyStories");
  $myStoriesForm.removeClass("hidden");
  $storyForm.addClass("hidden");
  $favoritesForm.addClass("hidden");
  hidePageComponents();
}


