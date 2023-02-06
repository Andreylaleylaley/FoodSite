'use strict';

window.addEventListener('DOMContentLoaded', () => { // DOMCONTENTLOADED ждет пока весь контент в браузере загрузится
  //TABS
    const tabs = document.querySelectorAll('.tabheader__item'), // получаем наши подписи ПОСТНОЕ СБАЛАНСИРОВАННОЕ И Т.Д.
          tabsContent = document.querySelectorAll('.tabcontent'),// Получаем наши дивы которые содержат в себе картинки с едой и описание в отдельном блоке поверх картинки
          tabsParent = document.querySelector('.tabheader__items'); //получаем оберточный блок для всех нащих табхедер айтемов(для последущего делегирования событий)

          function hideTabContent () { 
            tabsContent.forEach(item => { // перебираем наш псевдомассив и назначаем для каждого элемента класс ХАЙД который дисплэй нон и удаляем от туда класс ШОУ И ФЭЙД ЕСЛИ ОНИ НАЗНАЧЕНЫ(ФЭЙД ЭТО АНИМАЦИЯ)
                item.classList.add('hide');
                item.classList.remove('show', 'fade'); // просто записываем инлайновый стиль для этого элемента скрываем все элементы

            }); // перебор всех элементов псевдомассива табсконтент для скрытия их с экрана
            tabs.forEach(tab => {
                tab.classList.remove('tabheader__item_active');
            });  // функция по удалению класса активности (НИЖНЕГО подчеркивания в наших надписях)
          }

          function showTabContent (i = 0) { // = 0 это дефолтное значение то есть если функция передается без аргумента по умолчанию будет подставляться 0
            tabsContent[i].classList.add('show', 'fade'); // КЛАССЫ ШОУ ХАЙД У НАС ДОБАВЛЕНЫ В СИ ЭС ЭС НО ИХ НЕТ НА СТРАНИЦЕ НАПРЯМУЮ
            tabsContent[i].classList.remove('hide');

            tabs[i].classList.add('tabheader__item_active');
          } // эта функция для вывода таба табу будет присваиваться класс ШОУ и ФЭЙД  также подписи сбоку будет нижнее подчеркивание АЙ тут это будет соответсвовать номеру таба
          hideTabContent();
          showTabContent();  //вызов обеих функций для удаления всего лишнего с сайта и чтобы не поплыла верстка

          tabsParent.addEventListener('click', (event) => {  //используем делегирование событий для тэбспэрент
            const target = event.target; //чтобы каждый раз не писать ивент таргет обьявляем переменную 
            if(target && target.classList.contains('tabheader__item')) { //если есть таргет и он содержит табхедер__айтем то обьявляем перебор в псевдомассиве табс
                tabs.forEach( (item, i) => { //
                    if (target == item) { // кликнули мы в третий таб начинается перебор и как только  ай =3 и таргет равно трем вызываются две наших функции  
                    hideTabContent();
                    showTabContent(i); //сюда будет подставлятся номер по порядку перебора
    
                    }
                });
            }
          });


          // TIMER
          const deadline = '2023-01-12';
          function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - new Date(), // тоже самое что и new Date() здесь мы получим количеству миллисекунд котороое и будет нашим конечным временем
                  days = Math.floor(t / (1000 * 60 * 60 * 24)), // t делим на на скобках(миллисек умножаем на 60 секунд умножаем на 60 минут и 24 часа) и в скобках получается дни
                  hours = Math.floor( (t / (1000 * 60 * 60) % 24) ), // Т делим на (милисекунды умнодаем на секунды умножаем на минуты и делим на 24 и в остатке у нас появятся часы которые мы округкляем до целого)
                  minutes = Math.floor( (t / 1000 / 60 ) % 60), // получае сначало количество миллисекунд потом количество секунд и количество минут
                  seconds = Math.floor( (t / 1000) % 60); // все просто делим на количество миллисекунд и в остатке получаем секунды
              return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
              };
              }

              function getZero(num) { // делаем функцию помощник  эта функция нужна для того чтобы мы подставляли ноль к часам и минутам на странице
                if(num >= 0 && num <10) {
                  return ` 0${num}`;
                }else {
                  return num;
                }
              }
            function setClock(selector, endtime) {  // делаем функцию для запуливания нашего таймера на страницу 
              const timer = document.querySelector(selector), // передаем аргументов селектор чтобы наша функция могла использоваться по всей странице(в селектор будет передаваться элемент со страницы где должен будет отображен таймер)
                    days = timer.querySelector('#days'),  // забиваем сюда наши уникальные айди со страницы
                    hours = timer.querySelector('#hours'),
                    minutes = timer.querySelector('#minutes'),
                    seconds = timer.querySelector('#seconds'),
                    timeInterval = setInterval(updateClock,1000); // создаем сет интервал который будет запускать функцию апдейтклок каждую секунду
                updateClock(); // сюда мы вставляем апдейт клок для того чтобы не моргала наша верстка так как мы при запуске сначало выполнится весь сет клок потом только апдейт
                // мы же сразу запустим апдейт клок после сетклок после ее выполнения она удалится и и все будет работать без моргания в верстке
              function updateClock (){
                const t = getTimeRemaining(endtime);  // вызываем нашу функцию с полученным значением наших дней часов и т.д.
                days.innerHTML = getZero(t.days); //  с помощью иннера ХТМЛ мы мы присваиваем нашим полученным селекторам значения из функции гетТаймРемейнинг
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = t.minutes;
                seconds.innerHTML = t.seconds;


                if (t.total <=0){ // если время вышло (идет в отрицательную сторону) останавливаем таймер
                  clearInterval(timeInterval);
                }
              }
            }
          setClock('.timer', deadline);





          // Modal

 let  modalCall = document.querySelectorAll('[data-modal'), // в квадратных скобках получение по атрибуту 
      modal = document.querySelector('.modal'); // получаем элементы со страницы


