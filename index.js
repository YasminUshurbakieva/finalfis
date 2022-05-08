window.addEventListener('DOMContentLoaded', changeHide)

function changeHide () {
    let seeShow = document.getElementById('seeshow')
    let seeTxt = document.getElementById('seetxt')

    seeShow.addEventListener('click', (e) => {
        e.preventDefault()

        seeTxt.style.display = 'block'
    })
}

AOS.init({
  duration: 1000,
  once: true,
})

jQuery(document).ready(function($){
  'use strict';

  // Scrollax
  $.Scrollax();
  var templateUXAnimsition = function() {
    $(".animsition").animsition();
  };
  templateUXAnimsition();
  
  var templateUXSmoothScoll = function() {
    // Smooth scroll
    var $root = $('html, body');
    $('a.js-smoothscroll[href^="#"]').click(function () {
      $root.animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);

      return false;
    });
  };
  templateUXSmoothScoll();

  var templateUXCarousel = function() {
    $('.wide-slider').owlCarousel({
      loop:true,
      autoplay: false,
      margin:0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav:true,
      autoplayHoverPause: false,
      items: 1,
      autoheight: true,
      navText : ["<span class='ion-android-arrow-dropleft'></span>","<span class='ion-android-arrow-dropright'></span>"],
      responsive:{
        0:{
          items:1,
          nav:true
        },
        600:{
          items:1,
          nav:true
        },
        1000:{
          items:1,
          nav:true
        }
      }
    });

    $('.wide-slider-testimonial').owlCarousel({
      loop:true,
      autoplay: true,
      margin:0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      autoheight: true,
      navText : ["<span class='ion-android-arrow-dropleft'></span>","<span class='ion-android-arrow-dropright'></span>"],
      responsive:{
        0:{
          items:1,
          nav:false
        },
        600:{
          items:1,
          nav:false
        },
        1000:{
          items:1,
          nav:false
        }
      }
    });
  };
  templateUXCarousel();

  var templateUXHamburgerTrigger = function() {
    $('.templateux-toggle-menu').on('click', function(e){
      var $this = $(this);
      if ( $('body').hasClass('menu-open') ) {
        $this.removeClass('is-active');
        
          $('.templateux-menu .templateux-menu-inner > ul > li').each(function() {
            $(this).removeClass('is-show');
          });
        
        setTimeout(function() {
          $('.templateux-menu').fadeOut(400);
        }, 500);

        $('body').removeClass('menu-open');
      } else {
        $('.templateux-menu').fadeIn(400);
        $this.addClass('is-active');
        $('body').addClass('menu-open');

        setTimeout(function() {
          $('.templateux-menu .templateux-menu-inner > ul > li').each(function() {
            $(this).addClass('is-show');
          });
        }, 500);
        
      }
      e.preventDefault();
    })
  };
  templateUXHamburgerTrigger();


  var templateUXCounter = function() {
    
    $('#templateux-counter-section').waypoint( function( direction ) {

      if( direction === 'down' && !$(this.element).hasClass('templateux-animated') ) {

        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
        $('.templateux-number').each(function(){
          var $this = $(this),
            num = $this.data('number');
            console.log(num);
          $this.animateNumber(
            {
              number: num,
              numberStep: comma_separator_number_step
            }, 7000
          );
        });
        
      }

    } , { offset: '95%' } );

  };
  templateUXCounter();

  var templateUXIsotope = function() {
    var $container = $('#gallery-content-center');
    $container.isotope({itemSelector : '.grid-item'});
  };
  templateUXIsotope();


  var DateAndTimepicker = function() {
    $('.js-timepicker').timepicker();
    $('.js-datepicker').datepicker();
  };
  DateAndTimepicker();


  var templateUXScroll = function() {
    $(window).scroll(function(){
      var $w = $(this),
          st = $w.scrollTop(),
          navbar = $('.templateux-header'),
          sd = $('.js-scroll-wrap');

      if (st > 150) {
        if ( !navbar.hasClass('scrolled') ) {
          navbar.addClass('scrolled');  
        }
      } 
      if (st < 150) {
        if ( navbar.hasClass('scrolled') ) {
          navbar.removeClass('scrolled sleep');
        }
      } 
      if ( st > 350 ) {
        if ( !navbar.hasClass('awake') ) {
          navbar.addClass('awake'); 
        }
      }
      if ( st < 350 ) {
        if ( navbar.hasClass('awake') ) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
      }
    });
  };

  templateUXScroll();

  
});

var db = Array();
$(document).ready(function () {
	db = JSON.parse(localStorage.getItem('db')); //load from local Storage
	if (db == null) {
		db = Array();
	}
	console.log(db);
});

