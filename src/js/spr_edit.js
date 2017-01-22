$(function () {
    $(".btn-getInfo").on("click", function () {
        Api.getSprInfo({
            sprCode: $("#code").val()
        }, function (data) {
            if (data.code == 0) {
                alert(data.msg);
                return;
            }
            // debugger;
            $("#code").val(data.data.code);
            $("#name").val(data.data.name);
            $("#region").val(data.data.region);
            $("#city").val(data.data.city);
            $("#qtype").val(data.data.type);
            $("#isover")[0].checked = parseInt(data.data.isover) == 0 ? false : true;
        });
    });

    $(".btn-submit").on("click", function () {
        Api.setSprInfo({
            code: $("#code").val(),
            name: $("#name").val(),
            region: $("#region").val(),
            city: $("#city").val(),
            qtype: $("#qtype").val(),
            isover: $("#isover")[0].checked ? 1 : 0,
            ismain: Api.userType.ptl
        }, function (data) {
            // debugger;
            alert(data.msg);
        });
    });
    var url_code = common.getURLParameter("code");
    console.log(url_code);
    if (url_code) {
        $("#code").val(url_code);
        $(".btn-getInfo").click();
    }
});