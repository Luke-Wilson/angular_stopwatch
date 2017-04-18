var d = new Date();

angular.module('app', [])
.controller('AppController', AppController);

AppController.$inject = ['$interval'];

function AppController ($interval) {
  var ctrl = this;
  ctrl.sec = '00';
  ctrl.ms = '00';

  ctrl.start = start;
  ctrl.stop = stop;
  ctrl.reset = reset;

  function start () {
    d = d || new Date();
    ctrl.stop();
    ctrl.clock = $interval(_ => {
      ctrl.diff = Date.now() - d;
      ctrl.sec = Math.floor(ctrl.diff / 1000) % 60;
      ctrl.ms = lpad(Math.floor((ctrl.diff % 1000) / 10));
      ctrl.min = Math.floor(ctrl.diff / 60000) % 60;
      ctrl.hour = Math.floor(ctrl.diff / (60000*60));
    }, 1);
  }

  function stop() {
    $interval.cancel(ctrl.clock)
  }

  function reset() {
    ctrl.stop();
    ctrl.hour = 0;
    ctrl.min = 0;
    ctrl.sec = 0;
    ctrl.ms = 0;
    d = undefined;
  }

  function lpad(num) {
    if (num < 10) {
      return '0'+num;
    }
    return num;
  }
};

//
//
// (function () {
//   angular
//     .module('app', [])
//     .controller('StopWatchController', StopWatchController);
//
//     StopWatchController.$inject = ['$interval'];
//
//     function StopWatchController ($interval) {
//       var ctrl = this;
//       ctrl.seconds = 0;
//       ctrl.milliseconds = '00';
//       ctrl.run = false;
//       ctrl.lapCount = 0;
//       ctrl.laps = [];
//
//       ctrl.reset = reset;
//       ctrl.pause = pause;
//       ctrl.start = start;
//       ctrl.addLap = addLap;
//
//       function start() {
//         ctrl.run = true;
//         $interval(function () {
//           if (ctrl.run) {
//             ctrl.milliseconds++;
//             if (ctrl.milliseconds < 10) {
//               ctrl.milliseconds = '0' + ctrl.milliseconds;
//             }
//             if (ctrl.milliseconds === 100) {
//               ctrl.seconds++;
//               ctrl.milliseconds = 0;
//             }
//           }
//         }, 1);
//       }
//
//       function pause() {
//         ctrl.run = false;
//       }
//
//       function reset () {
//         ctrl.run = false;
//         ctrl.laps = [];
//         ctrl.seconds = 0;
//         ctrl.milliseconds = '00';
//       }
//
//       function addLap() {
//         ctrl.lapCount++;
//         ctrl.laps.push(`Lap ${ctrl.lapCount}: ${ctrl.seconds}.${ctrl.milliseconds}`);
//         console.log(ctrl.laps);
//       }
//     }
// })();
