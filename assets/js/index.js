const button = document.getElementsByTagName('input')[0];

button.addEventListener(
  'click',
  throttle(() => {
    console.log(+new Date());
  }, 2000)
);

function throttle(fn, splitTime) {
  let last = 0;
  let timer = null;
  return function () {
    let current = +new Date();
    clearTimeout(timer);
    if (current - last >= splitTime) {
      fn();
      last = current;
    } else {
      timer = setTimeout(function () {
        fn();
        last = current;
      }, splitTime - (current - last));
    }
  };
}
