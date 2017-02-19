angular.module("nova").directive("share", ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict: 'A',
        scope: {
            url: "@"
        },
        link: function (scope, elements, attributes) {
            scope.url = encodeURIComponent(scope.url);
            
            var template = $compile($templateCache.get("/content/templates/share.html")[1])(scope)[0];
            
            template.addEventListener("click", function (e) {
                e.stopPropagation();
            });
            
            document.body.appendChild(template);
            
            function close(e) {
                template.classList.remove("active");
                
                document.removeEventListener("click", close);
            }
            
            elements[0].addEventListener("click", function (e) {
                template.classList.add("active");
                
                template.getElementsByClassName("url")[0].select();
                
                e.stopPropagation();
                
                document.addEventListener("click", close);
            });
        }
    }
}]);