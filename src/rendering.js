import _ from 'lodash';
import $ from 'jquery';
import 'jquery.flot';
import 'jquery.flot.pie';

export default function link(scope, elem, attrs, ctrl) {
  var data, panel;
  elem = elem.find('.progressbar-panel');
  var $tooltip = $('<div id="tooltip">');

  ctrl.events.on('render', function() {
    render(false);
    setTimeout(function() { render(true); }, 50);
  });

  function render(incrementRenderCounter) {
    if (!ctrl.data) { return; }
    data = ctrl.data;
    panel = ctrl.panel;
    
    if (ctrl.panel && ctrl.panel.decimals) {
      _.map(ctrl.data, (dt, i) => {
        ctrl.data[i].data = parseFloat(dt.data).toFixed(ctrl.panel.decimals)
      })
    }
  }
}
