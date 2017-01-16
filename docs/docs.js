window.docsPages = [{
    header: "CLASS TYPES",
    url: "class-types",
    children: [{
        header: "Somthigs ssssss ssssssssssssn TYPES",
        url: "something",
        children: [{
            header: "HYE",
            url: "hey"
        }]
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
        url: "lists"
    }]
}, {
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
}];

angular.module("nova").controller("DocsController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.sharePage = function (page) {
        page = page || $scope.page;
        
        alert("sharing " + page.header);
    };
    
    $scope.pages = docsPages;
    
    function close(page) {
        page.selected = false;
        page.open = false;
        
        if (page.children) {
            page.children.forEach(close);
        }
    }
    
    $scope.pages.forEach(close);
    
    function stateUpdated() {
        var url = $rootScope.state.url.substring(1);
        
        $scope.page = $rootScope.state.state.data.page;
        
        var current = $scope.page;
        
        if (current) {
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