function register() {
	let username = $("input[name='usernameReg']").val();
	for (var i = 0; i < db.length; i++) {
		if (db[i]['username'] == username) {
			alert("User already exists!");
			return;
		}
	}

	if(!validateUsername(username)){
		alert("Invalid username!");
		return;
	}

	let pass = $("input[name='passReg']").val();
	let repass = $("input[name='repassReg']").val();

	if (validatePass(pass)) {
		if (pass != repass) {
			alert("Passwords does not match!");
		}
		else {
			addUser(username, pass);
		}
	}
	location.reload();
}

function addUser(user,pass) {
	let userStruct = {
		username: user,
		password: pass,
		activated: false
	}	
	let i = db.length;
	db[i] = userStruct;
	localStorage.setItem('db',JSON.stringify(db));//save to Local Storage
}

function validateUsername(username){
	let arr = username.split('@');
	if (arr.length != 2) {
		return false;
	} 
	arr = arr[1].split('.');
	if (arr.length != 2) {
		return false;
	} 
	return true;
}

function validatePass(pass) {
	let digit = false;
	let lower = false;
	let upper = false;
	let sym = false;
	let length = pass.length;
	if (length < 8) {
		alert("Length of password must be at least or more than 8!");
		return false;
	}
	for (var i = 0; i < length; i++) {
		if (isDigid(pass[i])) {
			digit = true;
		}
		if (isLower(pass[i])) {
			lower = true;
		}
		if (isUpper(pass[i])) {
			upper = true;
		}
		if (isSymbol(pass[i])) {
			sym = true;
		}
	}
	if (!digit || !lower || !upper || !sym) {
		alert("Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter and 1 special symbol!")
		return false;
	}
	return true;
}

function isDigid(d) {
	let digits = "1234567890";
	for (var i = 0; i < digits.length; i++) {
		if(digits[i] == d)return true; 
	}
	return false;
}

function isLower(d) {
	let alphabet = "qwertyuiopasdfghjklzxcvbnm"; 
	for (var i = 0; i < alphabet.length; i++) {
		if(alphabet[i] == d)return true; 
	}
	return false;
}

function isUpper(d) {
	let alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM"; 
	for (var i = 0; i < alphabet.length; i++) {
		if(alphabet[i] == d)return true; 
	}
	return false;
}

function isSymbol(d) {
	let symbols = "`~!@#$%^&*()_+=-<>?/*-.,";
	for (var i = 0; i < symbols.length; i++) {
		if(symbols[i] == d)return true; 
	}
	return false;
}

function login() {
	let username = $("input[name='usernameLog']").val();
	let pass = $("input[name='passLog']").val();

	if (username == 'admin' && pass == 'admin') {
		console.log("admin");
		window.location.href = 'main/valid.html';
		return false;
	}
	for (var i = 0; i < db.length; i++) {
		if (db[i]['username'] == username) {
			if (db[i]['password'] == pass) {
				if (db[i]['activated'] == false) {
					alert("Administrator must activate your account");
					return;
				}
				localStorage.setItem('currentSession', username);
				$(location).attr('href','main/login.html');
			}
			else{
				alert("Incorrect Password!");
			}	
			return;
		}		
	}	
	alert("User does not exist!");
}

function logout() {
	localStorage.removeItem('currentSession');
}

function toggleActivation(username) {
	for (var i = 0; i < db.length; i++) {
		if (username == db[i]['username']) {
			db[i]['activated'] = !db[i]['activated'];
			localStorage.setItem('db',JSON.stringify(db));//save to Local Storage
			return;
		}
	}
}

function deleteUser(username) {
	for (var i = 0; i < db.length; i++) {
		if (username == db[i]['username']) {
			db = db.filter(function(value, index, arr){ 
                return value['username'] != username;
            });
			localStorage.setItem('db',JSON.stringify(db));//save to Local Storage
			return;
		}
	}
}

$(document).ready(function () {
	for (var i = 0; i < db.length; i++) {
		let usr = db[i]['username'];
		let activated = db[i]['activated'];
		let status = '';
		if (activated == true) {
			status = 'Available';
		}
		else status = 'Blocked';
		$(".iksweb").children("tbody").append('<tr><td>' + usr + '</td><td><button class="submit" name="del" email="' + usr + '">Delete</button><td><button name="toggle" class="submit"email="' + usr +'">Block/Unblock</button></td><td>' + status + '</td></tr>');
		$("button[name='del']").on('click', function () {
			deleteUser($(this).attr('email'));
			location.reload();
		});
		$("button[name='toggle']").on('click', function () {
			toggleActivation($(this).attr('email'));
			location.reload();
		});
	}
});

$(document).ready(function () {
	if (localStorage.getItem('currentSession') != null) {
		$("a[name='togglelogin']").html('Выйти');
		$("a[name='togglelogin']").css('float','right');

		$('a[name="account"]').html(localStorage.getItem('currentSession'));
		$('a[name="account"]').css('float','right');
		$("a[name='togglelogin']").on('click', function () {
			logout();
			location.href = '../index.html';
		});
	}
	
});
function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}