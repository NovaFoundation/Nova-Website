angular.module("nova").service("$os", [function () {
    var self = this;
    
    this.os = jscd.os;
    this.osVersion = jscd.osVersion;
    this.lowerOs = this.os.toLowerCase();
    
    if (this.lowerOs.indexOf("mac") == 0) {
        this.lowerOs = "mac";
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
            extension: ".dmg"
        }, 
        linux: {
            name: "Linux",
            key: "linux",
            extension: ""
        }
    };
    
    this.currentOs = this.oses[this.lowerOs];
    
    this.osArray = Object.keys(this.oses).map(function (key) {
        return self.oses[key];
    });
}]);