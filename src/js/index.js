import $ from 'jquery';
import "bootstrap-slider";
import "jquery-validation";
import "juxtaposejs/build/js/juxtapose.min.js";
import "instafeed.js"

import '../scss/style.scss';

const Instafeed = require("instafeed.js");

let video = $('.section-video__video').get(0);

if (video !== undefined) {
    video.addEventListener('ended', function () {
        $(this).hide();
        $('.section-video__poster').show();
    });
}

$(document).ready(function () {
    let links = $('a.header-menu__menu-item, a.header-menu__mob-down-link');

    links.filter(function () {
        if ($(this).get(0).getAttribute('href') === window.location.pathname) {
            if (!$(this).hasClass('header-menu__mob-down-link')) {
                $(this).addClass('header-menu__menu-item--pc-active');
            }
            $(this).addClass('header-menu__menu-item--active');
        } else {
            $(this).removeClass('header-menu__menu-item--pc-active');
            $(this).removeClass('header-menu__menu-item--active');
        }
    });

    $('.header__open-menu').on('click', function () {
        $('.header-menu__mob-down-container').css('display', 'block');
    });

    $('.header-menu__mob-down-close').on('click', function () {
        $('.header-menu__mob-down-container').css('display', 'none');
    });

    if ($('#instafeed').length !== 0) {
        let feed = new Instafeed({
            get: 'user',
            userId: '2292528223',
            accessToken: '2292528223.84fee6a.accf5169573d45768bf6ce6640e0fe35',
            limit: 4,
            template: '<a class="section-instagram__post" href="{{link}}" target="_blank"><img class="section-instagram__img" src="{{image}}"/></a>',
            resolution: 'standard_resolution'
        });

        feed.run();
    }
});
$(document).ready(function () {
    let employer = $(".employer");
    let deviceW = $(window).width();
    let lastEmployer = Math.ceil(deviceW / employer.outerWidth(true) - 1);

    if((deviceW < 993)){
        employer.eq(lastEmployer).css('opacity',0.5);
    }
    $('.slider-arrow-btn').click(function () {
        let row = $(".employer-list");
        let btnR = $(".slider-arrow-right");
        let btnL = $(".slider-arrow-left");
        let left = parseFloat(row.get(0).getAttribute('data-left'));
        let employerW = employer.outerWidth(true);

        let countEmployer = (deviceW < 993) ? Math.floor(deviceW / employerW) : 4;
        let end = (employer.length - countEmployer) * employerW;
        let currentDirection = $(this).hasClass('slider-arrow-right__btn') ? 'right' : 'left';

        if (currentDirection === 'left') {
            btnR.show();
            left += employerW;
            if (left >= 0) {
                btnL.hide();
                left = 0;
            }
            if((deviceW < 993)){
                employer.eq(lastEmployer).css('opacity',1);
                lastEmployer --;
                employer.eq(lastEmployer).css('opacity',0.5);
            }
        } else if (currentDirection === 'right') {
            btnL.show();
            left -= employerW;
            if (left <= -end) {
                btnR.hide();
            }
            if((deviceW < 993)){
                employer.eq(lastEmployer).css('opacity',1);
                lastEmployer ++;
                employer.eq(lastEmployer).css('opacity',0.5);
            }
        }

        row.css('left', left);
        row.get(0).setAttribute('data-left',left);
    });
});
$(document).ready(function () {
    let slideIndex = [1,1,1];
    let slider = [".slider-slide", ".slider-slide_2",".slider-slide_3"];

    if($(slider[0]).length  !== 0){
        showSlides(slideIndex , 0);
        showSlides(slideIndex , 1);
        showSlides(slideIndex , 2);
        $('.slider-left').css('display','none');
    }

    $('.slider_btn').click(function () {
        let currentDirection = $(this).hasClass('slider-right') ? 'right' : 'left';
        let superClass = $(this).parent().attr('class').split(" ");
        let currentClassId;

        if(superClass[0] === 'section-slider') {
            currentClassId = 0;
        }
        if(superClass[0] === 'section-slider_2') {
            currentClassId = 1;
        }
        if(superClass[0] === 'section-slider_3') {
            currentClassId = 2;
        }

        if (currentDirection === 'left') {
            $(this).next().css('display','flex');
            showSlides(slideIndex[currentClassId] -= 1 , currentClassId);
            if(slideIndex[currentClassId] === 1)
                $(this).css('display','none');
        } else if (currentDirection === 'right') {
            $(this).prev().css('display','flex');
            showSlides(slideIndex[currentClassId] += 1 , currentClassId);
            if(slideIndex[currentClassId] === $(slider[currentClassId]).length)
                $(this).css('display','none');
        }
    });
    function showSlides(n , id) {
        let i;
        let slides = $(slider[id]);
        if (n > slides.length) {
            slideIndex[id] = 1;
        }
        if (n < 1) {
            slideIndex[id] = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex[id]-1].style.display = "block";
    }
});
$(document).ready(function (){
    $('.minimized').click(function() {
        let i_path;
        if($(this).hasClass('about_us_gallery-main--work')){
            i_path = $('.about_us_gallery-main--work').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
        } else if($(this).hasClass('about_us_gallery-main--client')){
            i_path = $('.about_us_gallery-main--client').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
        }else {
            i_path = $(this).attr('src');
        }
        $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
        let magnify = $('#magnify');
        magnify.css({
            left: ($(document).width() - magnify.width())/2,
            top: ($(window).height() - magnify.height())/2
        });
        $('#overlay, #magnify').fadeIn('fast');
    });

    $('body').on('click', '#close-popup, #overlay', function(event) {
        event.preventDefault();

        $('#overlay, #magnify').fadeOut('fast', function() {
            $('#close-popup, #magnify, #overlay').remove();
        });
    });
});
$(document).ready(function (){
   $('.gallery__menu-item').click(function(){
       if(!$(this).hasClass('gallery__menu-item--active')){
           let category = $(this).get(0).getAttribute('data-type');
           let active = $(".gallery__menu-item[data-active='1']");
           let divider = $(".gallery__menu-devider-item[data-type='"+category+"']");
           let prevDivider = $(".gallery__menu-devider-item[data-active='1']");

           active.removeClass('gallery__menu-item--active');
           active.get(0).setAttribute('data-active', 0);
           $(this).get(0).setAttribute('data-active',1);
           $(this).addClass('gallery__menu-item--active');
           divider.addClass('gallery__menu-devider-item--active');
           divider.get(0).setAttribute('data-active',1);
           prevDivider.removeClass('gallery__menu-devider-item--active');
           prevDivider.get(0).setAttribute('data-active', 0);

           if($(window).width() < 993){
               let containerMobile = $(".gallery-container__mobile-items[data-type='"+category+"']");
               let prevContainerMobile = $(".gallery-container__mobile-items[data-active='1']");
               containerMobile.addClass('gallery-container__mobile-items--active');
               containerMobile.get(0).setAttribute('data-active',1);
               prevContainerMobile.removeClass('gallery-container__mobile-items--active');
               prevContainerMobile.get(0).setAttribute('data-active', 0);
           } else {
               let container = $(".gallery-container[data-type='"+category+"']");
               let prevContainer = $(".gallery-container[data-active='1']");
               container.addClass('gallery-container--active');
               container.get(0).setAttribute('data-active',1);
               prevContainer.removeClass('gallery-container--active');
               prevContainer.get(0).setAttribute('data-active', 0);
           }
       }
   });
});
