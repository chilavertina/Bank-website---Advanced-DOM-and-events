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
