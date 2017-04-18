angular.module('app', [])
.controller('AppController', AppController);

AppController.$inject = ['$interval'];

function AppController ($interval) {
  var ctrl = this;
  ctrl.test = 'OMG Angular is working';
  ctrl.hour = 0
  ctrl.min = 0
  ctrl.sec = 0
  ctrl.ms = 0

  ctrl.start = start;
  ctrl.stop = stop;
  ctrl.reset = reset;


  function start () {
    ctrl.stop();
    ctrl.clock = $interval(_ => {
      ctrl.ms++;
      if (ctrl.ms === 250) {
        ctrl.ms = 0;
        ctrl.sec++;
      }
      if (ctrl.sec === 60) {
        ctrl.sec = 0;
        ctrl.min++;
      }
      if (ctrl.min === 60) {
        ctrl.min = 0;
        ctrl.hour++;
      }
    }, 1)
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
