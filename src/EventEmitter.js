function EventEmitter(types = []) {
  const listeners = {};

  types.forEach(type => (listeners[type] = []));

  this.on = on;
  this.off = off;
  this.dispatch = dispatch;

  function on(event, handler) {
    listeners[event].push(handler);

    return handler;
  }

  function off(event, handler) {
    const handlerIndex = listeners[event].indexOf(handler);

    if (handlerIndex >= 0) {
      listeners.splice(handlerIndex, 1);
    } else {
      listeners[event] = [];
    }
  }

  function dispatch(event, args) {
    listeners[event].forEach(handler => handler(args));
  }
}

export default EventEmitter;
