import EventEmitter from "./EventEmitter";

import "./styles.css";

const EVENT_TYPES = [
  "start",
  "pause",
  "render",
  "update",
  "resume",
  "destroy",
  "click",
  "end"
];

const Utils = {
  locale: {
    ptBr: {
      days: "Dias",
      hours: "Horas",
      minutes: "Min",
      seconds: "Seg"
    }
  },
  dom: {
    setClass: (el, className) => (el.className = `${el.className} ${className}`),
    textContent: (el, content) => (el.textContent = content),
    append: (el, node) => el.appendChild(node),
    appendAll: (el, nodes) =>
      nodes.forEach(node => el.appendChild(node))
  },
  error: {
    types: {
      ElementNotProvided: {
        type: "ElementNotProvided",
        message: "You must provide either an element or a selector."
      },
      InvalidDate: {
        type: "InvalidDate",
        message:
          "You must pass a valid date to your count either when you instantiate you count down or through the start function."
      }
    },
    throw(error) {
      return console.error(
        new Error(`${error.type}\n Message: ${error.message}`)
      );
    }
  },
  date: {
    isValid(date) {
      if (!date) return false;

      return date.getTime ? Number.isNaN(date.getTime()) : false;
    }
  },
  timer: {
    count(until) {
      const distance = until - Date.now();

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    }
  }
};

function CountDown(elementSelectorOrRef, options = {}) {
  const $element =
    typeof elementSelectorOrRef === "string"
      ? document.querySelector(elementSelectorOrRef)
      : elementSelectorOrRef;

  if (!$element) {
    return Utils.error.throw(Utils.error.types.ElementNotProvided);
  }

  const events = new EventEmitter(EVENT_TYPES);
  const locale = options.locale || Utils.locale.ptBr;

  let done = false;
  let isPaused = true;
  let lastCount = null;
  let hasStarted = false;
  let isFirstRender = true;
  let until = new Date(options.date || options.until);

  const $elements = {
    main: document.createElement("div"),
    days: {
      main: document.createElement("div"),
      number: document.createElement("div"),
      label: document.createElement("div")
    },
    hours: {
      main: document.createElement("div"),
      number: document.createElement("div"),
      label: document.createElement("div")
    },
    minutes: {
      main: document.createElement("div"),
      number: document.createElement("div"),
      label: document.createElement("div")
    },
    seconds: {
      main: document.createElement("div"),
      number: document.createElement("div"),
      label: document.createElement("div")
    }
  };

  this.on = events.on;
  this.off = events.off;

  this.start = start;
  this.pause = pause;
  this.resume = resume;
  this.destroy = destroy;
  this.forceUpdate = forceUpdate;

  function run() {
    if (done) return;

    if (!isPaused) {
      const remainingTime = Utils.timer.count(until);

      lastCount = remainingTime;

      if (until < new Date()) {
        done = true;

        const count = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        events.dispatch("update", count);

        render(count);

        events.dispatch("render", count);
        events.dispatch("end", count);

        return;
      }

      events.dispatch("update", lastCount);
      render(remainingTime);

      setTimeout(run, 1000);
    }
  }

  function start(date) {
    const hasValidUntilDate = Utils.date.isValid(until);
    const isDateInvalid =
      hasValidUntilDate || Utils.date.isValid(date);

    if (isDateInvalid) {
      return Utils.error.throw(Utils.error.types.InvalidDate);
    }

    if (hasStarted) return;

    isPaused = false;
    hasStarted = true;

    events.dispatch("start", lastCount);

    run();
  }

  function forceUpdate() {
    const remainingTime = Utils.timer.count(until);

    lastCount = remainingTime;

    render(remainingTime);
  }

  function render({ days, hours, minutes, seconds }) {
    if (isFirstRender) {
      isFirstRender = false;

      Utils.dom.append($element, $elements.main);

      Utils.dom.setClass($element, "count-down");
      Utils.dom.setClass($elements.main, "count-down__container");
    }

    Utils.dom.textContent(
      $elements.days.number,
      `${days}`.padStart(2, 0)
    );
    Utils.dom.textContent(
      $elements.hours.number,
      `${hours}`.padStart(2, 0)
    );
    Utils.dom.textContent(
      $elements.minutes.number,
      `${minutes}`.padStart(2, 0)
    );
    Utils.dom.textContent(
      $elements.seconds.number,
      `${seconds}`.padStart(2, 0)
    );

    events.dispatch("render", lastCount);
  }

  function resume() {
    isPaused = false;

    events.dispatch("resume", lastCount);

    run();
  }

  function pause() {
    if (!isPaused) {
      isPaused = true;

      events.dispatch("pause", lastCount);
    }
  }

  function destroy() {
    const countDown = $element.querySelector('.count-down__container');

    if (countDown) {
      done = true;
      isPaused = false;

      countDown.remove();
      events.dispatch("destroy", lastCount);
      
      const countDownClassNameIndex = $element.className.indexOf('count-down');

      if (countDownClassNameIndex >= 0) {
        const className = $element.className.slice(countDownClassNameIndex, 10);

        Utils.dom.setClass($element, className);
      }
    }

  }

  const dateUnits = ["days", "hours", "minutes", "seconds"];

  dateUnits.forEach((dateUnit) => {
    const { main, label, number } = $elements[dateUnit];

    Utils.dom.appendAll(main, [label, number]);

    Utils.dom.textContent(label, locale[dateUnit]);

    Utils.dom.setClass(main, "count-down__unit-box");
    Utils.dom.setClass(label, "count-down__unit-label");
    Utils.dom.setClass(number, "count-down__unit-number");

    Utils.dom.append($elements.main, main);
  });
}

window.CountDown = CountDown;

export default CountDown;
