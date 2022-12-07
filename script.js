'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

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

// Button scrolling
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

//////////////////////////////////////////////

//Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// Event delegation (bolji nacin za scrolling u ovom slucaju zato sto smo event handler povezali sa parent elementom elemenata kod kojih ce se pokrenuti reakcija)
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  console.log(
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  );

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  // selektovanje elemenata
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // fade efekat
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // this se odnosi na vrednost opacity-a u ovom slucaju
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5)); // bind se odnosi na this // this je jednak current.target-u

nav.addEventListener('mouseout', handleHover.bind(1));

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
/*
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
*/
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
/*
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};
*/
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
/*
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
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  //true // da bismo pokrenuli capturing, eventListener-u dodajemo treci parametar (true). onda se prikazuje prvo NAV (posto je odatle krenuo event)
  // a onda zatim krece bubblling sa svojim event-ovima
);
*/
/*
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // selektuje najblizi parent header element

h1.closest('h1').style.background = 'var(--gradient-primary)'; // selektuje sam sebe

console.log(h1.previousElementSibling); // izbor prethodnog sibling elementa
console.log(h1.nextElementSibling); // izbor narednog sibling elementa

console.log(h1.previousSibling); // izbor prethodnog node-a
console.log(h1.nextSibling); // izbor narednog node-a

console.log(h1.parentElement.children); // izbor svih sibling-a

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
