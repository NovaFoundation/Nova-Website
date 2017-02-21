window.blogPages = [{
    header: "Nova Compiler Design",
    url: "compiler-design",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/18/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Multiple Targets",
    url: "multiple-targets",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/19/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Writing Target Specific Code",
    url: "target-specific-code",
    date: "2/20/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Zero-cost Primitive Generics",
    url: "zero-cost-primitive-generics",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/21/2017",
    // author: "Braden Steffaniak"
}/*{
    header: "Automated API Importing",
    url: "automated-api-importing",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/20/2017",
    // author: "Braden Steffaniak"
}*/];

angular.module("nova").controller("BlogController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.pages = blogPages;
    
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