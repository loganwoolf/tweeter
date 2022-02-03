
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

const isValidTweet = function(tweetBody) {
  return tweetBody.length > 0 && tweetBody.length <= 140;
};

const sendTweet = function(event) {
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
    showError(tweetBody.length);
  } else if (tweetBody.length > 140) {
    showError(tweetBody.length);
  }
}
