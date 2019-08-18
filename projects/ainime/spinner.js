import {Spinner} from './libraries/spin/spin.js';

var opts = {
  lines: 15, // The number of lines to draw
  length: 35, // The length of each line
  width: 16, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 0.5, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#2e2929', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 79, // The rotation offset
  animation: 'spinner-line-fade-default', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '37%', // Top position relative to parent
  left: '51%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'relative' // Element positioning
};

export function enable_spin(){
  document.getElementById("tab").innerHTML="AInime - Loading..."
  var target = document.getElementById('spinner');
  var spinner = new Spinner(opts).spin(target);
}

export function disable_spin(){
  document.getElementById("tab").innerHTML="AInime"
  $(".spinner").remove();
}
