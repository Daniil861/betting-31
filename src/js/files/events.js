import { deleteMoney, checkRemoveAddClass, noMoney, addMoney } from './functions.js';
import { initStartData, checkBoughtSubjects, writeSelected, prices, startSelectStrong, config_game, shootBall, drawCurrentBall } from './script.js';

const preloader = document.querySelector('.preloader');

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {

	let targetElement = e.target;
	let bank = +sessionStorage.getItem('money');
	let current_bet = +sessionStorage.getItem('current-bet');

	if (targetElement.closest('[data-button="privacy"]') && preloader.classList.contains('_hide')) {
		preloader.classList.remove('_hide');
	}

	if (targetElement.closest('.preloader__button')) {
		preloader.classList.add('_hide');
		sessionStorage.setItem('privacy', true);
	}

	if (targetElement.closest('[data-button="shop"]')) {
		writeSelected();
		document.querySelector('.main__body').classList.add('_shop');
	}
	if (targetElement.closest('.header-shop__button-back') && document.querySelector('.main')) {
		document.querySelector('.main__body').classList.remove('_shop');
	}

	if (targetElement.closest('[data-button="game"]')) {
		location.href = 'game.html';
	}

	if (targetElement.closest('[data-shop-button="1"]') && !targetElement.closest('[data-subject="1"]').classList.contains('_bought')) {
		console.log('1 - not bought');
		if (bank >= prices.price_1) {
			deleteMoney(prices.price_1, '.check');
			sessionStorage.setItem('subject-1', true);
			checkBoughtSubjects();
		} else noMoney('.check');
	} else if (targetElement.closest('[data-shop-button="1"]') && targetElement.closest('[data-subject="1"]').classList.contains('_bought')) {
		console.log('[data-shop-button="1"]');
		checkRemoveAddClass('.shop__item', '_selected', targetElement.closest('[data-subject="1"]'));
		sessionStorage.setItem('current-subject', 1);
		writeSelected();
		drawCurrentBall();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !targetElement.closest('[data-subject]').classList.contains('_bought')) {
		console.log('2 - not bought');
		if (bank >= prices.price_2) {
			deleteMoney(prices.price_2, '.check');
			sessionStorage.setItem('subject-2', true);
			checkBoughtSubjects();
		} else noMoney('.check');
	} else if (targetElement.closest('[data-shop-button="2"]') && targetElement.closest('[data-subject]').classList.contains('_bought')) {
		console.log('[data-shop-button="2"]');
		checkRemoveAddClass('.shop__item', '_selected', targetElement.closest('[data-subject="2"]'));
		sessionStorage.setItem('current-subject', 2);
		writeSelected();
		drawCurrentBall();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !targetElement.closest('[data-subject]').classList.contains('_bought')) {
		console.log('3 - not bought');
		if (bank >= prices.price_3) {
			deleteMoney(prices.price_3, '.check');
			sessionStorage.setItem('subject-3', true);
			checkBoughtSubjects();
		} else noMoney('.check');
	} else if (targetElement.closest('[data-shop-button="3"]') && targetElement.closest('[data-subject]').classList.contains('_bought')) {
		console.log('[data-shop-button="3"]');
		checkRemoveAddClass('.shop__item', '_selected', targetElement.closest('[data-subject="3"]'));
		sessionStorage.setItem('current-subject', 3);
		writeSelected();
		drawCurrentBall();
	}

	initStartData();

	//game

	if (targetElement.closest('.bet-box__minus')) {
		if (current_bet > 50) {
			sessionStorage.setItem('current-bet', current_bet - 50);
			document.querySelector('.score-bet').textContent = sessionStorage.getItem('current-bet');
		}
	}

	if (targetElement.closest('.bet-box__plus')) {
		if (bank - 49 > current_bet) {
			sessionStorage.setItem('current-bet', current_bet + 50);
			document.querySelector('.score-bet').textContent = sessionStorage.getItem('current-bet');
		} else {
			noMoney('.check');
		}
	}

	// Останавливаем движение стрелки и запускаем мяч
	if (targetElement.closest('.game') && config_game.state === 2) {
		config_game.isMoveArrow = false;
		config_game.state = 3;
		setTimeout(() => {
			shootBall();
		}, 500);
	}

	// Выбор силы удара
	if (targetElement.closest('.footer-field__button')) {
		startSelectStrong();
	}


})