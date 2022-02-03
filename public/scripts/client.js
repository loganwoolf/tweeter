
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

  $('textarea').on('input', function() {
      const counter = $(this).next('div').children('output')[0];
      counter.innerText = 140 - this.value.length;
      if (this.value.length > 140) {
        return counter.style.color = '#FF0000';
      }
      return counter.style.color = null;
  });

  $('.nav-quick-tweet').on('click', toggleTweetForm);

  $('.new-tweet form').on("submit", sendTweet);

  loadTweets();

});
