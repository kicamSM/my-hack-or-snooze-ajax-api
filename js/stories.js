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

  // <span class='star fa fa-star-o'></span>
  // was using this one zarko told me to use 

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class="star">
      <i class="far fa-star"></i>
      </span>
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



$allStoriesList.on('click', '.star', function (e) {

  const $target = $(e.target);
  
  // console.log($target);
  // see if the item is already favorited (checking by presence of star)
  if ($target.hasClass("fas")) {
  // currently a favorite: remove from user's fav list and change star

  //note that add facorites gives error up which says its not defined so add favorites function might be in the wrong place in the js file???? 
  
  // addFavorites(); 
  $target.closest("i").toggleClass("fas far");
  } else {
  // currently not a favorite: do the opposite

  // TODO NEED TO ADD TO FAVORITES LIST 
  // questions for self is there a function that does this yet?? IF not where does it need to be lcoated?? Order of operations 
  // directions say that they need to be defined in user class --this is in the models.js 
  $target.closest("i").toggleClass("fas far");
  addFavorites(); 
  }
  // addFavorites();
  
  })
}


// async function addNewStories(evt) {

  // const author = $authorInput.val();
  // const title = $storyInput.val();
  // const url = $urlInput.val();

  // const username = currentUser;

  //  let story = storyList.addStory(username, { title: title, author: author, url: url })
  //  console.log(story)
  // note that when I have the evt.preventDefault() this works  but only when you refresh the page. If the evt.preventDefault() is not there, 
   // take this information and pass it to the function or method which allows it to be appended to the page. 

   async function submitNewStory(evt) {
    console.debug("submitNewStory");
    // evt.preventDefault();
    // grab all info from form
    // const title = $("#create-title").val();
    // console.log(title)
    // const url = $("#create-url").val();
    // console.log(url)
    // const author = $("#create-author").val();
    // console.log(author)
    const author = $authorInput.val();
    const title = $storyInput.val();
    const url = $urlInput.val();
    const username = currentUser
    // const username = currentUser.username
    //note that this doesnt matter at least for this step. It could matter later on but not seeing any difference for now. 
    const storyData = {title, url, author, username };
    console.log(storyData)

      // let oldStory = storyList.addStory(username, { title: title, author: author, url: url })
      // console.log(oldStory)
      //review this with Mentor --- this is returning more than simply the data. Follow up and see if you can figure out how to return data from this
  
    const story = await storyList.addStory(currentUser, storyData);
    // console.log(storyList)
  
    const $story = generateStoryMarkup(story);
    $allStoriesList.prepend($story);

    //this is still not working 

  // let storyMockup = generateStoryMarkup(story);
  // // putStoriesOnPage(story);
  //   $allStoriesList.prepend(storyMockup);
  //   $storyForm.addClass("hidden")
    // console.log($allStoriesList)
    $storyForm.slideUp("slow");
    //this is simply an effect on the form to make it disappear in the way they want 
    $storyForm.trigger("reset");
    //this is reseting the form when you fill it out

  
}
$storyForm.on("submit", submitNewStory)