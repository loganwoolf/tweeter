
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

  $('textarea').on('input', updateCount);

  $('.nav-quick-tweet').on('click', toggleTweetForm);

  $('.new-tweet form').on("submit", sendTweet);

  loadTweets();

});
