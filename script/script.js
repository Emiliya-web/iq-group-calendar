
// Displaying month

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь','Октябрь', 'Ноябрь', 'Декабрь'];
const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const currentMonth = document.querySelector('.app__current-month');

let date = new Date;
date.setFullYear(2021,10);
date.setDate(1);

currentMonth.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`

//Displaying the calendar table 

let calendar = document.querySelector('.app__days');

const buildCalendarTemplate = () => {

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    let firstDay = date.getDay();
    let lastDayIndex =  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    let nextDays = 7 - lastDayIndex;

    let day;

    for (let i = firstDay; i > 1; i--) {
        calendar.innerHTML += `<div class="app__day">${prevLastDay - i}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        calendar.innerHTML += `<div class='app__day'>${i}</day>`;
    }

    if (lastDayIndex === 0) {
        return;
    } else {
        for(let i = 1; i <= nextDays; i++) {
            calendar.innerHTML += `<div class='app__day'>${i}</day>`;
        }
    }

    for(let i = 0; i < 7; i++) {
        day = `${dayNames[i]}, `
        calendar.children[i].prepend(day)
    }

}

buildCalendarTemplate();

// Switch month 

const btnPrevMonth = document.querySelector('.app__month_prev');
const btnNextMonth = document.querySelector('.app__month_next');

btnPrevMonth.addEventListener('click', () => {

    date.setMonth(date.getMonth() - 1);
    currentMonth.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
    calendar.innerHTML = '';
    buildCalendarTemplate();
})

btnNextMonth.addEventListener('click', () => {

    date.setMonth(date.getMonth() + 1);
    currentMonth.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
    calendar.innerHTML = '';
    buildCalendarTemplate();
})

// transition to today

const todayBtn = document.querySelector('#current');

todayBtn.addEventListener('click', () => {
    const currentDate = new Date;

    date.setFullYear(currentDate.getFullYear(),currentDate.getMonth());

    currentMonth.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

    calendar.innerHTML = '';
    buildCalendarTemplate();
})

// Add the event

const addEventBtn = document.querySelector('.buttons_add');
const modalAdd = document.querySelector('.modal_add');
const modalClose = document.querySelector('.modal__close');
const daysBlockArr = document.querySelectorAll('.app__day');

addEventBtn.addEventListener('click', () => {
    modalAdd.classList.toggle('active');
})

const closeModal = modal => {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        console.log(modal)
    })
}

closeModal(modalAdd);

daysBlockArr.forEach((day, index) => {
    day.innerHTML += `
        <div id=${index} class="modal full-modall">
            <button type="button" class="modal__close">
                <img src="img/cross.png" alt="Закрыть">
            </button>
            <input name="event" type="text" class="input modal__input" placeholder="Событие">
            <input name="date" type="text" class="input modal__input" placeholder="День, Месяц, Год">
            <input name="members" type="text" class="input modal__input" placeholder="Имена участников">
            <textarea name="description" placeholder="Описание" class="input"></textarea>
            <div class="full-modall__btns-wrap">
                <button type="button" class="modal__btn">Готово</button>
                <button type="button" class="modal__btn">Удалить</button>
            </div>
        </div>`;

    const modalFullArr = document.querySelectorAll('.full-modall');
    const modalClose = document.querySelectorAll('button.modal__close');

    day.addEventListener('click', (e) => {
        if (e.target === daysBlockArr[index]) {
            modalFullArr[index].classList.toggle('active')
        }
    })

    modalClose[index].addEventListener('click', (e) => {
        modalFullArr[index - 1].classList.remove('active');
        console.log(modalFullArr[index - 1])
    })

    modalFullArr.forEach(item => {
        // item.classList.remove('active')
        console.log(item)
    })
})








