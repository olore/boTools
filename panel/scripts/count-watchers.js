(function(scripts) {

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

})(scripts);
