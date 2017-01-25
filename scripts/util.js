/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

function getQueryParams() {
    var queryParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       queryParams[d(e[1])] = d(e[2]);

    return queryParams;
}

function getQueryString(params) {
    var url = "";
    
    var index = 0;
    
    Object.keys(params).forEach(function (key) {
        var value = params[key];
        
        if (value) {
            if (index++ > 0) {
                url += "&";
            }
            
            url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    });
    
    return url;
}

function updateQueryParams() {
    window.queryParams = getQueryParams();
}

updateQueryParams();

window.originalPathname = window.location.pathname;
window.originalQueryString = window.location.search;
window.originalQueryParams = window.queryParams;
window.originalHash = window.location.hash;

function jump(h, changeUrl) {
    if (changeUrl !== false) {
        var url = location.href;               //Save down the URL without hash.
        location.href = "#" + h;                 //Go to the target element.
        history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
    } else {
        var element = document.getElementById(h);
        
        if (element) {
            element.scrollIntoView(true);
        }
    }
    
    return flash(h);
}

function flash(id) {
    var element = document.getElementById(id);
    
    if (element) {
        element.classList.remove("flash");
        
        element.timeoutId = setTimeout(function () {
            element.classList.add("flash");
        });
    }
    
    return element;
}

window.addEventListener("load", function () {
    function checkHash() {
        if (window.location.hash && document.getElementById(window.location.hash.substring(1))) {
            var element = document.getElementById(window.location.hash.substring(1));
            
            element.classList.remove("flash");
            element.classList.add("flash");
        }
    }
    
    checkHash();
    
    window.addEventListener("hashchange", checkHash, false);
});

(function( $ ) {
    $.fn.prettyPre = function( method ) {

        var defaults = {
            ignoreExpression: /\s/ // what should be ignored?
        };

        var methods = {
            init: function( options ) {
                this.each( function() {
                    var context = $.extend( {}, defaults, options );
                    var $obj = $( this );
                    var usingInnerText = true;
                    var text;//$obj.get( 0 ).innerText;

                    // some browsers support innerText...some don't...some ONLY work with innerText.
                    if ( typeof text == "undefined" ) {
                        text = $obj.html();
                        usingInnerText = false;
                    }

                    // use the first line as a baseline for how many unwanted leading whitespace characters are present
                    var superfluousSpaceCount = 0;
                    var pos = 0;
                    var currentChar = text.substring( 0, 1 );

                    while ( context.ignoreExpression.test( currentChar ) ) {
                        if(currentChar !== "\n"){
                            superfluousSpaceCount++;
                        }else{
                            superfluousSpaceCount = 0;
                        }

                        currentChar = text.substring( ++pos, pos + 1 );
                    }

                    // split
                    var parts = text.split( "\n" );
                    var reformattedText = "";

                    // reconstruct
                    var length = parts.length;
                    for ( var i = 0; i < length; i++ ) {

                        // remove leading whitespace (represented by an empty string)
                        if(i === 0 && parts[0]=== ""){
                            continue;   
                        }

                        // cleanup, and don't append a trailing newline if we are on the last line
                        reformattedText += parts[i].substring( superfluousSpaceCount ) + ( i == length - 1 ? "" : "\n" );
                    }

                    // modify original
                    if ( usingInnerText ) {
                        $obj.get( 0 ).innerText = reformattedText;
                    }
                    else {
                        // This does not appear to execute code in any browser but the onus is on the developer to not 
                        // put raw input from a user anywhere on a page, even if it doesn't execute!
                        $obj.html(reformattedText);
                    }
                } );
            }
        }

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        }
        else if ( typeof method === "object" || !method ) {
            return methods.init.apply( this, arguments );
        }
        else {
            $.error( "Method " + method + " does not exist on jQuery.prettyPre." );
        }
    }
} )( jQuery );

if (!Array.prototype.first){
    Array.prototype.first = function(){
        return this[0];
    };
};

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

if (!Array.prototype.pushUnique){
    Array.prototype.pushUnique = function (value) {
        if (this.indexOf(value) < 0) {
            return this.push(value);
        }
    };
};