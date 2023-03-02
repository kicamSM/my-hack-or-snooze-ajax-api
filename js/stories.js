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
  // the qustion becomes how do you access the current story that is being appended to the dom? 
  // console.log(currentUser.favorites)
  // console.log(story.storyId)
  // console.log(currentUser.isFavorite)
  // let currentStories = currentUser.favorites

  // console.log(showStar)
  const userStories = currentUser.ownStories
  let isUserStory = false 

  userStories.filter(findUserStory)

  function findUserStory(userStory){
    if(story.storyId === userStory.storyId) {
      isUserStory = true
      // userStory.className = 'trash-can'

    }
  }
  
  const favs = currentUser.favorites 
  let isFavorite = false 
 
favs.filter(findIdMatch);

  function findIdMatch(fav) {
    if(story.storyId === fav.storyId) {
      isFavorite = true 
    }
  }

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class="star">
      <i class="${isFavorite ? "fas" : "far"} fa-star"></i>
      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <span class="trash-can">
        <i class="${isUserStory ? "fa fa-trash" : ""}"></i>
        </span>
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



}


$allStoriesList.on('click', '.star', function (e) {
  //you need this function to connect the entirety of the story information when  clicking on the star 
  console.log('currentUser.favorites:', currentUser.favorites)
    const $target = $(e.target);
    const $closestLi = $target.closest('li')
    const storyId = $closestLi.attr("id");
    // console.log(storyId)
    const story = storyList.stories.find(s => s.storyId === storyId);
    // console.log(storyList) 
    //storyList is an object with an array 
    // console.log(storyList.stories)
   //stories is the array inside the object 
    //function find is locating the story by the id 
    //in this object function find(s) { the id of that funtion my story === another story id (i.e same story)  //stories is the array inside the object 
  //what I don't understand is why the id is able to pull out all the story information. That must have to do with a funtion of the API.
    // see if the item is already favorited (checking by resence of star)
    if ($target.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
     
    $target.closest("i").toggleClass("fas far");
    currentUser.removeFavorites(story)
    } else {
    // currently not a favorite: do the opposite
  
    // TODO NEED TO ADD TO FAVORITES LIST 
    $target.closest("i").toggleClass("fas far");
    currentUser.addFavorites(story); 
    // console.log(story)
    //will need to look into this one 
    }
    })

$navFavorites.on('click', putFavoritesOnPage)

function putFavoritesOnPage() {
  $allFavoritesList.empty();
  const $favsToAppend = currentUser.favorites;
  console.log($favsToAppend.length)

  if($favsToAppend == 0) {
    const noFavs = $(`<li>${'No favorites added yet!'}</li>`)
    $allFavoritesList.append(noFavs)
  }

  for(let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allFavoritesList.append($story);
  }

  // $allFavoritesList.append($favsToAppend);
  // console.log($allFavoritesList)
  // note that you can follow what the format of the previous function putStoriesOnPage()
}
// console.log($button)
// $button.on('click', deleteStory);

// function deleteStory() {
// console.log('you clicked delete')
// }


// $button.on('click', '.button', function () {
//   console.log('you clicked delete')
// })

// const btn = document.getElementsByClassName('button');
// btn.addEventListener('click', deleteStory)

// function deleteStory() {
// console.log('you clicked delete')
// }

$navMyStories.on("click", putOwnStoriesOnPage);

function putOwnStoriesOnPage() {
  // console.log('you ran putOwnStoriesOnPage')
  $myStoriesList.empty();
  const $userStories = currentUser.ownStories

  if($userStories == 0) {
    const noMyStories = $(`<li>${'No stories added yet!'}</li>`)
    $myStoriesList.append(noMyStories)
  }

  for(let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $myStoriesList.append($story);
  }
}

$myStoriesList.on("click", ".trash-can", deleteStory);

function deleteStory(e){
  console.log('storyList.stories:', storyList.stories)
  console.log('you clicked the trashcan')
  // now you have to remove from both lists that are appended and remove those stories from the dom 
  const $target = $(e.target);
  const $closestLi = $target.closest('li')
  const storyIdToDelete = $closestLi.attr("id");


  const storyInMain = storyList.stories.find(s => s.storyId === storyIdToDelete);
  const storyInOwnStories = currentUser.ownStories.find(s => s.storyId === storyIdToDelete);
  //this is the story we need to delete from the allStoriesList 
  // console.log(story.indexOf())
  // console.log(story)
  // console.log(storyList.stories)
  // console.log('$allStoriesList:', $allStoriesList)
  // console.log('indexOfStory:', storyList.stories.indexOf(story))
  // const idxStoryRemoved = storyList.stories.indexOf(story);
  currentUser.removeUserStoryFromStoriesList(storyInMain);
  currentUser.removeUserStoryFromOwnStories(storyInOwnStories)
  $closestLi.remove();
  // storyList.stories.splice(idxStoryRemoved, 1)
  // putStoriesOnPage();
  // console.log($allStoriesList)
  // $allStoriesList.remove(idxStoryRemoved)
  // console.log(story.closest('li')) doesnt work 


  //note this removed it from the my stories tab but did not remove it from the allStoriesList


  
  //this is not defined according to the console. But this method is inside a class so that is not how you would call it.
  // look into this more. You might not be able to simply call this function
  if($target.hasClass('fa fa-trash')) {

    //then we want to remove that from the list 
    // document.getElementById
    // $myStoriesList.removeChild(story)
    // story.empty()
    //tried empty and remove 
  }
 
  // console.log(storyIdToDelete)+
  // console.log(currentUser.story)
  // console.log("closestLi:", $closestLi)
  // console.log($target)
  // console.log(currentUser)

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