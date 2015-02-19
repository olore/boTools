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

    // create area for output
    div.setAttribute('class', scriptObj.outputSelector.replace('.', ''));
    document.body.appendChild(div);

    // setup listeners
    document.querySelector(scriptObj.buttonSelector).addEventListener('click', runScript.bind(null, scriptObj));
  });
}

window.addEventListener('load', setup);

})(_, scripts);
