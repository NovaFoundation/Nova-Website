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
            
            scope.fbShare = function(url, title, descr, winWidth, winHeight) {
                var winTop = (screen.height / 2) - (winHeight / 2);
                var winLeft = (screen.width / 2) - (winWidth / 2);
                
                title = title || "";
                descr = descr || "";
                
                window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
            };
        }
    }
}]);