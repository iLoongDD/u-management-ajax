
// 监听返回事件
window.onpopstate = function () {
  urlQuery();
};

// 获取列表
(function () {
  urlQuery();
})();

// 查找
$('.find').click(function () {
  const pram = $('#filterForm').serializeArray();
  const query = $('#filterForm').serialize();
  const url =  window.location.href.split('?')[0];
  queryList(pram);
  window.history.pushState({}, '', url + '?' + encodeURI(query));
});

// 删除
$('.j-userTable').on('click', '.delete', function() {
  const _this = this;
  const speak = confirm('确定删除该条数据吗？');
  if (speak === true) {
    // window.location.href = '/del?id='+ $(this).attr('_id');
    $.ajax({
      url: '/api/del',
      data: {
        id: $(this).attr('_id'),
      },
      dataType: 'json',
      success: function(data){
        if (data.flag){
          $(_this).parents('tr').remove();
        } else {
          alert('删除失败，请待会重试');
        }
      },
    });
  }
});

// 增加
$('.j-addButton').click(function() {
  const person = $('#addForm').serialize();
  $.ajax({
    url: '/api/add',
    data: person,
    type: 'post',
    dataType: 'json',
    success: function (data) {
      if (data.flag) {
        alert('添加成功');
        queryList();
        $('#addDialog').modal('hide');
      } else {
        let html = '';
        data.msg.errors.name && (html += '请填写姓名.');
        data.msg.errors.age && (html += '年龄必须在7-45之间.');
        data.msg.errors.sex && (html += '性别只能是男或女.');
        data.msg.errors.tel && (html += '请填写正确的号码.');
        alert(html);
      }
    },
  });
});

// 更新
(function() {
  let id;
  $('.j-userTable').on('click','.update',function() {
    const  _this = this;
    $('#updateDialog').modal('show');
    id = $(_this).attr('_id');
    $.ajax({
      url:'/api/rewrite?id=' + id,
      type: 'post',
      dataType: 'json',
      success: function (data) {
        if(data.flag) {
          $('#updateForm input[type=text]:first').val(data.item[0].name);
          $('#updateForm input[type=text]:eq(1)').val(data.item[0].sex);
          $('#updateForm input[type=text]:eq(2)').val(data.item[0].age);
          $('#updateForm input[type=text]:last').val(data.item[0].tel);

        }
      },
    });
  });
  //
  $('.j-updateButton').click(function () {
    const person = $('#updateForm').serialize();
    $.ajax({
      url: '/api/update?id=' + id,
      data: person,
      type: 'post',
      dataType: 'json',
      success: function (data) {
        if (data.flag) {
          queryList();
          $('#updateDialog').modal('hide');
        } else {
          alert('更新失败，请待会重试');
        }
      },
    });
  });
})();

// 函数获取数据
function queryList(pram) {
  $.ajax({
    url: '/api/edit',
    type: 'get',
    dataType: 'json',
    data: pram,
    success: function (data) {
      if(data.flag) {
        var html = '';
        if(!data.item.length) {
          html =  '<h2  style="text-align: center; margin-top: 100px;">' + '暂时无相关记录，请点击添加'+'</h2>'
          $('.j-userTable tbody').empty();
          $('.container-table .tips').empty().prepend(html);
        } else {
          for (let i = 0; i < data.item.length; i++) {
            html += '<tr>' +
                '<td>' + data.item[i].name + '</td>' +
                '<td>' + data.item[i].sex + '</td>' +
                '<td>' + data.item[i].age + '</td>' +
                '<td>' + data.item[i].tel + '</td>' +
                '<td class="text-center">' +
                '<a href="javascript:;" class="delete" _id="' + data.item[i]._id+'"> <input type="button" class="btn btn-style" value="删除"></a>&nbsp;&nbsp;'+
                '<a href="javascript:;" class="update" _id="' + data.item[i]._id+'" > <input type="button" class="btn btn-style " value="更新"></a>' +
                '</td>' +
                '</tr>'
            $('.j-userTable tbody').empty().prepend(html);
          }
        }
      } else {
        alert('数据加载失败');
      }
    },
  });
};


// 获取URL参数的函数
function GetQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null){
    return decodeURI(unescape(r[2]));
  }
  return null;
}

// URL查询函数
function urlQuery(){
  var pram = {},
      _name = GetQueryString('name'),
      _sex = GetQueryString('sex'),
      _age = GetQueryString('age'),
      _tel = GetQueryString('tel');

  $('#filterForm input[name=name]').val(_name);
  $('#filterForm input[name=sex]').val(_sex);
  $('#filterForm input[name=age]').val(_age);
  $('#filterForm input[name=tel]').val(_tel);

  if(_name) {
    pram.name = _name;
  }
  if(_sex) {
    pram.sex = _sex;
  }
  if(_age) {
    pram.age = _age;
  }
  if(_tel) {
    pram.tel = _tel;
  }
  queryList(pram);
}