function closeModal (){ // функция для закрытия модального окна
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = 'visible';
    }

  function showModal(){
          modal.classList.add('show');
          modal.classList.remove('hide');
          document.body.style.overflow = 'hidden';
          clearInterval(modalTimerId); // если пользователь уже открывал модальное окно
  }
    modalCall.forEach(btn => {
      btn.addEventListener('click', showModal);
        });



  modal.addEventListener('click', (e) => { // обработчик события если мы нажимаем вне модального окна
          if(e.target === modal || e.target.getAttribute('data-close') == ''){ //условие закртытия модали если еще и таргет над крестиком
          closeModal(); // ХОРОШЕЙ ПРАКТИКОЙ НАПИСАНЯ КОДА ЯВЛЯЕТСЯ ТО ЧТО ЕСЛИ КОД ПОВТОРЯЕТСЯ БОЛЬШЕ ОДНОГО РАЗА ЗНАЧИТ НАДО ЕГО ЗАБИТЬ В ФУНКЦИЮ
}

  });


document.addEventListener('keydown', (e) =>{ // обработчик события если мы нажимаем на клавишу ЕСКЕЙП
    if(e.code === 'Escape'){
      closeModal();
    }
});


const modalTimerId = setTimeout(showModal,3000);  // появления модального окна через 3 секунды
// Modal

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= 
      document.documentElement.scrollHeight - 1) { // -1 пиксель это баг браузера технический
        showModal();
        window.removeEventListener('scroll', showModalByScroll); // для того чтобы один раз когда пользователь долистает до конца больше модалка не вызывалась
      } // условие если  количество прокрученных пикселей по вертикали плюс клиентская высота окна браузера
      //будет больше либо равна длинне скролла то это будет означать что пользователь долистал до конца

}
window.addEventListener('scroll', showModalByScroll);



// =====================================СОЗДАЕМ С ПОМОЩЬЮ КЛАССОВ АЙТЕМЫ
//  ВАРИАНТ МОЕГО КОДА



class ItemStructure  {
    constructor(src, alt, title, descr,price, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes ;
    }
    createStructure(){
      let div = document.createElement('div');
      this.div = 'menu__item';
      if(this.classes.length === 0){
        div.classList.add(this.div);
      } else {
        this.classes.forEach( className => div.classList.add(className));
      }
  
      div.innerHTML = `
        <img src = "${this.src}"></img> 
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
              <div div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      
      `;
      parrent.append(div);
    }

}
const grandPa = document.querySelector('.menu__field');
const parrent = grandPa.querySelector('.container');



