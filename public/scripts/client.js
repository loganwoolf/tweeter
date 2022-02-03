/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  $(window).on('scroll', function() {
    const $jumpButton = $('#jump-to-top');
    const $scrollPosition = $(this).scrollTop();
    const $timelinePosition = $('#timeline').offset().top;
    if ($scrollPosition > $timelinePosition) {
      return $jumpButton.show();
    }
    return $jumpButton.hide();
  });

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

  const escape = function(tweetBody) {
    let container = document.createElement('div');
    container.appendChild(document.createTextNode(tweetBody));
    return container.innerHTML;
  };

  const showError = function tweetLengthError(length) {
    // magic timeout number of 600 is 200ms more than default animation length of slideUp/slideDown
    // text changes at exactly the right moment that text is invisible if two opposite
    // length errors are shown back to back
    let timeout = 0;
    const $errorBlock = $('#error-block');
    if ($errorBlock[0].style.display === 'block') {
      timeout = 600;
    }
    setTimeout(() => {
      if (length === 0) {
        $errorBlock.children('div').children('p').text("You forgot to type in a tweet!");
        return $errorBlock.slideDown();
      }
      $errorBlock.children('div').children('p').text("Your tweet is too long! Try to reword it to be at most 140 characters.");
      return $errorBlock.slideDown();
    }, timeout);
  };

  const toggleTweetForm = function() {
    const $tweetForm = $('.new-tweet');
    if ($tweetForm[0].style.display === 'none') {
      return $tweetForm.slideDown({
        complete: () => {
          $tweetForm.children('form').children('textarea').focus();
        }
      });
    }
    $tweetForm.slideUp();
  };

  $('.nav-quick-tweet').on('click', toggleTweetForm);

  $('.new-tweet form').on("submit", function(event) {
    event.preventDefault();
    const $errorBlock = $('#error-block');
    if ($errorBlock[0].style.display === 'block') {
      $errorBlock.slideUp();
    }
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
      // alert("Can't send an empty tweet!");
      showError(tweetBody.length);
    } else if (tweetBody.length > 140) {
      // alert("Tweet is too long!");
      showError(tweetBody.length);
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

  loadTweets();

});
