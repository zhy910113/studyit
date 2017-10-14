define(function () {
    return {
        getUrl: function () {
            // console.log(location.search.slice(1));
            var arr = location.search.slice(1).split("&")
            var obj = {}
            for (var i = 0; i < arr.length; i++) {
                obj[arr[i].split("=")[0]] = arr[i].split("=")[1]
            }
            return obj
        },
        getId: function(id) {
            return this.getUrl()[id]
        }
    }
})
