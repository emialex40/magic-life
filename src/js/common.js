$(document).ready(function () {
    //open modal
    var modal = $('#modal');

    $('.js-btn').on('click', function () {
      modal.fadeIn(600)
    });

    $('.js-close').on('click', function () {
        modal.fadeOut(600);
    });

    //send form
    $('#form').submit(function (e) {
        e.preventDefault();

        var name = $('input[name="name"]'),
            phone = $('input[name="phone"]'),
            regName = /^[a-zA-Zа-яА-Я]+$/;

        if (name.val() !== '') {
            if (regName.test(name.val())) {
                if(phone.val() !== '') {
                    var form_data = $(this).serialize();
                    $.ajax({
                        type: 'POST',
                        url: 'send.php',
                        data: form_data,
                        success: function() {
                            location.reload();
                        },
                        error: function () {
                            alert('При отправке сообщения произошла ошибка!');
                        }
                    });
                } else {
                    alert('Поле "Телефон обязательно для заполнения!"');
                }

            }else {
                alert('В поле "Имя" рарешено вводить только буквы!');
            }
        } else {
            alert('Поле "Имя" обязательно для заполнения!');
        }
    });


});