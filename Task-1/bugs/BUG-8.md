[Назад](../BUGS.md)

# Bug 8

### Ошибка в работе фильтра Цена

### Шаги воспроизведения

1. Открыть сайт [Авито](https://www.avito.ru)   
2. Нажать на иконку Электроника  
3. Нажать на иконку Телефоны  
4. В поле Производитель ввести Samsung    
5. В фильтре Память выбрать 512 ГБ  
6. В фильтре Цвет выбрать синий  
7. В фильтре Цена в поле до ввести 50000    
8. Нажать кнопку "Показать..."     

### Ожидаемый результат
* На странице карточки только с ценой до 50000     

### Фактический результат
* На странице есть карточка с ценой 59999  

### Приоритет
* Medium

### Окружение
*  Desktop, дополнительная информация, с какого устройства сделан скриншот, отсутствует  
### Скриншот
 ![bug-8](images/bug-8.png)     

### Примечание
*  Баг актуален в случае, когда фильтр применен и при условии, что цена до 50000 включительно  