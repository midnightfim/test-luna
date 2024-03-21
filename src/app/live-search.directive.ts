import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Directive({
  selector: '[liveSearch]',
  standalone: true
})
export class LiveSearchDirective implements OnInit {
  @Input() throttle: number = 0;
  @Output() inputEvent = new EventEmitter<string>();

  private subject = new Subject<string>();

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(this.throttle),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.inputEvent.emit(value);
    });
  }

  @HostListener('input', ['$event'])
  onChange(event: InputEvent) {
    this.subject.next(this.el.nativeElement.value)
  }
}
