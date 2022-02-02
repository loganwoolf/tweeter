/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  $('textarea').on({
    input: function() {
      const counter = $(this).next('div').children('output')[0];
      counter.innerText = 140 - this.value.length;
      if (this.value.length > 140) {
        return counter.style.color = '#FF0000';
      }
      return counter.style.color = null;
    }
  });

  const isValidTweet = function(tweetBody) {
    return tweetBody.length > 0 && tweetBody.length <= 140;
  };

  $('.new-tweet form').on("submit", function(event) {
    event.preventDefault();
    const tweetBody = this[0].value;
    if (isValidTweet(tweetBody)) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).then(loadTweets);
      return $(this)[0][0].value = '';
    }
    if (tweetBody.length === 0) {
      alert("Can't send an empty tweet!");
    } else if (tweetBody.length > 140) {
      alert("Tweet is too long!");
    }
  });

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
          <img src="${tweet.user.avatars}">
          <figcaption>${tweet.user.name}</figcaption>
        </figure>
        <p>${tweet.user.handle}</p>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <time>${timeago.format(tweet.created_at)}</time>
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

  loadTweets();

});
