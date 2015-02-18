(function() {


function listen() {
  var countWatchersButton = document.querySelector('.count-watchers'),
      countScopesButton = document.querySelector('.count-scopes');

  countWatchersButton.addEventListener('click', callCountAngularWatchers);
  countScopesButton.addEventListener('click', callCountAngularScopes);
}

window.addEventListener('load', listen);

function countScopes() {

  var i, data, scope,
        scopeList = [],
        seenScope = {},
        toProcess = 1,
        scopes = 0
        maxScopeId = 0;

  scopeList.push(angular.element(document).injector().get('$rootScope'));

  while(toProcess !== 0) {
    scope = scopeList.shift();
    toProcess -= 1;

    if (!seenScope[scope.$id]){
        scopes += 1;
        maxScopeId = Math.max(scope.$id, maxScopeId);
        seenScope[scope.$id] = true;
    }

    if (scope.$$childHead !== null) {
        toProcess += 1;
        scopeList.push(scope.$$childHead);
    }

    if (scope.$$nextSibling !== null) {
        toProcess += 1;
        scopeList.push(scope.$$nextSibling);
    }

  }
  
  console.log('There are ', scopes, ' scopes');
  console.log('The maximum scope id is ', maxScopeId);
  return scopes;
}

function countWatchers() {
  var i, data, scope,
  count = 0,
  all = document.all,
  len = all.length,
  test = {};

  // go through each element. Count watchers if it has scope or isolate scope
  /* eslint no-for-loops:0 */
  for (i = 0; i < len; i++) {
    /* global angular */
    data = angular.element(all[i]).data();
    scope = data.$scope || data.$isolateScope;
    if (scope && scope.$$watchers) {
      if ( !test[ scope.$id ] ) {
        test[ scope.$id ] = true;
        count += scope.$$watchers.length;
      }
    }
  }
  var msg = 'This page has ' + count + ' angular watchers';
  console.log(msg);
  return count;
}

function callCountAngularWatchers() {

  chrome.devtools.inspectedWindow.eval('(' + countWatchers.toString() + ')()', function(output) {
    console.log(output);
    document.querySelector('.count-watchers-output').innerHTML = 'There are <b>' + output + '</b> watchers on the page';
  });
}

function callCountAngularScopes() {

  chrome.devtools.inspectedWindow.eval('(' + countScopes.toString() + ')()', function(output) {
    console.log(output);
    document.querySelector('.count-scopes-output').innerHTML = 'There are <b>' + output + '</b> scopes on the page';
  });
}


})();


