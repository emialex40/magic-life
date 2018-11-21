$(document).ready(function () {
    //open modal
    var modal = $('#modal');

    $('.js-btn').on('click', function () {
      modal.fadeIn(600)
    });

    $('.js-close').on('click', function () {
        modal.fadeOut(600);
    });

    $('input[type="tel"]').inputmask('+7(999)999-99-99');

    //send form
    $('#form').submit(function (e) {
        e.preventDefault();

            var form_data = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: 'send.php',
                data: form_data,
                success: function () {
                    alert("success")
                    location.reload();
                },
                error: function () {
                    alert('При отправке сообщения произошла ошибка!');
                }
            });
    });
});