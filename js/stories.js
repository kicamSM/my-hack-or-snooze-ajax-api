"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class='star fa fa-star-o'></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  $storyForm.addClass("hidden")

  const $favoritesStar = $('[class="star"]')
  //not doing jquery is not working here. Going back to vanilla Javascript for now. 

 let star = document.querySelectorAll("[class='star']");

  $favoritesStar.on("click", function(e) {
  e.preventDefault()
  console.log('you clicked the star') } )

  // star.addEventListener("click", function(e) {
  //   e.preventDefault()
  //   console.log('you clicked the star')})

  }
// document.querySelector('.star').addEventListener("click", function(e){console.log('click')})

  // note this has to go here because of order of operations. The class was not run yet. So the class was coming back as null.

function addNewStories(evt) {

  const author = $authorInput.val();
  const title = $storyInput.val();
  const url = $urlInput.val();

  const username = currentUser;

   let story = storyList.addStory(username, { title: title, author: author, url: url })
   console.log(story)
  // note that when I have the evt.preventDefault() this works  but only when you refresh the page. If the evt.preventDefault() is not there, 
   // take this information and pass it to the function or method which allows it to be appended to the page. 

  let storyMockup = generateStoryMarkup(story);
  // putStoriesOnPage(story);
    $allStoriesList.prepend(storyMockup);
    $storyForm.addClass("hidden")
    // console.log($allStoriesList)
}
// $submitBtn.on("submit", addNewStories)