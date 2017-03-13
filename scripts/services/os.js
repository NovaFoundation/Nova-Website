angular.module("nova").service("$os", [function () {
    var self = this;
    
    this.os = jscd.os;
    this.osVersion = jscd.osVersion;
    this.lowerOs = this.os.toLowerCase();
    
    if (!this.osHeader) {
        this.osHeader = this.os + (this.osVersion.trim() ? " " + this.osVersion : "");
    }
    
    if (this.lowerOs.indexOf("mac") == 0) {
        this.lowerOs = "mac";
    }
    
    this.oses = {
        windows: {
            name: "Windows",
            key: "windows",
            extension: ".exe",
            filename: "NovaInstaller",
            stableVersions: [],
            betaVersions: ["0.3.0", "0.3.3", "0.3.4", "0.3.5", "0.3.6", "0.3.7", "0.3.8"]
        }, 
        mac: {
            name: "Mac OS X",
            key: "mac",
            extension: ".dmg",
            filename: "Nova",
            stableVersions: [],
            betaVersions: ["0.3.2", "0.3.3", "0.3.4", "0.3.5", "0.3.6", "0.3.7", "0.3.8"]
        }, 
        linux: {
            name: "Linux",
            key: "linux",
            extension: ".deb",
            filename: "nova",
            stableVersions: [],
            betaVersions: ["0.3.5", "0.3.6", "0.3.7", "0.3.8"]
        }
    };
    
    this.currentOs = this.oses[this.lowerOs];
    
    this.osArray = Object.keys(this.oses).map(function (key) {
        return self.oses[key];
    });
}]);