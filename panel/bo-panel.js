(function(_, scripts) {

function runScript(obj) {
  runFunction(obj.fn, function(output) {
    document.querySelector('.count-' + obj.label + '-output').innerHTML = obj.output.replace('{{output}}', output);
  });
}

// I think this is bad, but I can't get message passing to work
function runFunction(fn, cb) {
  chrome.devtools.inspectedWindow.eval('(' + fn.toString() + ')()', cb);
}

function setup() {
  _.each(scripts, function(scriptObj) {

    // fire up a setInterval when the checkbox is selected
    document.querySelector(scriptObj.checkboxSelector).addEventListener('change', function() {
      if (this.checked) {
        var delay = parseInt(document.querySelector('.delay-count-' + scriptObj.label).value, 10);

        scriptObj.interval = setInterval(runScript.bind(null, scriptObj),
          delay
        );

      } else {
        clearInterval(scriptObj.interval);
      }

    });

    // setup listeners
    document.querySelector('.count-' + scriptObj.label).addEventListener('click', runScript.bind(null, scriptObj));
  });
}

window.addEventListener('load', setup);

})(_, scripts);
