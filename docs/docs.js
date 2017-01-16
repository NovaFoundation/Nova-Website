window.docsPages = [{
    header: "Class types",
    url: "class-types",
    children: [{
        header: "Classes",
        url: "classes",
        references: [{
            header: "Traits",
            url: "docs.class-types.traits"
        }, {
            header: "Interfaces",
            url: "docs.class-types.interfaces"
        }],
        children: []
    }, {
        header: "Interfaces",
        url: "interfaces",
        references: [{
            header: "Traits",
            url: "docs.class-types.traits"
        }, {
            header: "Classes",
            url: "docs.class-types.classes"
        }],
        children: []
    }, {
        header: "Traits",
        url: "traits",
        references: [{
            header: "Classes",
            url: "docs.class-types.classes"
        }, {
            header: "Interfaces",
            url: "docs.class-types.interfaces"
        }],
        children: []
    }]
}, {
    header: "Data structures",
    url: "data-structures",
    references: [{
        header: "Lists",
        url: "docs.data-structures.lists"
    }],
    children: [{
        header: "Lists",
        url: "lists",
        references: [{
            header: "Arrays",
            url: "docs.data-structures.arrays"
        }]
    }, {
        header: "Arrays",
        url: "arrays",
        references: [{
            header: "Lists",
            url: "docs.data-structures.lists"
        }]
    }]
}, {
    header: "Getting started",
    url: "getting-started",
    children: [{
        header: "Configure environment",
        url: "configure-environment",
        controller: "ConfigureEnvironmentController",
        css: "/docs/getting-started/configure-environment.css",
        references: [],
        children: []
    }, {
        header: "Hello world",
        url: "hello-world",
        references: [{
            header: "Downloading nova",
            url: "download({ '#': 'downloads' })"
        }, {
            header: "Installing nova",
            url: "download({ '#': 'installation' })"
        }, {
            header: "Setting environment variables",
            url: "download({ '#': 'environment-variables' })"
        }],
        children: []
    }]
}];

angular.module("nova").controller("DocsController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.sharePage = function (page) {
        page = page || $scope.page;
        
        alert("sharing " + page.header);
    };
    
    $scope.pages = docsPages;
    
    function recursiveApply(func) {
        function action(page) {
            func(page);
            
            if (page.children) {
                page.children.forEach(action);
            }
        }
        
        $scope.pages.forEach(action);
    }
    
    recursiveApply(function (page) {
        page.selected = false;
        page.open = false;
    });
    
    function stateUpdated() {
        var url = $rootScope.state.url.substring(1);
        
        $scope.page = $rootScope.state.state.data.page;
        
        var current = $scope.page;
        
        if (current) {
            recursiveApply(function (page) {
                page.selected = false;
            });
    
            current.selected = true;
            
            while (current) {
                current.open = true;
                
                current = current.parent;
            }
        }
    }
    
    stateUpdated();
    
    $rootScope.$on("stateUpdated", stateUpdated);
}]);