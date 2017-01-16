angular.module("nova").directive("treeBrowser", [function () {
    return {
        restrict: 'E',
        scope: {
            data: "=",
            urlPrefix: "@?",
            root: "=?"
        },
        link: function (scope, elements, attributes) {
            scope.urlPrefix = scope.urlPrefix || "";
            
            if (!scope.root) {
                scope.root = {};
            }
            
            scope.data.forEach(function (item) {
                item.listeners = item.listeners || [];
                item.listeners.push(scope);
                
                item.toggle = item.toggle || function (link) {
                    scope.toggle(item, link);
                };
                
                if (item.selected) {
                    scope.root.selected = item;
                }
            });
            
            scope.toggle = function (page, link) {
                if (!page.open || !link || scope.root.selected == page) {
                    page.open = !page.open;
                }
                
                if (link) {
                    if (scope.root.selected && scope.root.selected != page) {
                        scope.root.selected.selected = false;
                    }
                    
                    if (page.open) {
                        page.selected = true;
                        
                        scope.root.selected = page;
                    }
                }
            };
        },
        templateUrl: "/content/templates/treeBrowser.html"
    };
}]);