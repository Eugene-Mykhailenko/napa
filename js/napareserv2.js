jQuery.noConflict();
var from;
var date;
var hour;
var minute;
var ampm;
var to;
var seePriceCheck = 0;
var time = 0;
var referance=0;
var isAirport = 0;
var PricePlus = 0;
var priceOptions;
var carSeat = false;
var gateMeet = false;
var thisTime = 0;
window.addEvent('domready', function() {
	var autocomplete = new google.maps.places.Autocomplete(jQuery("#from_adress")[0], {});
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		var place = autocomplete.getPlace();
		referance = place.reference;
	});
	new Picker.Date('date', {
		pickerClass: 'datepicker_dashboard',
		format:'%m.%d.%Y',
		'minDate': 'today'
	});
	jQuery('#from_adress').bind("paste", function () {
		return false;
	});
	jQuery('#from_adress').bind("drop", function () {
		return false;
	});
	jQuery('#from_adress').bind("cut", function () {
		return false;
	});
	jQuery('#from_adress').bind("copy", function () {
		return false;
	});
	
	
	
	jQuery('#to').bind("paste", function () {
		return false;
	});
	jQuery('#to').bind("drop", function () {
		return false;
	});
	jQuery('#to').bind("cut", function () {
		return false;
	});
	jQuery('#to').bind("copy", function () {
		return false;
	});
	
	
	$('napa-form').addEvent('submit', function(e){
		//pageTracker._trackPageview('/napa-press-go/');
		from = $('from_adress').get('value');
		date = $('date').get('value');
		hour = $('hour').get('value');
		minute = $('time').get('value');
		ampm = $('ampm').get('value');
		if (from==''){
			$('from_adress').addClass('errorform');
			return false;
		}
		else{
			$('from_adress').removeClass('errorform');
		}
		if (date==''){
			$('date').addClass('errorform');
			return false;
		}
		else{
			$('date').removeClass('errorform');
		}
		var checkToRequest = new Request.JSON({
			url: '/ajax2.php?action=checkfrom&referance='+referance+'&from='+from, 
				onSuccess: function(res){
					priceOptions = res;
					isAirport = res.isairport;
					if (res.getto==1){
						var autocomplete = new google.maps.places.Autocomplete(jQuery("#to")[0], {});
						google.maps.event.addListener(autocomplete, 'place_changed', function() {
							var place = autocomplete.getPlace();
						});
						
						$$('.napa-form-carousel').setStyles({
							'-webkit-transform':'translate(-1200px,0)',
							'-moz-transform':'translate(-1200px,0)',
							'-o-transform':'translate(-1200px,0)',
							'-ms-transform':'translate(-1200px,0)',
							'transform':'translate(-1200px,0)'
						});
						
						
					}
					else{
						$('napa-form-carousele-to').setStyle('display', 'none');
						$$('.napa-form-carousel').setStyle('width', '3650px');
						$$('.napa-form-carousel').setStyles({
							'-webkit-transform':'translate(-1200px,0)',
							'-moz-transform':'translate(-1200px,0)',
							'-o-transform':'translate(-1200px,0)',
							'-ms-transform':'translate(-1200px,0)',
							'transform':'translate(-1200px,0)'
						});
						if (isAirport==0){
							$('flight-num').setStyle('display', 'none');
							$('gatemeetblock').setStyle('display', 'none');
						}
					}
			}
		}).get();	
		return false;		
	}); 
	
	$('napa-form-to').addEvent('submit', function(){
		console.log('start');
		to = $('to').get('value');
        thisTime =$('horsttransfer').get('value'); 
        
		
		if (isAirport==0){
			console.log(isAirport);
			$('flight-num').setStyle('display', 'none');
			$('gatemeetblock').setStyle('display', 'none');
		}
		
        if (thisTime!=0){
			console.log(thisTime);
            $('napa-form-carousele-extras').setStyle('display', 'none');
            $('napa-form-fin').fireEvent('submit');
        }
        else{
            $$('.napa-form-carousel').setStyles({
			'-webkit-transform':'translate(-2400px,0)',
			'-moz-transform':'translate(-2400px,0)',
			'-o-transform':'translate(-2400px,0)',
			'-ms-transform':'translate(-2400px,0)',
			'transform':'translate(-2400px,0)'
		});
        }
		return false;
	});
	
	$('napa-form-fin').addEvent('submit', function(){
		
		//pageTracker._trackPageview('/napa-enter-settings/');
		/*if ($('flight-num').get('value')=='' && isAirport==1){
			$('flight-num').addClass('errorform');
			return false;
		}*/
		PricePlus+=$('noofstops').get('value')*(priceOptions.priceperextrastop).toFloat();
		if ($('gatemeet').get('checked')==true){	
			
			gateMeet = true;
			PricePlus+=(priceOptions.gatemeet).toFloat();
		}
		if ($('carseat').get('checked')==true){	
			carSeat = true;
			PricePlus+=(priceOptions.pricecarseat).toFloat();
		}
		var from_select_request = new Request.JSON({
		url: '/ajax2.php?action=pricecheck&from='+from+'&to='+to+'&hour='+hour+'&minute='+minute+'&ampm='+ampm, 
			onSuccess: function(option){
				
			var carsElementsWrapp = new Element('div',{
				'class':'napa-result-wrapper'
			}).inject($('napa-form-carousele-price'));
			
			var carElement = new Element('div', {
				'class':'napa-result-div'
			}).inject(carsElementsWrapp);
			
			
			
			var napapricesdiv = new Element('div', {'class':'napa-result-item corner', 'id':'napa-hour-price-div'}).inject(carElement);
			
			
			var napaDivResultTitle = new Element('div', {
				'class':'napa-result-title-div top-corner',
				'id':'napa-result-title-div'
			}).inject(napapricesdiv);
			
			var napaDivResultCars = new Element('div',{
				'class':'napa-result-cars-div',
				'id':'napa-result-cars-div'
			}).inject(napapricesdiv);
			
			var napaDivResultRA = new Element('div', {
				'class':'napa-result-ra-div bottom-corner',
				'id':'napa-result-ra-div'
			}).inject(napapricesdiv);
			
			new Element('h1', {
				'html':'Hourly Rates&nbsp;<select id="hourscount" class="corner" style="width:100px; padding:5px 10px;"></select>'
			}).inject(napaDivResultTitle);
			

			
			
			
			var selecthtml = '';
			for(var i=6; i<=24; i++){
				selecthtml+='<option value="'+i+'">'+i+' hrs</option>';
			}
			$('hourscount').set('html', selecthtml);
           
			time = 6;
			PricePlus+=(option.addprice).toFloat();
			for(var i=0; i<option.hourprice.length; i++){
				set_car_icon(option.hourprice[i].car, option.hourprice[i].price, 'napa-result-cars-div', 1, time);
			}
            if (thisTime!=0){
                $('hourscount').set('value', thisTime);
                 changePrice(thisTime);
            }
			else{
                changePrice(6);
                }
			//setRACar('napa-result-ra-div', 'hourly');


			
			if (option.havefix==1){
				carElement.addClass('tworesult');
				
				
				
				
				
				
				
				
				
			var napapricesdiv2 = new Element('div', {'class':'napa-result-item corner', 'id':'napa-fix-price-div'}).inject(carElement);
			
			
			var napaDivResultTitle2 = new Element('div', {
				'class':'napa-result-title-div top-corner',
				'id':'napa-result-title-div-2'
			}).inject(napapricesdiv2);
			
			var napaDivResultCars2 = new Element('div',{
				'class':'napa-result-cars-div',
				'id':'napa-result-cars-div-2'
			}).inject(napapricesdiv2);
			
			var napaDivResultRA2 = new Element('div', {
				'class':'napa-result-ra-div bottom-corner',
				'id':'napa-result-ra-div-2'
			}).inject(napapricesdiv2);
			
			new Element('h1', {
				'html':'One Way Transfer'
			}).inject(napaDivResultTitle2);
		
				
				
				
				for(var i=0; i<option.fixprice.length; i++){
					set_car_icon(option.fixprice[i].car, ((option.fixprice[i].price).toFloat()+(PricePlus).toFloat()), 'napa-result-cars-div-2', 0, 0);
				}
				//setRACar('napa-result-ra-div-2', 'transfers');			
				
			}
			
			
			
			
			
			jQuery('.serviceform').submit(function(event){
			
				//pageTracker._trackPageview('Press RA On MyShofer');
				raStart(jQuery(this));
				return false;
			 });
			$('hourscount').addEvent('change', function(){
				time = this.get('value');
				changePrice(this.get('value'));
			});
			if ($$('.napa-form-carousel').getStyle('width')=='3650px' || thisTime!=0){
				var translate = -2400;
			}
			else{
				var translate = -3600;
			}
			
			
			$$('.napa-form-carousel').setStyles({
				'-webkit-transform':'translate('+translate+'px,0)',
				'-moz-transform':'translate('+translate+'px,0)',
				'-o-transform':'translate('+translate+'px,0)',
				'-ms-transform':'translate('+translate+'px,0)',
				'transform':'translate('+translate+'px,0)'
			});
		}}).get();
		return false;
	});
});
function changePrice(hour){

	$$('#napa-hour-price-div .ajax_card').each(function(el){
		el.getChildren('.card_text_ajax').set('html', '$'+number_format((el.get('rel')*hour+PricePlus), 2, '.', ''));
		el.set('href',  updateURLParameter(el.get('href'), 'price', number_format((el.get('rel')*hour+(PricePlus).toFloat()), 2, '.', '')));
		el.set('href',  updateURLParameter(el.get('href'), 'time', hour));
	});
}
function setRACar(divclass, act){
		var cardRa = new Element('div',{
			'class':'ajax_card ridecard',
			'styles':{
				'clear':'both',
				'margin':'0 auto',
				'color':'#fff',
				'text-align':'center',
				'font-size':'20pt',
				'float':'none',
				'background':'url(/images/ride.png) center center no-repeat',
				
			}
		}).inject($(divclass), 'bottom');
	
		var raForm = new Element('form', {
			'method':'post',
			'class':'serviceform'
		}).inject(cardRa);
		
		var actionInput = new Element('input',{
			'type':'hidden',
			'name':'action',
			'value':'get-first-form'
		}).inject(raForm);
		
		var actionInput2 = new Element('input',{
			'type':'hidden',
			'name':'service',
			'value':'hourlymultiple'
		}).inject(raForm);
		
		var actionInput3 = new Element('input',{
			'type':'hidden',
			'name':'act',
			'value':act//'hourly'
		}).inject(raForm);
		
		var actionInput10 = new Element('input',{
			'type':'hidden',
			'name':'PickUpTimeDate',
			'value':$('date').get('value')
		}).inject(raForm);
		
		var actionInput4 = new Element('input',{
			'type':'hidden',
			'name':'PickUpTimeHour',
			'value':$('hour').get('value')
		}).inject(raForm);
		var actionInput5 = new Element('input',{
			'type':'hidden',
			'name':'PickUpTimeMnute',
			'value':$('time').get('value')
		}).inject(raForm);
		
		var actionInput6 = new Element('input',{
			'type':'hidden',
			'name':'NumberOfHours',
			'value':$('hourscount').get('value')
		}).inject(raForm);
		var actionInput8 = new Element('input',{
			'type':'hidden',
			'name':'ampm',
			'value':$('ampm').get('value')
		}).inject(raForm);
		
		var actionInput7 = new Element('input',{
			'type':'hidden',
			'name':'OriginalAddress',
			'value':$('from_adress').get('value')
		}).inject(raForm);
		var actionInput9 = new Element('input',{
			'type':'hidden',
			'name':'DestinationAddress',
			'value':$('to').get('value')
		}).inject(raForm);
		
		
		var submitInput = new Element('input', {
			'type':'submit',
			'class':'rasubmit',
			'value':'Click Here',
			'styles':{
				'display': 'block',
				'width': '550px',
				'height': '120px',
				'padding-top':'20px',
				'margin-top': '20px',
				'border': 'none',
				'background': 'transparent',
				'color': '#fff',
				'font-size': '14pt'
			}
		}).inject(raForm);
		
		 
	}

