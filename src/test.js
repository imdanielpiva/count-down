import CountDown from '@danielpiva/countdown.js/dist';
import '@danielpiva/countdown.js/dist/index.css';

console.log(CountDown);

const topBarCountDown = new CountDown("#app", {
  until: new Date(2019, 0, 14, 1, 30),
  locale: {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Min',
    seconds: 'Sec'
  }
});

topBarCountDown.on("start", event => console.log("@ start"));
topBarCountDown.on("pause", event => console.log("@ pause"));
topBarCountDown.on("resume", event => console.log("@ resume"));
topBarCountDown.on("update", event => console.log("@ update"));
topBarCountDown.on("end", event => console.log("@ end"));
topBarCountDown.on("destroy", event => console.log("@ destroy"));
topBarCountDown.on("render", event => console.log("@ render"));

topBarCountDown.start();

setTimeout(() => topBarCountDown.pause(), 10);
setTimeout(() => topBarCountDown.resume(), 11);
setTimeout(() => topBarCountDown.forceUpdate(), 12);

setTimeout(() => topBarCountDown.destroy(), 30);