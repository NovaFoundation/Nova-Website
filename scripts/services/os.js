angular.module("nova").service("$os", [function () {
    this.os = jscd.os;
    this.osVersion = jscd.osVersion;
    this.lowerOs = this.os.toLowerCase();
    
    }
    
    this.oses = {
        windows: {
            name: "Windows",
            key: "windows",
            extension: ".exe"
        }, 
        mac: {
            name: "Mac OS X",
            key: "mac",
            extension: ""
        }, 
        linux: {
            name: "Linux",
            key: "linux",
            extension: ""
        }
    };
    
    this.currentOs = this.oses[this.lowerOs];
}]);