function set_car_icon(car_type, price, div, isHour, times){
	var price_a = new Element('a', {
		'href':'https://www.myshofer.com/reservation/check/?price='+price+'&car='+car_type+'&orig_adress='+from+'&time='+(isHour==1 ? times : 0 )+'&date='+date+'&hour='+hour+'&minute='+minute+'&to='+to+'&ampm='+ampm+'&promocode=&services_id=34&form=k&noofstop='+$('noofstops').get('value')+'&carseat='+(0+carSeat)+'&gatemeet='+(0+gateMeet)+'&fight_num='+$('flight-num').get('value'),
		'class':'ajax_card corner napa_ajax_card',
		'rel':price,
		events: {
		click: function(){
			ga('send', 'pageview', '/step_4');
		}
	}
	}).inject($(div));
	
	price_a.setStyle('float', 'left');
    
    
	var price_text = new Element('div',{
		'html':'$'+number_format((price), 2, '.', ''),
		'class':'card_text_ajax'
	}).inject(price_a);
	
	if (car_type=='Prius')
		{
			var peaple = new Element('div',{
				'class':'people',
				'html':'<div class="peoplecount">3</div>' 
			}).inject(price_a);
			
			var prius = new Element('div',{
				'class':'prius_ajax'
			}).inject(price_a);
			
		}
		else if (car_type=='LUX')
		{
			var peaple = new Element('div',{
				'class':'people',
				'html':'<div class="peoplecount">4</div>' 
			}).inject(price_a);
			var prius = new Element('div',{
				'class':'lux_ajax'
			}).inject(price_a);
			
		}
		else if (car_type=='stretchsuv')
		{
			var peaple = new Element('div',{
				'class':'people',
				'html':'<div class="peoplecount">10</div>' 
			}).inject(price_a);
			var prius = new Element('div',{
				'class':'stretchsuv_ajax'
			}).inject(price_a);
			
		}
		else if (car_type=='SUV')
		{
			var peaple = new Element('div',{
				'class':'people',
				'html':'<div class="peoplecount">7</div>' 
			}).inject(price_a);
			var prius = new Element('div',{
				'class':'suv_ajax'
			}).inject(price_a);
			
		}
		var reservnowbutton = new Element('div',{
				'class':'napa-reservnowbutton',
				'html':'RESERVE'
			}).inject(price_a);
			
}
function number_format(number, decimals, dec_point, thousands_sep){
  var exponent = "";
  var numberstr = number.toString ();
  var eindex = numberstr.indexOf ("e");
 var i, z;
  if(eindex > -1){
    exponent = numberstr.substring (eindex);
    number = parseFloat (numberstr.substring (0, eindex));
  }
  
  if(decimals != null){
    var temp = Math.pow (10, decimals);
    number = Math.round (number * temp) / temp;
  }
  var sign = number < 0 ? "-" : "";
  var integer = (number > 0 ? 
      Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
  
  var fractional = number.toString ().substring (integer.length + sign.length);
  dec_point = dec_point != null ? dec_point : ".";
  fractional = decimals != null && decimals > 0 || fractional.length > 1 ? (dec_point + fractional.substring (1)) : "";
  if(decimals != null && decimals > 0){
    for(i = fractional.length - 1, z = decimals; i < z; ++i)
      fractional += "0";
  }
  
  thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ? 
                  thousands_sep : null;
  if(thousands_sep != null && thousands_sep != ""){
  for (i = integer.length - 3; i > 0; i -= 3)
   integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
  }
  return sign + integer + fractional + exponent;
}
function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}