'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////
///////////////////////////////////////////////
/*
// SELECTING ELEMENTS
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// CREATING AND INSERTING ELEMENTS
// .isnertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'; // ovo ubacuje tekst
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // postavlja element kao first child (vrh)
header.append(message); // postavlja element kao last child (dno)
// header.append(message.cloneNode(true)); // kopira element i postavlja ga istovremeno kao last child

// header.before(message); // postavlja element pre header-a
// header.after(message); // postavlja element posle header-a

//delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); // stari nacin uklanjanja elemenata
  });

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // ne prikazuje se nista u konzoli zato sto color nije inline style u okviru html-a
console.log(message.style.backgroundColor); // prikazuje se rgb(55, 56, 61) zato sto je backgroundColor inline

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
// getComputedStyle omogucava da prikaze/odabere style koji nije definisan u html ili css

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// nestandardizovani atributi
console.log(logo.mleko); //ovo nece raditi (undefined)
console.log(logo.getAttribute('mleko')); // ovo hoce (uros)
//ubacivanje nestandardizovanog atributa
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //absolute source
console.log(logo.getAttribute('src')); //relative source

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(logo.getAttribute('link'));

// data attributes
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('klasa');
logo.classList.remove('klasa');
logo.classList.toggle('klasa');
logo.classList.contains('klasa');
*/
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // dobijanje koordinata pozicije section1
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // koordinate pozicije button u odnosu na granice ekrana

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // koordinate trenutne pozicije skrolovanja

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // dimenzije viewport-a

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // skakanje na section1

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

/*
// DODAVANJE EVENT LISTENER-A
//dodavanje eventlistener-a elementu
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 8000);

//drugi (stariji) nacin dodavanja eventListener-a elementu
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
*/

// EVENT PROPAGATION BUBBLLING AND CAPTURING
// BUBBLLING
// rgb(255, 255, 255)
const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min); // formula za dobijanje random broja
const randomColor = () =>
  `rgb(${randomInteger(0, 255)}, ${randomInteger(0, 255)}, ${randomInteger(
    0,
    255
  )})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); //e.target je onaj gde se klik desio, e.currentTarget je na sta se klik odnosi
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});
