const wloc = window.location.pathname;
const srdir = wloc.substring(0, wloc.lastIndexOf("/")+1);
setTimeout(()=>{
    if (window.location.pathname=== srdir+"saxosfailboot.html") return document.getElementById("user").innerHTML= "demo"
    if (window.location.pathname=== srdir+"os.html") return "demo"
    if (window.location.pathname=== srdir+"login.html") return "demo"
    if (window.location.pathname=== srdir+"terminal.html") {
      $(function() {
  
        $('.prompt').html('[' + "demo" + '@saxos] $ ');
        var term = new Terminal('#input-line .cmdline', '#container output');
        term.init();
        
        // Update the clock every second
        setInterval(function() {
          function r(cls, deg) {
            $('.' + cls).attr('transform', 'rotate('+ deg +' 50 50)')
          }
          var d = new Date()
          r("sec", 6*d.getSeconds())  
          r("min", 6*d.getMinutes())
          r("hour", 30*(d.getHours()%12) + d.getMinutes()/2)
        }, 1000);
      });
    }
  }, 75);