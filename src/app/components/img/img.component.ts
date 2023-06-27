import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('change just img =>', this.img)
  }

  @Input() alt = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/silver.png";
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // before render
    // no async -- once time

    // console.log('constructor' , 'img value =>', this.img )

  }


  // ngOnChanges(changes: SimpleChanges) {
  //   // before - during render
  //   // change inputs -- times
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.

  //   // console.log('ngOnChanges' , 'img value =>', this.img )
  //   // console.log('change', changes)

  // }

  // ngOnInit() {
  //   // before render
  //   // async - fetch -- once time
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.

  //   // console.log('ngOnInit' , 'img value =>', this.img )
  //   // this.counterFn = window.setInterval(() => {
  //   //   this.counter += 1;
  //   //   console.log('run counter')
  //   // }, 1000);
  // }

  // ngAfterViewInit() {
  //   // after render
  //   // handler children
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   // console.log('ngAfterViewInit')

  // }

  // ngOnDestroy() {
  //   // delete
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   // console.log('ngOnDestroy');
  //   // window.clearInterval(this.counterFn)
  // }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // console.log("Log Hijo");
    this.loaded.emit(this.img)
  }

}

