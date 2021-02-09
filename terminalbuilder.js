function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}
function tetris() {
    var nativewindow = document.getElementById("flapbird");
    nativewindow.style.display = 'block';
    document.getElementById('tetrisgame').contentWindow.location.replace("./tetris.html")
}
function settings(){
    var nativewindow = document.getElementById("mydiv");
    nativewindow.style.display = 'block';
}
var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};
var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'getdatafromurl', 'date', 'echo', 'help', 'clear/newsession', 'sysinfo'
  ];

  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'getdatafromurl':
          var url = args.join(' ');
          if (!url) {
            output('Usage: ' + cmd + ' https://url.com/file.js');
            break;
          }
          $.get( url, function(data) {
            var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
               return '&#'+i.charCodeAt(0)+';';
            });
            output('<pre>' + encodedStr + '</pre>');
          });
          break;
        case 'date':
          output( new Date() );
          break;
        case 'echo':
          var echoargs = args.join(' ');
          if (!echoargs) return output('No input to echo.')
          output(echoargs);
          break;
        case 'help':
          output('<br><div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'clear':
        case 'newsession':
          window.location.reload()
          console.log("A new session has been started by the end-user.")
          break;
          case 'hack':
          var hackargs = args.join(' ');
          if (!hackargs) return output('No input to hack.')
          if (hackargs < 20) return output('Argument cannot be longer than 20 characters.')
          output('Preparing to hack ' + hackargs)
          output('Locating ' + hackargs)
          output('Location found: 6942069420')
          output('Preparing to hack the mainframe')
          output('Injected hack into mainframe. Beep Boop.')
          break;
          case 'sysinfo':
          var OSName = "Unknown";
          var saxosversion = "openalpha1"
          if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1)  OSName="Windows 10";
          if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)  OSName="Windows 8";
          if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)  OSName="Windows 7";
          if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)  OSName="Windows Vista";
          if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)  OSName="Windows XP";
          if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)  OSName="Windows 2000";
          if (window.navigator.userAgent.indexOf("Mac")            != -1)  OSName="Mac/iOS";
          if (window.navigator.userAgent.indexOf("X11")            != -1)  OSName="UNIX";
          if (window.navigator.userAgent.indexOf("Linux")          != -1)  OSName="Linux";
          output(`Host operating system: ${OSName}`)
          output(`OS Version: SaxOS-V${saxosversion}`)
            break;
        default:
          if (cmd) {
            output('\'' + cmd + '\' is not a valid command or is not available.');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<div>' + html + '</div>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<style>.noselect{-webkit-touch-callout: none;  -webkit-user-select: none;  -khtml-user-select: none;   -moz-user-select: none;   -ms-user-select: none; user-select: none;}</style> <img class="noselect" align="left" src="./Cool%20Text%20-%20SAXOS%20359333606253121.png" style="padding: 0px 10px 20px 0px"><h2 class="noselect" style="letter-spacing: 4px">SaxOS Terminal V2.0</h2><p class="line">' + '</p><p class="noselect">For a list of help commands input "help" in the command line.</p>');
    },
    output: output
  }
};
