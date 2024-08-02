let htmlEditor, cssEditor, jsEditor;

function run() {
    let htmlCode = htmlEditor.getValue();
    let cssCode = cssEditor.getValue();
    let jsCode = jsEditor.getValue();
    let output = document.getElementById('output').contentWindow.document;

    output.open();
    output.write(`<style>${cssCode}</style>${htmlCode}<script>${jsCode}\<\/script>`);
    output.close();
}

window.addEventListener('DOMContentLoaded', () => {
    Split(['#html-editor', '#css-editor', '#js-editor'], {
        direction: 'horizontal',
        sizes: [33.3, 33.3, 33.3],
        minSize: 100,
        gutterSize: 10,
        cursor: 'col-resize'
    });

    Split(['.left', '.right'], {
        sizes: [50, 50],
        direction: 'vertical',
        minSize: 100,
        gutterSize: 10,
        cursor: 'row-resize'
    });

    htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
        mode: 'xml',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {"Ctrl-Space": "autocomplete"}
    });

    cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
        mode: 'css',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {"Ctrl-Space": "autocomplete"}
    });

    jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {"Ctrl-Space": "autocomplete"}
    });

    htmlEditor.on('change', run);
    cssEditor.on('change', run);
    jsEditor.on('change', run);
});

function showEditor(editorId) {
    document.querySelectorAll('.editor-section').forEach(editor => {
        editor.style.display = 'none';
    });
    document.getElementById(editorId).style.display = 'flex';
}

if (window.innerWidth < 768) {
    showEditor('html-editor');
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.editor-section').forEach(editor => {
            editor.style.display = 'flex';
        });
    } else {
        showEditor('html-editor');
    }
});

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to close the tab? Your code is not saved.';
});
