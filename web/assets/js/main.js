function test() {
	return;
}

const setPageTop = (headerID, pageID = "") => {
		
	let element = document.querySelector('#'+headerID);
	let elementHeight = 0;

	elementHeight = 1;
	if (element) {
		elementHeight = element.offsetHeight;
		element = document.querySelector('body');
		if (element) {
			element.style.marginTop = elementHeight + 'px';
		}
	}
	return(elementHeight);
}

const URL_add_parameter = (base, url, param, value) => {
    var hash       = {};
    var parser     = document.createElement('a');

    parser.href    = base ? base : url;
    var parameters = parser.search.split(/\?|&/);

    for(var i=0; i < parameters.length; i++) {
        if(!parameters[i])
            continue;

        var ary      = parameters[i].split('=');
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    var list = [];  
    Object.keys(hash).forEach(function (key) {
        list.push(key + '=' + hash[key]);
    });

    parser.search = '?' + list.join('&');
    return parser.href;
}

const initWineCats = () => {
	$(".jsSetWineCat").on("click", function () {
		let catID = $(this).data('cat');
		let base = $(this).data('base');
		
		location.href = (URL_add_parameter(base, location.href, 'cat', catID));
	});
}


// @ts-ignore
$(document).ready(function () {

	/*
	 * detect hover enabled devices
	 */
	var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
	if (touchsupport){ // browser doesn't support touch
		$("body").addClass("has-touch");
		$(".MenuChoices .MenuChoices-overlay").css("display","block");
	}	
	else {
	}

	/*
	 * initialize lazyloading
	 */
	var lazyLoad = new LazyLoad({
		elements_selector: ".lazy",
		cancel_on_exit: true
	});

	/*
	 * add mobile menu management
	var gNavMenu = '#global-nav-menu';
	$('#global-nav-slick').slicknav({
		label: '',
		prependTo: gNavMenu,
		closeOnClick: true,
		showChildren: true
	});
	 */

	/*
	 * toggle availability off drop-down when in mobile menu mode
	 */
	var appMenuMode = "desktop";
	$(window).resize(function () {
		var width = $(window).width();
		if ((width <= 750) && (appMenuMode === 'desktop')) {
			appMenuMode = "mobile";
			$('.nav__parent').removeClass('sub-menu-parent');
			$('.nav__childmenu').removeClass('sub-menu');
			$('.slicknav_nav .nav__link').removeClass('btn btn--buy btn--small');
		}
		else if ((width > 750) && (appMenuMode === 'mobile')) {
			appMenuMode = "desktop";
			$('.nav__parent').addClass('sub-menu-parent');
			$('.nav__childmenu').addClass('sub-menu');
		}
	});
	$(window).trigger("resize");

	/*
	 * add/remove local nav on scroll
	 */
	var win = $(window);

	/* before changes 
	win.scroll(function (event) {
		if (win.scrollTop() > 130) {
			$(".MainHdr").removeClass("nav--goin-out");
			$(".MainHdr").addClass("MainHdr--down");
			$(".HdrNavRow-Container").addClass("HdrNavRow-Container--down");
			$(".MainHdr").addClass("nav--comin-in");
		}
		else {
			$(".MainHdr").removeClass("nav--comin-in");
			$(".MainHdr").removeClass("MainHdr--down");
			$(".HdrNavRow-Container").removeClass("HdrNavRow-Container--down");
			$(".MainHdr").addClass("nav--goin-out");
		}
	});
	*/

	win.scroll(function (event) {
		if (win.scrollTop() < 100) {
			$(".MainHdr").removeClass("nav--goin-out");
			$(".MainHdr").removeClass("MainHdr--down");
			$(".HdrNavRow").removeClass("HdrNavRow--down");
			$(".MainHdr").addClass("nav--comin-in");
		}
		else {
			$(".MainHdr").removeClass("nav--comin-in");
			$(".MainHdr").addClass("MainHdr--down");
			$(".HdrNavRow").addClass("HdrNavRow--down");
			$(".MainHdr").addClass("nav--goin-out");
		}
	});
	
	$(".MenuChoices-item").hover(
		function () {
			$(this).children(":first").fadeIn(500);
		}, function () {
			$(this).children(":first").fadeOut(100);
		}
	);

	$("#jsMobileClose").click(function() {
		$(".MobileMenu").css("display","none");
	});

	$("#jsMobileShow").click(function() {
		$(".MobileMenu").css("display","block");
	});

	$(".HdrNavRow .nav-menu li a").click(function() {
		//$(".HdrNavRow .nav-menu li a").removeClass("active");
		//$(this).addClass("active");
		//alert($(this).text());
	});

	$('#gotoNewAccount, #gotoGuestCheckout').click(function() {
		var newTitle = $(this).data('newtitle');
		event.preventDefault();
		$('.jsLoginMember').css('display', "none");
		$('.jsLoginGuest').fadeIn(2000);
		$('.jsLoginTitle').text(newTitle ? newTitle : 'New Member');
	});

	$('#gotoLogin, #gotoMemberCheckout').click(function() {
		var newTitle = $(this).data('newtitle');
		event.preventDefault();
		$('.jsLoginGuest').css('display', "none");
		$('.jsLoginMember').fadeIn(2000);
		$('.jsLoginTitle').text(newTitle ? newTitle : 'Member Login');
	});

	$('#eventOven').click( function() {
		var checked = ($(this).prop("checked") == true);
		
		$(this).val( checked ? 0 : 1 );
	});

	var sInitialClick = true;
	$('.jsShowUserMenu').click(function() {
		var showIt = ($('#userMenu').css('display') == "none");

		if ( showIt ) {
			event.preventDefault();
			$('#userMenu').css('display', "block");
			sInitialClick = true;

			$(document).on("click", function(e) {
				var target = $( e.target );

				if ( 	target.is( "div#userMenu" ) ||
						target.is( "div#userMenu ul li" ) || 
						target.is( "div#userMenu ul li a" ) || 
						target.is( "div#userMenu ul" ) ) {
					// e.type is the type of event
					// e.target is the element the event originally occured in
					// do nothing alert(e.target);
				}
				else {
					if ( !sInitialClick ){
						event.preventDefault();
						$('#userMenu').css('display', "none");
						$(document).off("click");						
					}
					sInitialClick = false;
				}
			});
		}
		else {
			event.preventDefault();
			$(document).off("click");
			$('#userMenu').css('display', "none");
		}
	});

	$('.jsRemoveLineItem').click(function() {
		var $this = $(this);
		var id = $(this).data('line-item-id');
		var data = {
			action: 'commerce/cart/update-cart',
			lineItems: {[id]: {'remove': true}}
		};
		$.ajax({
			type: "POST",
			dataType: 'json',
			headers: {
				"X-CSRF-Token" : window.csrfTokenValue,
			},
			url: '/',
			data: data,
			success: function(response){
				location.reload();
				console.log("successfully updated cart", response, data);
			},
			fail :function(response) {
				console.log("error updating cart", response, data);
			}
		});

	});

	$('.jsSetAddressId').change(function() {
		var $this = $(this);
		var val = $this.val();
		var selected = null;
		var href1="https://demaggs.local/checkout/editaddress?addressId=";
		var href2="&redirect=checkout/details";
		var href = "";

		$("#addresses option").each(function() {
			var doForm = $(this).data('doForm');

			if ( $(this).val() == val ) {
				var selected = $(this).data('full-address');

				if ( doForm ){
					$('#shippingAddress-firstName').val(selected.firstName);
					$('#shippingAddress-lastName').val(selected.lastName);
					$('#shippingAddress-address1').val(selected.address1);
					$('#shippingAddress-address2').val(selected.address2);
					$('#shippingAddress-city').val(selected.city);
					$('#shippingAddress-state').val(selected.state);
					$('#shippingAddress-zipCode').val(selected.zipCode);
					$('#shippingAddress-phone').val(selected.phone);
					$('#setAddressId').val(selected.id);
				}
				else {
					href = href1 + selected.id + href2;
					$('#aLink').attr('href', href);
	
					$('#aName').text(selected.firstName + ' ' + selected.lastName);
					$('#aAddr1').text(selected.address1);
					if ( selected.address2 ) {
						$('#aAddr2').text(selected.address2);
					}
					$('#aCSZ').text(selected.city + ', ' +selected.state.name + ' ' + selected.zipCode);
					$('#aPhone').text(selected.phone);
									
					href = href1 + selected.id + href2;
					$('#aLink').attr('href', href);	
				}
							
				return(false);
			}
			
		});
	});

	$('#eventOvenCB').change( function(){
		var checked = ($(this).prop("checked") == true);
		$("#jsHiddenOven").val( checked ? 'true' : 'false' );
	});
	
	$('#sameas').change( function(){
		var checked = ($(this).prop("checked") == true);
		var gotoBilling = $(this).data('billing');
		var gotoPayment = $(this).data('payment');
		
		$("#jsSameAsShipping").val( checked ? '1' : '0' );
		$("#jsNextRedirect").val( checked ? gotoPayment : gotoBilling );
	});

	$('#jsDetails').click( function(){
		//$('#jsDetails').hide;
		//$('#jsDetails')[0].submit();
		event.preventDefault;
	});

	$('.jsSetSameAs').change(function() {
		var $this = $(this);
		var val = $this.val();
		var id = $this.data('shippingid');

		val = (val >= 0) ? 1 : 0;
		$this.val(val);

		var data = {
			'action': 'commerce/cart/update-cart',
			'shippingAddressId': id,
			'billingAddressId': id,
		}
		
		$.ajax({
			type: "POST",
			dataType: 'json',
			headers: {
				"X-CSRF-Token" : window.csrfTokenValue,
			},
			url: '/',
			data: data,
			success: function(response){
				location.reload();
				console.log("successfully updated cart", response, data);
			},
			fail :function(response) {
				console.log("error updating cart", response, data);
			}
		});

	});

	$('.jsSaveAddress').click(function() {
		var $this = $(this);
		var flds = $this.data('required');

		if ( !checkRequiredFlds(flds) ) {
			event.preventDefault();
			return;
		}
		else {
			var shippingId = $("input[name='shippingAddress[id]']").val();
			var fName = $("input[name='shippingAddress[firstName]']").val();
			var lName = $("input[name='shippingAddress[lastName]']").val();

			var data = {
				'action': 'commerce/cart/update-cart',
				'shippingAddressId': shippingId,
				'shippingAddress[fullName]': (fName + ' ' + lName),
			}

			$.ajax({
				type: "POST",
				dataType: 'json',
				headers: {
					"X-CSRF-Token" : window.csrfTokenValue,
				},
				url: '/',
				data: data,
				success: function(response){
					location.reload();
					console.log("successfully updated cart", response, data);
				},
				fail :function(response) {
					console.log("error updating cart", response, data);
				}
			});
		}			

	});


	/*
	 * toggle password visibilty
	 */

	$('.jsShowPW').click(function() {

		if ( $('.jsPWField').attr('type') == 'password' ){
			$('.jsPWField').attr('type', 'text');
			$('.jsShowPW').attr('style', 'background-image: url("/assets/img/icons/icon-eye-off.svg")');
		}
		else {
			$('.jsPWField').attr('type', 'password');
			$('.jsShowPW').attr('style', 'background-image: url("/assets/img/icons/icon-eye-on.svg")');
		}
		$(this).show();
		event.preventDefault();
	});

	$('.jsPWField').keyup( function() {
		val = $(this).val();
		if ( val.length > 0 ) {
			$('.jsShowPW').show();			
		}
		else {
			$('.jsShowPW').hide();			
		}
	});
	
	$('#custom-eDate').change( function() {
		var val = $(this).val().split("-");
		var date = new Date(val[0], val[1] - 1, val[2]);
		var day = date.getDay();
		var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var weekday = weekdays[day];
		$('#eventDayOfWeek').val(weekday);
	});

	$('#xxxx').click( function() {
		alert($('#eventDayOfWeek').val());
	});

	function checkRequiredFlds( flds ) {
		var errorId = flds['errorId'];
		var errorMsg = "";
		var fldVal = "";
		var fldMsg = "";
		var retVal = true;

		$(errorId).html("");
		$.each( flds, function( key, value ) {
			fldVal = $(key).val();
			fldMsg = value;

			if ( key != "errorId" ) {
				if ( (fldVal == null) || (fldVal == '') ) {
					// alert('setting '+errorId+' to '+value);
					errorMsg = (errorMsg == '') ? fldMsg : (errorMsg + '<br>' + fldMsg);
					$(errorId).html(errorMsg);
					retVal = false;
				}
			}
		});

		return(retVal);
	}

	$('.jsCheckRequired').click( function() {
		var $this = $(this);
		var flds = $this.data('required');

		if ( !checkRequiredFlds(flds) ) {
			event.preventDefault();
		}
	});

});			// end of doc(ready)
