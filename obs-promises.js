const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators')

const doSomething = () => {
  return new Promise((resolve) => {
    resolve('valor 1');
    resolve('valor 2');
    setTimeout(() => {
      resolve('valor 3');
    }, 2000)
  });
}

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $');
    }, 4000)
    setTimeout(() => {
      observer.next(null);
    }, 6000)
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 8000)
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();


(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();
