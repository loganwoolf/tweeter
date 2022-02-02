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
        <time>${tweet.created_at}</time>
        <span>
          <button class="flag"><i class="fas fa-flag"></i></button>
          <button class="retweet"><i class="fas fa-retweet"></i></button>
          <button class="like"><i class="fas fa-heart"></i></button>
        </span>
      </footer>
      `
      );
  };
});
