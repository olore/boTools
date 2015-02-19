(function(_, scripts) {

function runScript(obj) {
  runFunction(obj.fn, function(output) {
    document.querySelector(obj.outputSelector).innerHTML = obj.output.replace('{{output}}', output);
  });
}

// I think this is bad, but I can't get message passing to work
function runFunction(fn, cb) {
  chrome.devtools.inspectedWindow.eval('(' + fn.toString() + ')()', cb);
}

function setup() {
  _.each(scripts, function(scriptObj) {
    var btn = document.createElement('button'),
        div = document.createElement('div');

    // create button
    btn.setAttribute('class', scriptObj.buttonSelector.replace('.', ''));
    btn.innerHTML = scriptObj.name;
    document.body.appendChild(btn);

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    // fire up a setInterval when the checkbox is selected
    checkbox.addEventListener('change', function(foo) {
      if (this.checked) {
        var delay = parseInt(document.querySelector('.delay-' + scriptObj.buttonSelector.replace('.', '')).value, 10)

        scriptObj.interval = setInterval(runScript.bind(null, scriptObj),
          delay
        );

      } else {
        clearInterval(scriptObj.interval);
      }

    });

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'delay-' + scriptObj.buttonSelector.replace('.', ''));
    input.value = 5000;

    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(checkbox);
    document.body.appendChild(input);

    // create area for output
    div.setAttribute('class', scriptObj.outputSelector.replace('.', ''));
    document.body.appendChild(div);

    // make some space
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(document.createElement('br'));

    // setup listeners
    document.querySelector(scriptObj.buttonSelector).addEventListener('click', runScript.bind(null, scriptObj));
  });
}

window.addEventListener('load', setup);

})(_, scripts);
