'use strict';

System.register(['lodash', 'jquery', 'jquery.flot', 'jquery.flot.pie'], function (_export, _context) {
  "use strict";

  var _, $;

  function link(scope, elem, attrs, ctrl) {
    var data, panel;
    elem = elem.find('.progressbar-panel');
    var $tooltip = $('<div id="tooltip">');

    ctrl.events.on('render', function () {
      render(false);
      setTimeout(function () {
        render(true);
      }, 50);
    });

    function render(incrementRenderCounter) {
      if (!ctrl.data) {
        return;
      }
      data = ctrl.data;
      panel = ctrl.panel;

      if (ctrl.panel && ctrl.panel.decimals) {
        _.map(ctrl.data, function (dt, i) {
          ctrl.data[i].data = parseFloat(dt.data).toFixed(ctrl.panel.decimals);
        });
      }
    }
  }

  _export('default', link);

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jqueryFlot) {}, function (_jqueryFlotPie) {}],
    execute: function () {}
  };
});
//# sourceMappingURL=rendering.js.map
