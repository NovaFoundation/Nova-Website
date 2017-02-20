angular.module("nova").directive("footnote", ['$templateCache', '$compile', '$state', function ($templateCache, $compile, $state) {
    return {
        restrict: 'E',
        scope: {
            id: "@"
        },
        link: function (scope, elements, attributes) {
            var element = elements[0];
            
            var templateValue;
            var inner = element.innerHTML;
            
            scope.jump = scope.$root.jump;
            
            $state.footnotes = $state.footnotes || {};
            $state.footnoteNumber = $state.footnoteNumber || 1;
            
            if (inner.trim() == "") {
                element.removeAttribute("id");
                
                scope.number = $state.footnoteNumber++;
                
                templateValue = $templateCache.get("/content/templates/footnote-reference.html")[1];
            } else {
                scope.number = $state.footnotes[scope.id].number;
                
                templateValue = $templateCache.get("/content/templates/footnote-content.html")[1];
            }
            
            var template = $compile(templateValue)(scope)[0];
            
            if (inner.trim() != "") {
                var content = template.getElementsByClassName("footnote-content")[0];
                
                content.innerHTML = inner;
                
                element.innerHTML = "";
            }
            
            element.appendChild(template);
            
            $state.footnotes[scope.id] = {
                element: template,
                number: scope.number
            };
        }
    }
}]);