/** ==== Begin Contrast Accessibity Script **/
function createCookie(name, value, days){
  var expires = "";
  if(days){
    var time = new Date();
    time.setTime(time.getTime()+(days*24*60*60*1000));
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name){
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return "";
}

function deleteCookie(name) {
  createCookie(name,"",-1);
}

function checkCookie(name){
  var check = getCookie(name);
  if(check != "")
    return true;
  return false;
}

function addConstrast(){
    console.log('addConstrast');
    $('*').addClass('pagina-acessivel');
    $('#header').addClass('f-transparent');
    $('.features-icons').addClass('f-transparent');
    //$('#acess-icons').addClass('f-transparent');
    //$('.acess-icon').addClass('f-transparent');
    //$('img').addClass('f-transparent');
    //$('#jbbutton').addClass('f-transparent');
}

function removeConstrast(){
    console.log('removeConstrast');
    $('*').removeClass('pagina-acessivel');
    $('#header').removeClass('f-transparent');
    $('.features-icons').removeClass('f-transparent');
    //$('#acess-icons').removeClass('f-transparent');
    //$('.acess-icon').removeClass('f-transparent');
    //$('img').removeClass('f-transparent');
    //$('#jbbutton').removeClass('f-transparent');
}

if(checkCookie('ccontrast')){
  addConstrast();
}

$('#contrast').click(function(){
  var ck = checkCookie('ccontrast');
    if(ck){
      deleteCookie('ccontrast');
      $("#contrast i").css("transform", "rotate(0deg)");
      removeConstrast();
    }else{
      createCookie('ccontrast', 'cookieContrast');
      $("#contrast i").css("transform", "rotate(180deg)");
      addConstrast();
    }
});

$('#contrast-mov').click(function(){
  var ck = checkCookie('ccontrast');
    if(ck){
      deleteCookie('ccontrast');
      $("#contrast i").css("transform", "rotate(0deg)");
      removeConstrast();
    }else{
      createCookie('ccontrast', 'cookieContrast');
      $("#contrast i").css("transform", "rotate(180deg)");
      addConstrast();
    }
});
/** ==== End Contrast Accessibity Script **/
