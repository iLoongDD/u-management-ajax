
//获取列表
(function() {
  queryList();
})();

//查找
$(".find").click(function(){
  var pram = $("#filterForm").serializeArray();
  queryList(pram);
});

//删除
$(".j-userTable").on("click",".delete",function(){
  var _this = this;
  var speak=confirm("确定删除该条数据吗？");
  if (speak==true){
    //window.location.href = "/del?id="+ $(this).attr("_id");
    $.ajax({
      url: "/api/del?id="+ $(this).attr("_id"),
      dataType: "json",
      success: function(data){
        if(data.flag){
          $(_this).parents("tr").remove();
        }else{
          alert("删除失败，请待会重试");
        }
      }
    })
  }
});

//增加
$(".j-addButton").click(function(){
  var person = $("#addForm").serialize();
  $.ajax({
    url: "/api/add",
    data: person,
    type: 'post',
    dataType: "json",
    success: function (data) {
      if (data.flag) {
        queryList();
        $("#addDialog").modal("hide");
      } else {
        alert("增加失败，请待会重试");
      }
    }
  })
});

//更新
(function(){
  var id;
  $(".j-userTable").on("click",".update",function(){
    var _this = this;
    $("#updateDialog").modal("show");
    id = $(_this).attr("_id");
    $.ajax({
      url:"/api/rewrite?id=" + id,
      type: 'post',
      dataType: "json",
      success: function (data) {
        if(data.flag) {
          $("#updateForm input[type=text]:first").val(data.item[0].name);
          $("#updateForm input[type=text]:eq(1)").val(data.item[0].sex);
          $("#updateForm input[type=text]:eq(2)").val(data.item[0].age);
          $("#updateForm input[type=text]:last").val(data.item[0].tel);

        }
      }
    });
  });
  //
  $(".j-updateButton").click(function(){
    var person = $("#updateForm").serialize();
    $.ajax({
      url:"/api/update?id="+ id,
      data: person,
      type: 'post',
      dataType: "json",
      success: function (data) {
        if (data.flag) {
          window.location.reload();
          $("#updateDialog").modal("hide");
        } else {
          alert("更新失败，请待会重试");
        }
      }
    })
  });
})();

//函数获取数据
function queryList(pram){
  var _pram = pram || {};
  $.ajax({
    url: "/api/edit",
    type: "get",
    dataType: "json",
    data: _pram,
    success: function(data){
      if(data.flag){
        var html = "";
        if(!data.item.length){
          html =  '<h2  style="text-align: center; margin-top: 100px;">'+'暂时无相关记录，请点击添加'+'</h2>'
          $(".j-userTable tbody").empty();
          $(".j-userTable").after(html);
        }else{
          for(var i= 0; i<data.item.length;i++ ){
            html += '<tr>'+
                '<td>'+data.item[i].name+'</td>'+
                '<td>'+data.item[i].sex+'</td>'+
                '<td>'+data.item[i].age+'</td>'+
                '<td>'+data.item[i].tel+'</td>'+
                '<td class="text-center">'+
                '<a href="javascript:;" class="delete" _id="'+data.item[i]._id+'"> <input type="button" class="btn btn-style" value="删除"></a>&nbsp;&nbsp;'+
                '<a href="javascript:;" class="update" _id="'+data.item[i]._id+'" > <input type="button" class="btn btn-style " value="更新"></a>'+
                '</td>'+
                '</tr>'
            $(".j-userTable tbody").empty().append(html);
          }
        }
      }else{
        alert("数据加载失败");
      }
    }
  })
}

