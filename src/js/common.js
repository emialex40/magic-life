$(document).ready(function () {
    var modal = $('#modal');

    $('.js-btn').on('click', function () {
      modal.fadeIn(600)
    });

    $('.js-close').on('click', function () {
        modal.fadeOut(600);
    });


});