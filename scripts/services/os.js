angular.module("nova").service("$os", [function () {
    this.os = jscd.os;
    this.osVersion = jscd.osVersion;
    this.lowerOs = this.os.toLowerCase();
    
    
}]);