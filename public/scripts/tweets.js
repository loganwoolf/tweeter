
const escape = function(tweetBody) {
  let container = document.createElement('div');
  container.appendChild(document.createTextNode(tweetBody));
  return container.innerHTML;
};

const renderTweets = function(tweets) {
  $('#timeline').empty();
  tweets.forEach(tweet => $('#timeline').append(createTweetElement(tweet)));
};

const createTweetElement = function(tweet) {
  return $('<article>')
    .addClass('tweet')
    .append(
      `<header>
        <figure>
          <img src="${escape(tweet.user.avatars)}">
          <figcaption>${escape(tweet.user.name)}</figcaption>
        </figure>
        <p>${escape(tweet.user.handle)}</p>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <time>${timeago.format(escape(tweet.created_at))}</time>
        <span>
          <button class="flag"><i class="fas fa-flag"></i></button>
          <button class="retweet"><i class="fas fa-retweet"></i></button>
          <button class="like"><i class="fas fa-heart"></i></button>
        </span>
      </footer>
      `
    );
};

const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets"
  }).then(tweets => {
    renderTweets(tweets);
  });
};
