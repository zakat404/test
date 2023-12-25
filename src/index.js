import $ from 'jquery';

import './styles/main.scss';

const body = $('body');
const modalEl = $('#modal');
const preloader = $('.preloader');
const menuBtn = $('#menuBtn');
const tabBtn = $('.tabsBtn');
const tabContentEls = $('.tabContent');
const modalBtnEls = $('[data-modal]');
const menuMobile = $('#menuMobile');
const menuMobileClose = $('#menuMobile .close');
const header = $('#header');
const main = $('#main');

modalBtnEls.on('click', (e) => {
  e.preventDefault();
  const modalType = e.target.dataset.modal;
  makeVisible(modalType);
  modalEl.css('display', 'flex');
  $(`[data-tab=${modalType}]`).addClass('active');
  body.css('overflow', 'hidden');
  closeNav();
});

$(window).on('load resize', () => {
  preloader.fadeOut();
  if ($(window).width() <= 1100) {
    header.addClass('fixed');
    main.addClass('fixed');
  } else {
    header.removeClass('fixed');
    main.removeClass('fixed');
  }
});

const makeVisible = (type) => {
  const tabContent = $(`#${type}`);
  tabContent.css('display', 'block');
};

tabBtn.on('click', (e) => {
  const tabTarget = e.target.dataset.tab;
  tabContentEls.css('display', 'none');
  makeVisible(tabTarget);
  tabBtn.removeClass('active');
  e.target.classList.add('active');
});

const closeModal = () => {
  modalEl.css('display', 'none');
  tabContentEls.css('display', 'none');
  tabBtn.removeClass('active');
  body.css('overflow', 'visible');
}

modalEl.on('click', (e) => {
  if (e.target == modalEl[0]) {
    closeModal();
  }
});

menuMobileClose.on('click', () => {
  closeNav();
  body.css('overflow', 'visible');
});

const openNav = () => {
  menuMobile.css({ width: '100%', opacity: '1' });
};

const closeNav = () => {
  menuMobile.css({ width: '0', opacity: '0' });
};

menuBtn.on('click', () => {
  openNav();
  closeModal();
  body.css('overflow', 'hidden');
});

