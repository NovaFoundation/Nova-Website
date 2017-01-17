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
    
    window.docsPagesMap = {};
    
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
            prefix = current.url + "/" + prefix;
            
            current = current.parent;
        }
        
        page.httpUrl = prefix + page.url;
        page.fullUrl = page.httpUrl.replace(/\//g, ".");
        
        var templatePrefix = prefix;
        
        if (page.children && page.children.length > 0) {
            templatePrefix += page.url + "/";
        }
        
        page.name = "docs." + prefix.replace(/\//g, ".") + page.url;
        page.route = {
            url: '/' + prefix + page.url,
            templateUrl: '/docs/' + templatePrefix + page.url + '.html',
            controller: page.controller,
            data: {
                page: page,
                css: page.css
            },
            parent: "docs"
        };
        
        window.docsPagesMap[page.httpUrl] = page;
        
        $stateProvider.state(page.name, page.route);
        
        if (page.children) {
            page.children.forEach(function (p) {
                addDoc(p, page);
            });
        }
    }
    
    docsPages.forEach(function (p) {
        addDoc(p, { name: "docs", url: "docs" });
    });
    
    for (var url in window.docsPagesMap) {
        var page = window.docsPagesMap[url];
        
        if (page.references) {
            page.references = page.references.map(function (ref) {
                if (typeof ref === 'string') {
                    ref = {
                        url: ref
                    };
                }
                
                var refPage;
                
                if (ref.url[0] == '/') {
                    refPage = window.docsPagesMap[ref.url.substring(1)];
                } else {
                    var prefix = page.parent.fullUrl ? page.parent.fullUrl + "/" : ""
                    
                    refPage = window.docsPagesMap[prefix + ref.url];
                }
                
                if (refPage) {
                    ref.header = ref.header || refPage.header;
                    ref.tooltip = ref.tooltip || refPage.tooltip;
                    ref.url = refPage.name;
                } else if (ref.url[0] == "/") {
                    ref.url = ref.url.substring(1);
                }
                
                return ref;
            });
        }
    }
    
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