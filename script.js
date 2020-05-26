let library = [
    {nameBook: 'Происхождение', authorNameBook: 'Дэн', authorSurnameBook: 'Браун', yearBook: 2017, genreBook: 'Фантастика'},
    {nameBook: 'Текст', authorNameBook: 'Дмитрий', authorSurnameBook: 'Глуховский', yearBook: 2015, genreBook: 'Детектив'},
    {nameBook: 'Мертвая зона', authorNameBook: 'Стивен', authorSurnameBook: 'Кинг', yearBook: 1979, genreBook: 'Триллер'},
    {nameBook: 'Война и Мир', authorNameBook: 'Лев', authorSurnameBook: 'Толстой', yearBook: 1865, genreBook: 'Классика'},
    {nameBook: 'Отцы и дети', authorNameBook: 'Иван', authorSurnameBook: 'Тургенев', yearBook: 1861, genreBook: 'Классика'},
    {nameBook: 'Мир глазами кота Боба', authorNameBook: 'Джеймс', authorSurnameBook: 'Боуэн', yearBook: 2013, genreBook: 'Роман'},
    {nameBook: 'Домовой', authorNameBook: 'Олег', authorSurnameBook: 'Рой', yearBook: 2020, genreBook: 'Проза'},
    {nameBook: 'The Sipmsons', authorNameBook: 'Мэтт', authorSurnameBook: 'Грёнинг', yearBook: 2010, genreBook: 'Комиксы'},

];

//"Функция печати"
let printLibrary = function (library) {
    $('#library').html('');
    $('#library').append('<table>')
    $('#library').append(`<tr class="tr_big">
    <td>Название книги</td>
        <td>Автор</td>
     <td>Год издания</td>  
     <td>Жанр</td> 
     </tr>`);
    library.forEach(function (el) {
        $('#library').append(`<tr>
    <td>${el.nameBook}</td>
    <td>${el.authorNameBook} ${el.authorSurnameBook}</td>
    <td>${el.yearBook}</td>
    <td>${el.genreBook}</td>
</tr>`);
    });
    $('#library').append('</table>');
};

//Функция "Очистка"

function clearForm() {
    $('#nameBook').val("");
    $('#authorNameBook').val("");
    $('#authorSurnameBook').val("");
    $('#yearBook').val("");
}

//"Добавление новой книги"

$('#addNewBook').click(function () {
    library.push({
        nameBook: $('#nameBook').val(),
        authorNameBook: $('#authorNameBook').val(),
        authorSurnameBook: $('#authorSurnameBook').val(),
        yearBook: $('#yearBook').val(),
        genreBook: $('#genreBook').val()
    })
    clearForm()
    printLibrary(library);
});


//СОРТИРОВКА

//По году
$('#sortYearBookUp').click(function () {
    library.sort(( a,b ) => a.yearBook - b.yearBook);
    printLibrary(library);
});

$('#sortYearBookDown').click(function () {
    library.sort(( a,b ) => b.yearBook - a.yearBook);
    printLibrary(library);
});

//По автору
$('#sortAuthorSurnameBookUp').click(function () {
    library.sort((a, b) => a.authorSurnameBook > b.authorSurnameBook ? 1 : -1);
    printLibrary(library);
});

$('#sortAuthorSurnameBookDown').click(function () {
    library.sort((a, b) => b.authorSurnameBook > a.authorSurnameBook ? 1 : -1);
    printLibrary(library);
});


//ФИЛЬТРАЦИЯ

let filteredArrayByGenre = function(genreBook){
   return library.filter((el) => el.genreBook === genreBook);
};

let filteredArrayByYear = function(library,from,to){
    from = parseInt(from);
    to = parseInt(to);
    return library.filter(function (el) {
        let conditionFromValid = isNaN(from) || el.yearBook >= from;
        let conditionToValid = isNaN(to) || el.yearBook <= to;
        return conditionFromValid && conditionToValid;
    });

};

let filterBtnClickListener = function (e) {
    let buttonId = $(e.target).attr('id');
    let libraryFiltered;
    let from = $('#publication-from').val();
    let to = $('#publication-to').val();
     switch (buttonId) {
         case 'filterAll':
             libraryFiltered = library;
             break;
         case 'filterDetective':
             libraryFiltered = filteredArrayByGenre('Детектив');
             printLibrary(libraryFiltered);
             break;
         case 'filterFantasy':
             libraryFiltered = filteredArrayByGenre('Фантастика');
             printLibrary(libraryFiltered);
             break;
         case 'filterThriller':
             libraryFiltered = filteredArrayByGenre('Триллер');
             printLibrary(libraryFiltered);
             break;
         case 'filterNovel':
             libraryFiltered = filteredArrayByGenre('Роман');
             printLibrary(libraryFiltered);
             break;
         case 'filterProse':
             libraryFiltered = filteredArrayByGenre('Проза');
             printLibrary(libraryFiltered);
             break;
         case 'filterClassic':
             libraryFiltered = filteredArrayByGenre('Классика');
             printLibrary(libraryFiltered);
             break;
         case 'filterComics':
             libraryFiltered = filteredArrayByGenre('Комиксы');
             printLibrary(libraryFiltered);
             break;
}

    libraryFiltered = filteredArrayByYear(libraryFiltered,from,to);
     printLibrary(libraryFiltered);
};

$('.filter-button').click(filterBtnClickListener);

printLibrary(library);