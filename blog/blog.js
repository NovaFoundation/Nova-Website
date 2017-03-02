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
    header: "Writing Target-Specific Code",
    url: "target-specific-code",
    date: "2/20/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Zero-Cost Primitive Generics",
    url: "zero-cost-primitive-generics",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/21/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Thread-Local Storage",
    url: "thread-local-storage",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/22/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Nova Won't Have Yield",
    url: "no-yield",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/23/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Nova Exception Handling",
    url: "exception-handling",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/24/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Automated API Importing",
    url: "automated-api-importing",
    css: "/Shared/styles/flow-boxes.css",
    date: "2/25/2017",
    // author: "Braden Steffaniak"
}, {
    header: "v0.3.7 Release Notes",
    url: "v0_3_7-release-notes",
    date: "2/26/2017",
    // author: "Braden Steffaniak"
}, {
    header: "First-Class Functions",
    url: "first-class-functions",
    date: "2/27/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Runtime Module Loading",
    url: "runtime-module-loading",
    date: "2/28/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Scalable Compiler Components",
    url: "scalable-compiler-components",
    css: ["/Shared/styles/flow-boxes.css", "/blog/scalable-compiler-components.css"],
    date: "3/1/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Nova Path Forward",
    url: "path-forward",
    css: ["/Shared/styles/flow-boxes.css", "/blog/path-forward.css"],
    date: "3/2/2017",
    author: "Braden Steffaniak"
}, {
    header: "v0.3.8 Release Notes",
    url: "v0_3_8-release-notes",
    date: "3/5/2017",
    visible: false,
    // author: "Braden Steffaniak"
}];

angular.module("nova").controller("BlogController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.pages = blogPages.filter(function (page) {
        return page.visible !== false;
    });
    
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