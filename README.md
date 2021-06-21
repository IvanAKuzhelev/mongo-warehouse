Сервер использует Express и Mongoose.
Live: https://iak-fs.xyz/warehouse/

## Замечания и варианты улучшения

Проекту будут полезны тесты (изучение соответствующих библиотек сейчас для меня является одной из основных задач на ближайшее будущее). Упаковка в контейнеры и БД и сервера также видится разумным вариантом. Реализация нормального логгинга также в ближайших планах на будущее.

Каждые 7-10 быстрых последовательных GET запросов на /products в ответе приходит только количстводокументов, но не содержание первой страницы даже после упаковки соответствующей части функции в Promise.all. Буду благодарен совету на тему того, что может вызывать такое поведение.

Функция patchProductAtId не очень DRY, но способы избежать этого усложняли код, поэтому остановился на таком варианте.

Есть нехорошее чувство по поводу создания GridFSBucket на каждом запросе и производительности. Также буду благодарен совету на эту тему.


## Техническое описание

Список товаров предоставляет через GET на /products
Возможные параметры:

- page - целое число, запрашиваемая страница, по умолчанию 1, ревлизована оффсетом
- present - boolean, отсортировывает отстутвующие товары, по умолчанию false
- maxprice - целое число, максимальная цена товаров в списке, по умолчанию 1
- search - поисковый запрос, uri-safe regexp

Отдельный товар через GET на /products/id

id предоставляется БД и содержится во всех ответах с товарами

Обновление через PATCH на /products/id

Происходит только при совпадении старых данных клиента с серверными.

Пример тела запроса:
{
"name": {
"old": "fruits 8129",
"new": "some fruit"
},
"price": {
"old": 44,
"new": 22
},
"count": {
"old": 42,
"new": 38
}
}

Удаление через DELETE на /products/id

Coздание нового товара осуществляется через POST на /products
Запрос должен содержать тело следующей формы:
{
"name": string,
"count": number >=0,
"price": number>0
}
Если товар обладает изображением, то в объекте товара будет находится поле imageId,
значение которого id в images/id, GET на которую осуществляет потоковую загрузку изображения.

Добавление изображения товару осуществляется через POST на images/id, где id - id товара, запрос - multipart/form с полем image, содержащим изображение.
