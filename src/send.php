<?php
if((isset($_POST['name']) && $_POST['name']!="")
    &&(isset($_POST['phone']) && $_POST['phone']!="") && (isset($_POST['promo'])))
{ //Проверка отправилось ли наше поля name и не пустые ли они
    $to = '26emic73@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Сообщение с сайта'; //Загаловок сообщения
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Поступило сообщение с сайта:</p>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Телефон: '.$_POST['phone'].'</p>
                        <p>Промо-код: '.$_POST['promo'].'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя
    mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}else{
    echo "Ваше сообщение не отправлено!";
}

?>