/*CUSTOM SELECT*/
let select = function () {
    let selectHeader = document.querySelectorAll('.select-custom__header');
    let selectItem = document.querySelectorAll('.select-custom__item');

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle);
    })

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose);
    })

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select-custom'),
            currentText = select.querySelector('.select-custom__current');
        currentText.innerText = text;
        select.classList.remove('is-active');
    }
};

select();

/*SLIDER SWIPER*/
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        type: "fraction"
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        1800: {
            slidesPerView: 3,
        }
    }
});

/*SHOW AND CLOSE MOBILE MENU*/
function menuMobile() {
    let selectMenu = document.querySelector('.menu-burger');
    selectMenu.addEventListener('click', showMenu);

    function showMenu() {
        let chooseMenu = document.querySelector('.mobile');
        chooseMenu.classList.add('show-menu', 'mobile-fixed');
    }

    let exitMenu = document.querySelector('.exit');
    exitMenu.addEventListener('click', closeMenu);

    function closeMenu() {
        let hideMenu = document.querySelector('.mobile');
        hideMenu.classList.remove('show-menu', 'mobile-fixed');
    }

}

menuMobile();

/*CHANGE ATTRIBUTE IN MOBILE*/
let screenWidth = document.body.clientWidth;
let elAttr = document.querySelector('.form__input');

if (screenWidth < 768) {
    elAttr.setAttribute('placeholder', 'Enter your email');
} else if (screenWidth >= 768) {
    elAttr.setAttribute('placeholder', 'Topic');
} else  {
    console.log('error');
}