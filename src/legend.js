import angular from 'angular';
//import _ from  'lodash';
import kbn from 'app/core/utils/kbn';
import $ from  'jquery';
import 'jquery.flot';
import 'jquery.flot.time';

angular.module('grafana.directives').directive('progressLegend', function(popoverSrv, $timeout) {
  return {
    link: function(scope, elem) {
      // var $container = $('<section class="graph-legend"></section>');
      var firstRender = true;
      var ctrl = scope.ctrl;
      var panel = ctrl.panel;
      var data;
      var seriesList;
      var i;
      debugger;

      ctrl.events.on('render', function() {
        data = ctrl.series;
        if (data) {
          for(var i in data) {
            data[i].color = ctrl.data[i].color;
          }
          render();
        }
      });

      function getSeriesIndexForElement(el) {
        return el.parents('[data-series-index]').data('series-index');
      }

      function toggleSeries(e) {
        var el = $(e.currentTarget);
        var index = getSeriesIndexForElement(el);
        var seriesInfo = seriesList[index];
        ctrl.toggleSeries(seriesInfo, e);
      }

      function openColorSelector(e) {
        // if we clicked inside poup container ignore click
        if ($(e.target).parents('.popover').length) {
          return;
        }

        var el = $(e.currentTarget); //.find('.fa-minus');

        var index = getSeriesIndexForElement(el);
        var series = seriesList[index];

        $timeout(function() {
          popoverSrv.show({
            element: el[0],
            position: 'bottom center',
            template: '<gf-color-picker></gf-color-picker>',
            openOn: 'hover',
            model: {
              autoClose: true,
              series: series,
              toggleAxis: function() {},
              colorSelected: function(color) {
                ctrl.changeSeriesColor(series, color);
              }
            },
          });
        });
      }

      function render() {

        if (firstRender) {
          // elem.append($container);
          $('.progress-bar').on('click', openColorSelector);
          // $container.on('click', 'th', sortLegend);
          firstRender = false;
        }

        seriesList = data;
      }
    }
  };
});
