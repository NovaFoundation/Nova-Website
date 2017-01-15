angular.module("nova").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    if(window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        }).hashPrefix('');
        
        window.history.replaceState(null, null, window.location.pathname.replace(/\/$/, ""));
    }
    
    $urlRouterProvider.otherwise("home");
    
    $stateProvider.state("/", {
        redirectTo: "home"
    });
    
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        data: {
            css: '/home.css'
        }
    });
    
    $stateProvider.state('docs', {
        url: '/docs',
        templateUrl: '/docs/docs.html',
        controller: 'DocsController',
        data: {
            css: '/docs/docs.css'
        }
    });
    
    $stateProvider.state('download', {
        url: '/download',
        templateUrl: '/download.html',
        controller: 'DownloadController',
        data: {
            css: '/download.css'
        }
    });
    
    function addDoc(page, parent) {
        if (page.css) {
            page.data = {
                css: page.css
            };
        }
        
        page.name = 'docs.' + page.url;
        
        $stateProvider.state(page.name, {
            url: '/' + page.url,
            templateUrl: '/docs/' + page.url + '.html',
            controller: page.controller,
            data: page.data,
            parent: parent ? parent.name : undefined
        });
        
        if (page.children) {
            page.children.forEach(function (p) {
                addDoc(p, page);
            });
        }
    }
    
    docsPages.forEach(function (p) {
        addDoc(p, { name: "docs" });
    });
}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on("$stateChangeStart", function (e, state, params, fromState, fromParams) {
        $rootScope.state = {name: state.templateUrl.substring(1, state.templateUrl.length - 5), url: state.url};//state;
        $rootScope.stateParams = params;
        
        $rootScope.$broadcast("stateUpdated");
    });
}]);