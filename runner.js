const knopka = document.querySelector('.plus');        // получил кнопку
const textarea = document.querySelector('.textarea'); // и текстовое поле

knopka.addEventListener('click', (event) => {
    let newLi = document.createElement('li');            // создаю лишку и добавляю начинку
    newLi.innerHTML = `<form class="formText"><textarea class="textarea" rows="1" cols="20"></textarea><button class="reset" type="button">x</button></form>`;
    document.querySelector('.textareaUl').append(newLi);
    deleteElementOfList();                              // сразу после создания элемента списка запускаю к нему функцию удаления
});
//-------------------------------------------------------------------------------------------------------------//
function deleteElementOfList() {                                  // функция удаления элементов списка
    const buttonDelete = document.querySelectorAll('.reset');    // поймал кнопку удаления элемента списка
    buttonDelete.forEach((el) => {
        el.addEventListener('click', (event) => {               // обработчик удаления по клику
            event.preventDefault();
            event.target.parentElement.parentElement.remove();
        });
    });
};
//-------------------------------------------------------------------------------------------------------------//
let lists = [];                                            // создал пустой массив для работы
const buttonSort = document.querySelector('.sortGrey');   // поймал кнопку сортировки

let flag = true;
buttonSort.addEventListener('click', (event) => {       // обработчик события по клику 
    buttonSort.classList.remove('sortGrey');       // смена значка сортировки через замену класса стиля
    buttonSort.classList.add('sortGreyUp');
    if (flag === true) {                           // флаг для работы сортировки массива
        let textareaArray = document.querySelectorAll('.textarea'); // получил значения из списков
        lists = Array.from(textareaArray);          // преобразовал в массив эти данные (из нод листа)
        lists.sort((a, b) => {                     //  функция сортировки по значениям велью (т.к. это текстАрея)
            if (a.value > b.value) {
                return 1;
            } else if (a.value < b.value) {
                return -1;
            }
            return 0;
        });
        let textareaUl = document.querySelector('.textareaUl');    // поймал список для добавления отсортированных данных
        lists.forEach((el) => {                                   // залил отсортированные значения сразу в родителя li
            textareaUl.appendChild(el.parentElement.parentElement);
        });
        flag = false;                              // меняю флаг
    } else if (flag === false) {
        console.log(flag === false);
        buttonSort.classList.remove('sortGreyUp');     // смена значка сортировки через замену класса стиля
        buttonSort.classList.add('sortGrey');
        let lists2 = [];
        let textareaArray2 = document.querySelectorAll('.textarea'); // получил значения из списков
        lists2 = Array.from(textareaArray2);          // преобразовал в массив эти данные (из нод листа)
        console.log(lists2);
        lists2.sort((a, b) => {                     //  функция сортировки по значениям велью (т.к. это текстАрея)
            if (a.value > b.value) {
                return -1;
            } else if (a.value < b.value) {
                return 1;
            }
            return 0;
        });
        let textareaUl2 = document.querySelector('.textareaUl');    // поймал список для добавления отсортированных данных
        lists2.forEach((el) => {                    // залил отсортированные с реверсом значения сразу в родителя li
            textareaUl2.appendChild(el.parentElement.parentElement); 
        });
        flag = true;                                // меняю флаг
    }
});
//-------------------------------------------------------------------------------------------------------------//

