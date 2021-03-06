(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'
        // Custom Feature modules
        ,'app.page'
        ,'app.services'
        ,'app.auth'
        ,'app.dashboard'
        ,'app.user'
        ,'app.testcase'
        ,'app.testrun'
        ,'app.view'
        ,'app.settings'
        ,'app.monitors'
        ,'app.integrations'
        ,'app.certification'
        ,'app.sidebar'
        // 3rd party feature modules
        ,'md.data.table'
        ,'timer'
        ,'n3-line-chart'
        ,'n3-pie-chart'
        ,'ngSanitize'
        ,'chieffancypants.loadingBar'
        ,'textAngular'
        ,'gridstack-angular'
        ,'ngMaterialDateRangePicker'
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        Array.prototype.indexOfId = function(id) {
            for (var i = 0; i < this.length; i++)
                if (this[i].id === id)
                    return i;
            return -1;
        };
        Array.prototype.indexOfName = function(name) {
            for (var i = 0; i < this.length; i++)
                if (this[i].name === name)
                    return i;
            return -1;
        };
    }
    ]).directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function(e) {
                    e.stopPropagation();
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }]).directive('nonautocomplete', function () {
        return {
            restrict: 'A',
            link:function($scope, element, attrs) {
                var firstDivElement = element.parent().closest('div');
                angular.element('<input type="password" name="password" class="hide"/>').insertBefore(firstDivElement);
            }
        };
    }).directive('showMore', ['$location', '$anchorScroll', '$timeout', function(location, anchorScroll, timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                text: '=',
                limit:'=',
                elementId: '='
            },

            template: '<div class="wrap"><div ng-show="largeText"> {{ text | subString :0 :end }}.... <a href="javascript:;" ng-click="showMore()" id="more{{ elementId }}" ng-show="isShowMore">Show&nbsp;more</a><a href="javascript:;" id="less{{ elementId }}" ng-click="showLess()" ng-hide="isShowMore">Show&nbsp;less </a></div><div ng-hide="largeText">{{ text }}</div></div> ',

            link: function(scope, iElement, iAttrs) {

                anchorScroll.yOffset = 100;

                scope.end = scope.limit;
                scope.isShowMore = true;
                scope.largeText = true;

                var showMoreOffset = 0;
                var showMoreElementId = 'more' + scope.elementId;
                var showLessElementId = 'less' + scope.elementId;

                if (scope.text.length <= scope.limit) {
                    scope.largeText = false;
                }

                scope.showMore = function() {
                    showMoreOffset = angular.element('#' + showMoreElementId).offset().top;
                    scope.end = scope.text.length;
                    scope.isShowMore = false;
                };

                scope.showLess = function(elementId) {

                    scope.end = scope.limit;
                    scope.isShowMore = true;

                    timeout(function () {
                        if (window.pageYOffset > showMoreOffset) {
                            /*if (location.hash() !== showMoreElementId) {
                                location.hash(showMoreElementId);
                            } else {*/
                                anchorScroll(showMoreElementId);
                            /*}*/
                        }
                    }, 80);
                };
            }
        };
    }]).directive('codeTextarea', ['$timeout', '$interval', '$rootScope', function ($timeout, $interval, $rootScope) {
        "use strict";
        return {
            restrict: 'E',
            template: '<span>' +
            '<i style="float: right" data-ng-click="refreshHighlighting()" class="fa fa-refresh" data-toggle="tooltip" title="Highlight code syntax" aria-hidden="true"></i>' +
            '<i style="float: right" data-ng-click="showWidget()" data-ng-if="codeClass != sql" class="fa fa-pie-chart" data-toggle="tooltip" title="Show widget preview" aria-hidden="true">&nbsp&nbsp</i>' +
            '<i style="float: right" data-ng-click="executeSQL()" data-ng-if="codeClass != sql" class="fa fa-flash" data-toggle="tooltip" title="Execute SQL query " aria-hidden="true">&nbsp&nbsp</i>' +
            '<pre class="code"><code data-ng-class="{{ codeClass }}" ng-dblclick="refreshHighlighting()" ng-transclude contenteditable="true">{{ codeData }}</code></pre><hr style="margin-top: 0"></span>',
            replace: true,
            require: 'ngModel',
            transclude: true,
            scope: {
                ngModel: '=',
                codeData: '@',
                codeClass: '@'
            },
            link: function (scope, iElement, iAttrs, ngModel) {

                var initHighlight = function() {
                    var myScope = scope.codeClass;
                    hljs.configure({
                        tabReplace: '    '
                    });
                    scope.refreshHighlighting();
                };

                scope.refreshHighlighting = function () {
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                };

                scope.executeSQL = function () {
                    $rootScope.$broadcast('$event:executeSQL');
                };

                scope.showWidget = function () {
                    $rootScope.$broadcast('$event:showWidget');
                };

                $timeout(initHighlight, 100);

                iElement.bind("blur keyup change", function() {
                    ngModel.$setViewValue(iElement[0].innerText.trim());
                });
            }
        };
    }]).directive('zafiraBackgroundTheme', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link:function($scope, iElement, attrs) {

                var element = attrs.zafiraBackgroundTheme;

                var darkThemes = $rootScope.darkThemes;

                var addTheme = function (mainSkinValue) {
                    iElement.addClass(getTheme(mainSkinValue));
                };

                var getTheme = function (mainSkinValue) {
                    var themeBackgroundClass;
                    switch (element) {
                        case 'graph':
                            themeBackgroundClass = darkThemes.indexOf(mainSkinValue) >= 0 ? 'gray-container' : 'background-clear-white';
                            break;
                        case 'table':
                            themeBackgroundClass = darkThemes.indexOf(mainSkinValue) >= 0 ? 'gray-container' : 'background-clear-white';
                            break;
                        case 'modal':
                            themeBackgroundClass = darkThemes.indexOf(mainSkinValue) >= 0 ? 'gray-container' : 'background-clear-white';
                            break;
                        case 'pagination':
                            themeBackgroundClass = darkThemes.indexOf(mainSkinValue) >= 0 ? 'gray-container' : 'background-clear-white';
                            break;
                        default:
                            themeBackgroundClass = darkThemes.indexOf(mainSkinValue) >= 0 ? 'gray-container' : 'background-clear-white';
                            break;
                    }
                    return themeBackgroundClass;
                };

                $scope.$watch("main.skin",function(newValue,oldValue) {
                    if(! newValue && !oldValue) {
                        newValue = $rootScope.main.skin;
                        oldValue = $rootScope.main.skin;
                    } else {
                        $rootScope.main.skin = newValue;
                        $rootScope.main.isDark = darkThemes.indexOf(newValue) >= 0;
                        $scope.main.theme = $rootScope.main.isDark ? 'dark' : '';
                        $scope.main.default = $rootScope.main.isDark ? 'default' : 'default';
                    }
                    var a = iElement[0].classList;
                    iElement[0].classList.remove(getTheme(oldValue));
                    addTheme(newValue);
                });
            }
        };
    }]).directive('sortItem', function () {
        "use strict";
        return {
            restrict: 'A',
            template: '<span ng-transclude></span><md-icon class="md-sort-icon" md-svg-icon="arrow-up.svg"></md-icon>',
            replace: false,
            transclude: true,
            link: function (scope, iElement, iAttrs) {
                iElement.bind("click",function() {
                    var classToAdd = iAttrs.sortItem === 'true' ? 'md-asc' : 'md-desc';
                    var classToDelete = iAttrs.sortItem === 'true' ? 'md-desc' : 'md-asc';
                    iElement.children('md-icon')[0].classList.remove(classToDelete);
                    iElement.children('md-icon').addClass(classToAdd);
                });
            }
        };
    }).directive('formErrorValidation', function($q, $timeout, $compile) {
        "use strict";
        return {
            require: 'ngModel',
            transclusion: true,
            restrict: 'A',
            scope: {
                ngModel: '=',
                formErrorValidation: '='
            },
            link: function(scope, elm, attrs, ctrl) {

                var dataArray = angular.copy(eval(scope.formErrorValidation));
                dataArray.splice(dataArray.indexOfName(scope.ngModel), 1);

                ctrl.$asyncValidators[elm[0].name] = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.resolve();
                    }

                    var def = $q.defer();
                    $timeout(function() {
                        if (dataArray.indexOfName(modelValue) === -1) {
                            def.resolve();
                        } else {
                            def.reject();
                        }
                    }, 200);
                    return def.promise;
                };
            }
        };
    }).filter('subString', function() {
        return function(str, start, end) {
            if (str != undefined) {
                return str.substr(start, end);
            }
        }
    }).filter('orderObjectBy', function() {
        var STATUSES_ORDER = {
            'PASSED': 0,
            'FAILED': 1,
            'SKIPPED': 2,
            'IN_PROGRESS': 3,
            'ABORTED': 4
        };
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return field == 'status' ? (STATUSES_ORDER[a[field]] > STATUSES_ORDER[b[field]] ? 1 : -1) : (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    }).filter('isEmpty', [function() {
	  return function(object) {
	    return angular.equals({}, object);
	  }
	}])
    .run(['$rootScope', '$location', '$cookies', '$http',
            function($rootScope, $location, $cookies, $http)
            {
	            $rootScope.$on('$locationChangeStart', function (event, next, current) {
	                // redirect to login page if not logged in and trying to access a restricted page
	                var restrictedPage = $.inArray($location.path(), ['/signin']) === -1;
	                var loggedIn = $rootScope.globals || $cookies.get('Access-Token');
	                if (restrictedPage && !loggedIn)
	                {
	                    $location.path('/signin');
	                }
	            });
            }
      ])
})();
