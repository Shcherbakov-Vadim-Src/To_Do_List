const knopkaAddElement = document.querySelector('.plus');       // получил кнопку "ПЛЮС"
const textarea = document.querySelector('.textarea');          // и текстовое поле  

knopkaAddElement.addEventListener('click', (event) => {
    let newLi = document.createElement('li');            // создаю лишку и добавляю начинку
    newLi.innerHTML = `<form class="formText tasks__item"><textarea class="textarea" rows="1" cols="20"></textarea><button class="reset" type="button">x</button></form>`;
    document.querySelector('.textareaUl').append(newLi);
    deleteElementOfList();                              // сразу после создания элемента списка запускаю к нему функцию удаления
});

const buttonAddElement = document.querySelector('.button');        // получил кнопку
buttonAddElement.addEventListener('click', (event) => {
    let newLi2 = document.createElement('li');            // создаю лишку и добавляю начинку
    newLi2.innerHTML = `<form class="formText tasks__item"><textarea class="textarea" rows="1" cols="20"></textarea><button class="reset" type="button">x</button></form>`;
    document.querySelector('.textareaUl').append(newLi2);
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
        buttonSort.classList.remove('sortGreyUp');     // смена значка сортировки через замену класса стиля
        buttonSort.classList.add('sortGrey');
        let lists2 = [];
        let textareaArray2 = document.querySelectorAll('.textarea'); // получил значения из списков
        lists2 = Array.from(textareaArray2);          // преобразовал в массив эти данные (из нод листа)
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
//         Реализую возможность перетаскивания элементов списка. 

const tasksListElement = document.querySelector(`.textareaUl`);
const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);  // <-- добавил класс

//       Перебираю все элементы списка и присваиваю нужное значение
for (const task of taskElements) {
    task.draggable = true;
}
//-------------------------------------------------------------------------------------------//
//      Добавляю реакцию на начало и конец перетаскивания через добавение класса
tasksListElement.addEventListener(`dragstart`, (evt) => {             // <-- добавил класс в css   
    evt.target.classList.add(`selected`);                 // + отразил его в функции добавления элемента
})
  
tasksListElement.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});
//-------------------------------------------------------------------------------------------//
//      Реализую логику перетаскивания элементов + учёл положение курсора относительно центра элемента

const getNextElement = (cursorPosition, currentElement) => {
    // Получаю объект с размерами и координатами
    const currentElementCoord = currentElement.getBoundingClientRect();
    // Нахожу вертикальную координату центра текущего элемента
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
    // Если курсор выше центра элемента, возвращаю текущий элемент
    // В ином случае — следующий DOM-элемент
    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
    return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
    // Разрешаю сбрасывать элементы в эту область
    evt.preventDefault();
    // Нахожу перемещаемый элемент
    const activeElement = tasksListElement.querySelector(`.selected`);
    // Нахожу элемент, над которым в данный момент находится курсор
    const currentElement = evt.target;
    // Проверяю, что событие сработало:
    // 1. не на том элементе, который мы перемещаем,
    // 2. именно на элементе списка
    const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`tasks__item`);
    // Если нет, прерываю выполнение функции
    if (!isMoveable) {
      return;
    }
    // evt.clientY — вертикальная координата курсора в момент,
    // когда сработало событие
    const nextElement = getNextElement(evt.clientY, currentElement);
    // Проверяю, нужно ли менять элементы местами
    if (
      nextElement && 
      activeElement === nextElement.previousElementSibling ||
      activeElement === nextElement
    ) {
      // Если нет, выхожу из функции, чтобы избежать лишних изменений в DOM
      return;
    }
    tasksListElement.insertBefore(activeElement, nextElement);
});

taskElements.ondragstart = function() {
    return true;
};

//-------------------------------------------------------------------------------------------//