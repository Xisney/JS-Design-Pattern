// 适配器就是将一个接口和另一个接口的适配
// 体感上就是数据转换
var googleMap = {
    show: function () {
        console.log(1);
    }
};
var baiduMap = {
    display: function () {
        console.log(2);
    }
};
function render(fn) {
    fn.show();
}
function adapter(fn) {
    return {
        show: function () {
            fn.display();
        }
    };
}
// 适配百度地图的api，以适配项目代码
render(googleMap);
render(adapter(baiduMap));
