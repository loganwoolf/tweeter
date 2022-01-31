$(document).ready(function() {

  $('textarea').on({
      input: function(e) {
        const counter = $(this).next('div').children('output')[0]
        counter.innerText = 140 - this.value.length;
        if (this.value.length > 140) {
          counter.style.color = '#FF0000'
        } else {
          counter.style.color = null
        }
      }
  });

});