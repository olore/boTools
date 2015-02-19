var scripts = {};

scripts.countScopes = {
  name: 'Count Scopes',
  output: 'There are <b>{{output}}</b> scopes on the page',
  outputSelector: '.count-scopes-output',
  buttonSelector: '.count-scopes',
  fn: function() {
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
    return scopes;
  }
}

scripts.countWatchers = {
  name: 'Count Watchers',
  output: 'There are <b>{{output}}</b> watchers on the page',
  outputSelector: '.count-watchers-output',
  buttonSelector: '.count-watchers',
  fn: function() {
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
    return count;
  }
}


