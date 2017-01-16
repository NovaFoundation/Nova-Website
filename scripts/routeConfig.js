angular.module("nova").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    if(window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        }).hashPrefix('');
        
        window.originalPathname = window.originalPathname.replace(/\/$/, "");
        window.history.replaceState(null, null, window.originalPathname + window.originalQueryString + window.originalHash);
        
        window.originalPathname = null;
        window.originalQueryString = null;
        window.originalHash = null;
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
        abstract: true,
        templateUrl: '/docs/docs.html',
        controller: 'DocsController',
        data: {
            css: '/docs/docs.css'
        }
    }).state('docs.home', {
        url: '',
        templateUrl: '/docs/home.html',
    });
    
    $stateProvider.state('download', {
        url: '/download?version',
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
        
        page.parent = parent;
        
        var prefix = "";
        var current = parent;
        
        while (current && current.parent) {
            console.log(current)
            prefix = current.url + "/" + prefix;
            
            current = current.parent;
        }
        
        page.fullUrl = prefix.replace(/\//g, ".") + page.url;
        
        var templatePrefix = prefix;
        
        if (page.children && page.children.length > 0) {
            templatePrefix += page.url + "/";
        }
        
        page.name = "docs." + prefix.replace(/\//g, ".") + page.url;
        
        $stateProvider.state(page.name, {
            url: '/' + prefix + page.url,
            templateUrl: '/docs/' + templatePrefix + page.url + '.html',
            controller: page.controller,
            data: {
                page: page
            },
            parent: "docs"
        });
        
        if (page.children) {
            page.children.forEach(function (p) {
                addDoc(p, page);
            });
        }
    }
    
    docsPages.forEach(function (p) {
        addDoc(p, { name: "docs", url: "docs" });
    });
    
    $stateProvider.state("docs.hello-world", {
        url: '/getting-started/hello-world',
        redirectTo: "docs.getting-started.hello-world",
        parent: "docs"
    });
}]).run(['$rootScope', function ($rootScope) {
    function urlUpdated() {
        updateQueryParams();
        console.log("updateing " + window.location.href);
        $rootScope.$safeApply(function () {
            $rootScope.$broadcast("urlUpdated");
        });
    }
    
    window.onpopstate = function (event) {
        if (event.state) {
            // history changed because of pushState/replaceState
        } else {
            // history changed because of a page load
        }
        
        urlUpdated();
    };
    
    $rootScope.$on("$stateChangeStart", function (e, state, params, fromState, fromParams) {
        $rootScope.state = {name: state.templateUrl ? state.templateUrl.substring(1, state.templateUrl.length - 5) : null, url: state.url, state: state};//state;
        $rootScope.stateParams = params;
    });
    
    $rootScope.$on("$stateChangeSuccess", function (e, state, params, fromState, fromParams) {
        if (fromState.url == "^") {
            // window.history.replaceState(null, null, window.originalPathname + window.originalQueryString);
        } else {
            urlUpdated();
        }
        
        $rootScope.$broadcast("stateUpdated");
    });
    
    $rootScope.$on("$viewContentLoaded", function () {
        $rootScope.stateParams = $rootScope.stateParams || {};
        
        var hash = $rootScope.stateParams["#"] || window.originalHash || window.location.hash;
        
        if (hash) {
            hash = hash[0] != '#' ? "#" + hash : hash
            
            var element = document.getElementById(hash.substring(1));
            
            if (element) {
                flash(hash.substring(1));
            }
        }
    });
}]);