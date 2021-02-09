window.addEventListener("contextmenu",function(event){
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.clientY + "px";
    contextElement.style.left = event.clientX + "px";
    contextElement.classList.remove("notactive");
    contextElement.classList.add("active");
    if (contextElement.classList.contains("active")){
    setTimeout(function(){contextElement.classList.add("smooth");},500)
    } else{
        return console.log("Not active, smooth transitioning disabled.")
    }
  });
  window.addEventListener("click",function(){
    document.getElementById("context-menu").classList.remove("active");
    document.getElementById("context-menu").classList.add("notactive");
    document.getElementById("context-menu").classList.remove("smooth");
  });
  function shutdownos(){
    var $ = require("jquery");
    $("body").fadeOut(1000,function(){
      window.location.replace('./shutdown.html')
   })
   }
   function restartos(){
    var $ = require("jquery");
    $("body").fadeOut(1000,function(){
      window.location.replace('./restart.html')
   })
   }
   function signout(){
    var $ = require("jquery");
    $("body").fadeOut(1000,function(){
      window.location.replace('./login.html')
   })
   }