new ItemStructure(
  "img/tabs/vegy.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  9,
  'menu__item',
  'big'
).createStructure();


//========================FORMS=====================

const forms = document.querySelectorAll('form'); //ПОЛУЧАЕМ формы

const message = { //обьявляем обьект сообщений процесса отправки на сервер данных
  loading: 'icons/spinner.svg',
  success: 'Thaks.We will connect you soon',
  failure:'Thats bad...'
};

forms.forEach(item =>{ //для каждой формы применяем функцию
  postData(item);
}); //перед ТЕСТИРОВАНИЕ СБРОСИТЬ КЕШ НА САЙТЕ SHIFT+ F5

function postData(form){ //функция для отправки формы на сервер
  form.addEventListener('submit', (e)=> { // submit событие отправки формы
    e.preventDefault(); //сбпрос стандартной перезагрузки страницы
    const statusMessage = document.createElement('img'); //добавляем сообщения процесса отправки на страницу
    statusMessage.src = message.loading; //атрибут срс равен свойству обьекта меседж который является путем к картинке
    statusMessage.textContent = message.loading;     // текст который будет выводится при отправки формы
    statusMessage.style.cssText = ` 
      display: block;
      margin: 0 auto;
    `; //правильней конечно просто сделать класс в CSS И потом добавить класс к статус меседж но делали тут как препод
    form.append(statusMessage); //добавляем к нашей форме это сообщение
    form.insertAdjacentElement('afterend', statusMessage); // метод вставки элемента в определенно положения элемента то есть читаем так вставить в элемент форм элемент статусМеседж
    //в конце
    

 
     //описываем метод HTTP и файл куда будет поститься данные
     // ОПИСЫВАЕМ ФАЙЛ когда мы используем связку XMLHttpRequest и FormData заголовок НАМ УСТАНАВЛИВАТЬ НЕ НУЖНО ОН УСТАНАВЛИВАЕТСЯ АВТОМАТИЧЕСКИ
    const formData = new FormData(form); //не все данные мы передаем в формате джейсон
    //также можно передавать в формате формДейта также там ключ значение 
    //САМОЕ ГЛАВНОЕ ЧТО ПРИ ОБРАБОТКЕ ФОРМ В ФОРМЕ В ВЕРСТКЕ ОБЯЗАЛЬНО ДОЛЖЕН БЫТЬ АТРИБУТ name = ''
    
    
    //==========здесь мы разбираем метод для отправки данных в формате джейсон
    //так как ФОРМ ДАТА нельзя просто так переформатировать в джейсон
    //необходимо перебрать его и запулить в обьект
    // const object = {};
    // formData.forEach( function(value, key) { //перебираем обьект формдата и наполняем наш обьект
    //   object[key] = value;
    // });

    // const json = JSON.stringify(object);


    fetch('server.php', {
      method: 'POST',
      // headers: {
      //   'Content-type':'application/json'
      // },
      body: formData
     }).then(data => { //дата это ответ от сервера в этом промисе мы выводим ответ в консоль
          console.log(data.response); //Выводим в консоль ответ от сервера
          showThanksModal(message.success); //и запускаем что все хорошо
          statusMessage.remove(); //удаляем спиннер
     }).catch(() => { //кэтч ловит ошибки то есть в случае ошибок делает это лучше всегда писать кэтч на всякий случай
          showThanksModal(message.failure);
     }).finally (() => { //после всех промисов сбарсываем форму
      form.reset();
     });

  });
}

function showThanksModal(message) { //функция для модернизации модального окна для показывания сообщения вместо формы что форма отправилась
  const prevModalDialog = document.querySelector('.modal__dialog'); //получаем модальное окно

  prevModalDialog.classList.add('hide');
  showModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class = "modal__content">
      <div class ="modal__close" data-close >×</div>
      <div class ="modal__title">${message}</div>
    </div>
  `;

  document.querySelector('.modal').append(thanksModal);

  setTimeout( () => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
  },4000);
}

});




