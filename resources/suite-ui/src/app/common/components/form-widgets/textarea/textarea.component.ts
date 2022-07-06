import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/i18n/services/language.service';

// To use jquery function in component
declare var $: any;
declare var Quill: any;

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input()
  value: string = null;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Output()
  update = new EventEmitter();

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    var selector = '[data-toggle="quill-' + this.name + '"]';
    var this_ = this;

    $(document).ready(() => {
      "use strict";
      var a = $(selector);
      var e;
      e = a.data("quill-placeholder");
      var quill = new Quill(selector, {
        modules: {
          toolbar: [["bold", "italic"], ["link", "blockquote", "code"], [{ list: "ordered" }, { list: "bullet" }]]
        },
        placeholder: this_.languageService.translate(e),
        theme: "snow",
      });
      quill.on('text-change', function(delta, oldDelta, source) {
        this_.update.emit(quill.getText());
      });
      // quill.setText(value);
    });
  }

}
