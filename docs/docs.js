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
    header: "HELLO WORLD",
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
        } else {
            function close(page) {
                page.selected = false;
                page.open = false;
                
                if (page.children) {
                    page.children.forEach(close);
                }
            }
            
            $scope.pages.forEach(close);
        }
    }
    
    stateUpdated();
    
    $rootScope.$on("stateUpdated", stateUpdated);
}]);