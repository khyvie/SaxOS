const wloc = window.location.pathname;
const srdir = wloc.substring(0, wloc.lastIndexOf("/")+1);
// Not actually login js but this will hopefully fix the issue.

function failboot(){
  console.log("The OS ran into a problem, report this issue at @ https://github.com/saxnbt/SaxOS/issues/new")
}
