import Handsontable from 'handsontable';
import Quill from 'quill';

class FormattedTextEditor extends Handsontable.editors.TextEditor {
  init() {
    this.offsetLeft;
    this.offsetTop;
    this.editor;
    this.isOpen = false;
    this.isMoveWindow = false;

    this.quillWidth = 400;
    this.quillHeight = 100;
  }

  prepare(row, col, prop, TD, originalValue, cellProperties) {
    this.TD = TD;
    this.row = row;
    this.col = col;
    this.prop = prop;
    this.originalValue = originalValue;
    this.cellProperties = cellProperties;
    this.state = 'STATE_VIRGIN';

    super.prepare(row, col, prop, TD, originalValue, cellProperties);

    if (this.editableDiv) return;

    this.editableDiv = document.createElement('div');
    this.editableDiv.innerHTML = originalValue;
    this.TEXTAREA_PARENT.className += ' quillEditor';
    this.TEXTAREA_PARENT.appendChild(this.editableDiv);
    this.TEXTAREA_PARENT.style.width = this.quillWidth + 'px';
    this.TEXTAREA_PARENT.style.height = this.quillHeight + 'px';
    this.TEXTAREA_PARENT.style.display = 'none';

    this.quill = new Quill(this.editableDiv, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'strike', 'clean'],
          [{'color': []}],
        ],
      },
    });

    const that = this;

    this.quill.root.addEventListener('keydown', function(event) {
      if (!this.isOpen) return;

      if (event.keyCode === 13 && !event.shiftKey) {
        event.stopImmediatePropagation();
        that.finishEditing(false, false);
        that.close();
      } else if (event.keyCode === 27) {
        event.stopImmediatePropagation();
        that.finishEditing(true, false);
        that.close();
      }
    });

    this.instance._registerTimeout(setTimeout(function() {
      that.refreshDimensions();
    }, 0));
  }

  open(keyboardEvent) {
    this.isOpen = true;

    this.refreshDimensions();

    if (keyboardEvent) {
      this.setValue(this.TD.innerHTML);
    }

    const that = this;

    setTimeout(function() {
      const toolbar = document.getElementsByClassName('ql-toolbar')[0];
      const editor = toolbar.parentNode;
      editor.style.top = that.TD.offsetTop + that.TD.offsetHeight + 'px';
      editor.style.left = that.TD.offsetLeft + 'px';
      editor.style.display = '';

      toolbar.onmousedown = function(event) {
        this.offsetLeft = event.clientX - parseInt(editor.style.left);
        this.offsetTop = event.clientY - parseInt(editor.style.top);
        document.addEventListener('mousemove', onMouseMove);
      };
      toolbar.onmouseup = function(event) {
        document.removeEventListener('mousemove', onMouseMove);
        if (this.isMoveWindow) {
          this.isMoveWindow = false;
          that.quill.setSelection(0, 0);
        }
      };

      that.quill.setText('');
      that.quill.pasteHTML(0, that.TD.innerHTML);
      // Set focus;
      that.quill.setSelection(0, 0);
    }, 1);
  }

  close() {
    this.isOpen = false;
    this.instance.listen();
    this.TEXTAREA_PARENT.display = 'none';
    this.close.apply(this, arguments);
  }
}

export default FormattedTextEditor;