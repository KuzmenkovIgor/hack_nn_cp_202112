var myMap;
let routeSet;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

let zoomSet = 14;

function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[55.796127, 49.106414], // Москва
        zoom: 14
    });
    
    myMap.controls
        // Кнопка изменения масштаба.
        .add('zoomControl', { left: 5, top: 5 })
        // Список типов карты
        .add('typeSelector')
        // Стандартный набор кнопок
        .add('mapTools', { left: 35, top: 5 });

    // Также в метод add можно передать экземпляр класса элемента управления.
    // Например, панель управления пробками.
    //var trafficControl = new ymaps.control.TrafficControl();
    myMap.controls
        .add(new ymaps.control.MiniMap({
            type: 'yandex#publicMap'
        }));
    
    /*
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coordPosition');
            myMap.balloon.open(coords, {
                contentHeader:'Событие!',
                contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                    '<p>Координаты щелчка: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                contentFooter:'<sup>Щелкните еще раз</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });
    */
    
    // Создаем массив для всех координат мусорных баков, а залем пушим в него координаты.
    // Координаты получаем из ТХТ файла подтягиваемого через АЯКС с бэкенда.
    
    let arrRoute = [];
    
    arrRoute.push(55.773193);
    arrRoute.push(49.111559);
    
    arrRoute.push(55.777413);
    arrRoute.push(49.111799);
    
    arrRoute.push(55.784206);
    arrRoute.push(49.109837);
    
    arrRoute.push(55.789508);
    arrRoute.push(49.101949);
    
    // Мусорные баки
    
    var myPlacemark = new ymaps.Placemark([55.773193, 49.111559], {}, {
        iconImageHref: 'IMG/trashCan.png',
        iconImageSize: [40, 50],
        iconImageOffset: [-3, -42]
    });
    myMap.geoObjects.add(myPlacemark);
    
    var myPlacemark = new ymaps.Placemark([55.777413, 49.111799], {}, {
        iconImageHref: 'IMG/trashCan.png',
        iconImageSize: [40, 50],
        iconImageOffset: [-3, -42]
    });
    myMap.geoObjects.add(myPlacemark);
    
    var myPlacemark = new ymaps.Placemark([55.784206, 49.109837], {}, {
        iconImageHref: 'IMG/trashCan.png',
        iconImageSize: [40, 50],
        iconImageOffset: [-3, -42]
    });
    myMap.geoObjects.add(myPlacemark);
    
    var myPlacemark = new ymaps.Placemark([55.789508, 49.101949], {}, {
        iconImageHref: 'IMG/trashCan.png',
        iconImageSize: [40, 50],
        iconImageOffset: [-3, -42]
    });
    myMap.geoObjects.add(myPlacemark);
    
    // Субботники
    let temp = '22.08.2025, 11:30<br>';
    let air = 'Возьмите с собой метелки и ведра.';
    let color = 'rgba(0, 166, 0, 0.4)';
            
    var myCircle = new ymaps.Circle([
        [55.798279, 49.135295],
        200
    ], {
        balloonContent: "Дата: " + temp + "<br>" + air + "",
        hintContent: "Дата: " + temp + "<br>" + air + ""
    }, {
        draggable: false,
        fillColor: color,
        strokeColor: color,
        strokeOpacity: 0.1,
        strokeWidth: 2
    });
    myMap.geoObjects.add(myCircle);
    
    var myCircle = new ymaps.Circle([
        [55.789962, 49.106456],
        200
    ], {
        balloonContent: "Дата: " + temp + "<br>" + air + "",
        hintContent: "Дата: " + temp + "<br>" + air + ""
    }, {
        draggable: false,
        fillColor: color,
        strokeColor: color,
        strokeOpacity: 0.1,
        strokeWidth: 2
    });
    myMap.geoObjects.add(myCircle);
    
    var myCircle = new ymaps.Circle([
        [55.775935, 49.156410],
        200
    ], {
        balloonContent: "Дата: " + temp + "<br>" + air + "",
        hintContent: "Дата: " + temp + "<br>" + air + ""
    }, {
        draggable: false,
        fillColor: color,
        strokeColor: color,
        strokeOpacity: 0.1,
        strokeWidth: 2
    });
    myMap.geoObjects.add(myCircle);
    
    function routeCrazy(){
        document.querySelector('#setRoute').onclick = function(){
           ymaps.route([
                'Роторная ул., 1Г, Казань',
                {
                    type: 'viaPoint',
                    point: [arrRoute[0], arrRoute[1]]
                },
                {
                    type: 'viaPoint',
                    point: [arrRoute[4], arrRoute[5]]
                },
                {
                    type: 'viaPoint',
                    point: [arrRoute[2], arrRoute[3]]
                },
                {
                    type: 'viaPoint',
                    point: [arrRoute[6], arrRoute[7]]
                }
            ]).then(
                function (route) {
                        document.querySelector('#setRoute').innerHTML = 'удалить маршрут';
                        myMap.geoObjects.add(route);
                        document.querySelector('#setRoute').onclick = function(){
                            document.querySelector('#setRoute').innerHTML = 'проложить маршрут';
                            myMap.geoObjects.remove(route);
                            routeCrazy();
                        }
                },
                function (error) {
                    alert("Возникла ошибка: " + error.message);
                }
            );
        }
    }
    routeCrazy();
}

/*

let map = document.querySelector('#map');

map.onmousewheel = function(event){
    var delta = 0;
    if (!event) event = window.event; // Событие IE.
    // Установим кроссбраузерную delta
    if (event.wheelDelta) {
        // IE, Opera, safari, chrome - кратность дельта равна 120
        delta = event.wheelDelta/120;
    } else if (event.detail) {
        // Mozilla, кратность дельта равна 3
        delta = -event.detail/3;
    }
    if (delta) {
        // Отменим текущее событие - событие поумолчанию (скролинг окна).
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.returnValue = false; // для IE

        // если дельта больше 0, то колесо крутят вверх, иначе вниз
        var dir = delta > 0 ? 'Up' : 'Down';
        
        if (delta > 0){
            zoomSet++;
            let zoom = ymaps.Zoom();
            zoom = zoomSet;
        } else {
            zoomSet--;
            let zoom = ymaps.Zoom();
            zoom = zoomSet;
        }
        document.getElementById('res').innerHTML=dir+' '+Math.abs(delta);
    }
}

//addEvent(window, 'mousewheel', wheel);
//addEvent(window, 'DOMMouseScroll', wheel);

*/