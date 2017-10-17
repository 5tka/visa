$(document).ready(function() { // начало document.ready

  $('.popup-btn').click(function(e) {
    e = event.preventDefault();
    var h4 = $(this).data('h4');
    var p = $(this).data('p');
    console.log(h4);
    console.log(p);
    var popup_h4 = $('.popup-form-wrapper').find('h4');
    var popup_p = $('.popup-form-wrapper').find('p');
    popup_h4.append(h4);
    popup_p.append(p);
    $('.popup-form-wrapper').bPopup({
      onClose: function() {
        popup_h4.empty();
        popup_p.empty();
      },
      closeClass: 'popup-close'
    });
  });


  $('.j_burger').click(function(e) {
    e = event.preventDefault();
    $(this)
      .toggleClass('is-active');
    $(this)
      .parent()
      .toggleClass('tr300');
  });

  // $('.j_si').mouseover(function(e) {
  //   e = event.preventDefault();

  //   $(this).children('.s-dscr-h').removeClass('dn');
  //   $(this).children('.s-dscr-h').addClass('db');
  //   // $(this).children('.s-dscr-h').toggleClass('db');
  // });
  // $('.j_si').mouseout(function(e) {
  //   e = event.preventDefault();

  //   $(this).children('.s-dscr-h').removeClass('db');
  //   $(this).children('.s-dscr-h').addClass('dn');
  //   // $(this).children('.s-dscr-h').toggleClass('db');
  // });

  $('.j_si').mouseover(function(e) {
    e = event.preventDefault();
    $(this).children('.s-dscr-h').stop(true).slideDown('fast');
  });

  $('.j_si').mouseout(function(e) {
    e = event.preventDefault();
    $(this).children('.s-dscr-h').stop(true).slideUp('fast');
  });


  $('.form-input__input').on('input', function() {
    var $this = $(this);
    if ($this.val() == '') {
      $this.removeClass('form-input__input_filled');
    } else {
      $this.addClass('form-input__input_filled');
    }
  });

  $('.feedbacks-slider').bxSlider({
    slideWidth: 530,
    pager: false,
    touchEnabled: false
  });
  $('.videos-slider').bxSlider({
    moveSlides: 1,
    minSlides: 3,
    maxSlides: 3,
    slideWidth: 490,
    slideMargin: 30,
    pager: false,
    touchEnabled: false
  });

  $(".c-text").mCustomScrollbar({
    theme: "dark"
  });
  $('.i-tell').mask("9-999-999-99-99");
}); // конец document.ready
// google map
function initialize() {
  //получаем наш div куда будем карту добавлять
  var mapCanvas = document.getElementById('map_canvas');
  // задаем параметры карты
  var mapOptions = {
    //Это центр куда спозиционируется наша карта при загрузке
    center: new google.maps.LatLng(49.8507068, 24.0226356),
    //увеличение под которым будет карта, от 0 до 18
    // 0 - минимальное увеличение - карта мира
    // 18 - максимально детальный масштаб
    zoom: 14,
    scrollwheel: false,
    disableDefaultUI: true,
    // styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
    //Тип карты - обычная дорожная карта
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Инициализируем карту
  var map = new google.maps.Map(mapCanvas, mapOptions);

  //Объявляем массив с нашими местами и маркерами
  var markers = [],
    myPlaces = [];
  //Добавляем места в массив
  myPlaces.push(new Place('ул. Зыряновская, 53, офис 107', 55.0114716, 82.9372195, 'Новосибирск'));
  //Теперь добавим маркеры для каждого места
  for (var i = 0, n = myPlaces.length; i < n; i++) {

    var companyImage = new google.maps.MarkerImage('img/icons/map_marker.png',
      new google.maps.Size(145, 93),
      new google.maps.Point(0, 0),
      new google.maps.Point(0, 45)
    );

    var marker = new google.maps.Marker({
      //расположение на карте
      position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
      map: map,
      icon: companyImage,
      //То что мы увидим при наведении мышкой на маркер
      title: myPlaces[i].name
    });
    //Добавим попап, который будет появляться при клике на маркер
    var infowindow = new google.maps.InfoWindow({
      content: '<h5>' + myPlaces[i].name + '</h5><br/>' + myPlaces[i].description
    });
    //привязываем попап к маркеру на карте
    makeInfoWindowEvent(map, infowindow, marker);
    markers.push(marker);
  }
}

function makeInfoWindowEvent(map, infowindow, marker) {
  //Привязываем событие КЛИК к маркеру
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}
//Это класс для удобного манипулирования местами
function Place(name, latitude, longitude, description) {
  this.name = name; // название
  this.latitude = latitude; // широта
  this.longitude = longitude; // долгота
  this.description = description; // описание места
}
//Когда документ загружен полностью - запускаем инициализацию карты.
google.maps.event.addDomListener(window, 'load', initialize);
