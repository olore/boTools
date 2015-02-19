(function(scripts) {

scripts.countScopes = {
  name: 'Count Thy Scopes',
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

})(scripts);
