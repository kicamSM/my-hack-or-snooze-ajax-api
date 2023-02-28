"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    // UNIMPLEMENTED: complete this function!
    // return "hostname.com";
return new URL(this.url).host
  }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }


  //follow up with mentor regarding this function 

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {
    // Note presence of `static` keyword: this indicates that getStories is
    //  **not** an instance method. Rather, it is a method that is called on the
    //  class directly. Why doesn't it make sense for getStories to be an
    //  instance method?

    // query the /stories endpoint (no auth required)
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    // turn plain old story objects from API into instances of Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  async addStory(user, { title, author, url }) {
    const token = user.loginToken;
    console.log(token)
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/stories`,
      data: { token, story: { title, author, url } },
    });
    console.log(response)

    
    const story = new Story(response.data.story);
    this.stories.unshift(story);
    user.ownStories.unshift(story);
console.log(story)
    return story;
  }
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }


  async addFavorites(story) {
    // console.log(e.target)
// console.log('you are running addFavorites funtion')
    // const favoriteElement = e.target.closest('ol li');
    //   // favoriteElement.setAttribute('class', 'favorite');
    //   // console.log(favoriteElement) 

    // if(!favoriteElement.classList.contains('favorite')) {
    // // favoriteElement.setAttribute('class', 'favorite'); 
    // // console.log(favoriteElement)
    // const cloneFavoriteElement = favoriteElement.cloneNode(true);
    // // console.log(cloneFavoriteElement);
   
    // $allFavoritesList.prepend(cloneFavoriteElement);

  // the problem with doing the way I thought of before would be that you would have to figure out a way to associate the cloned item from the origin because you are clicking the original and wanting to remove the clone. Its easier push the story into the favorites that are already set up 
    this.favorites.push(story);
    // console.log(this.favorites)
    // this is adding the favorites attached to the user. 
    await this.addOrRemove('add', story);


  //   } else {
  //     favoriteElement.removeAttribute('class', 'favorite'); 
  //     console.log(favoriteElement)
  //     $allFavoritesList
  //     console.log($allFavoritesList)
      
  

  //   }
  //   // so it appears as prepnding an element automatically removes it from the list 
  //   // console.log($allFavoritesList);
  // }
}

async removeFavorites(story) {
 this.favorites = this.favorites.filter(s => s.storyId !== story.storyId)
 // here we are saying lets filter out all of the stories in the favorites that are not equal to the story with the id that was passed into the function 



 await this.addOrRemove('remove', story);
}

async addOrRemove(doAction, story) {
  const method = doAction === 'add' ? 'POST' : 'DELETE';
  //this is just saying that we are are doing oen thing based on weather or not we are adding the favorite and if not then we are removing the favorite. 
  const token = this.loginToken;
  //use this instance of the logintoken
  await axios({
    url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
    method: method,
    data: { token },
  }); 

  // console.log(this.favorites)
  // adding or removing information from favorites on this user. Grabbing the story information through the id. Must have a method, i.e. add or remove 
}
}
