import Hello from './hello'

(new Hello({
  target: document.querySelectorAll('.js-holder')[0]
})).run();

