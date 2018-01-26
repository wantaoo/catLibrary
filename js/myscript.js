
$('.collapsible').collapsible();


$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, 
      gutter:0, 
      belowOrigin:true, 
      alignment: 'right' 
    }
  );

$.ajax({
  type:"get",
  url:"cat.json",
  dataType:"json",
  async: true,
  success:function(result){
    // $.each(result,function(index1,obj1){
    //   var arr=[1,2,3];
    //   var num =$(".pagination .active a").html();
    //   var newnum =num-1;
    //   $("#contentList").append("<div class='col m4 s12 fix-heig filtr-item' data-category='"+obj1.category+"'><div class='card hoverable'><div class='card-image'><img src='"+obj1.img+"'></div><div class='card-content'><h4>"+obj1.name+"</h4><p>"+obj1.info+"</p><div class='card-action'><div class='row'><div class='col s6'>体型：<span class='bodychoose'>"+obj1.body+"</span></div><div class='col s6'>毛长：<span>"+obj1.fur+"</span></div></div><div class='row'><div class='col s6'>价格：<span>"+obj1.price+"</span></div><div class='col s6'>体重：<span>"+obj1.weight+"</span></div></div></div></div></div></div>")
    // })
    res=result;


    // $(".fix-heig").css("display","none");
    // for(var i=0;i<9;i++){
    //   $(".fix-heig").eq(i).css("display","block");
    // }
    // $(".page").bind("click",function(){
    //   $(".fix-heig").css("display","none");
    //   $(".page").removeClass("active");
    //   $(this).addClass("active");
    //   var ht =$(this).find("a").html();
    //   for(var i=9*(ht-1);i<9+9*(ht-1);i++){
    //     $(".fix-heig").eq(i).css("display","block");
    //   }
    // })
    // $(".hoveNext").bind("click",function(){
    //   $(".fix-heig").css("display","none");
    //   $(".pagination .active").removeClass("active").next(".page").addClass("active");
    //   var ht =$(".pagination .active").find("a").html();
    //   for(var i=9*(ht-1);i<9+9*(ht-1);i++){
    //     $(".fix-heig").eq(i).css("display","block");
    //   }
    //   if(!$(".pagination .active").length>0){
    //     alert("到头了！");
    //     for(var i=0;i<9;i++){
    //       $(".fix-heig").eq(i).css("display","block");
    //     }
    //     $(".page").eq(0).addClass("active")
    //   }
    // })
    // $(".hoveLeft").bind("click",function(){
    //   $(".fix-heig").css("display","none");
    //   $(".pagination .active").removeClass("active").prev(".page").addClass("active");
    //   var ht =$(".pagination .active").find("a").html();
    //   for(var i=9*(ht-1);i<9+9*(ht-1);i++){
    //     $(".fix-heig").eq(i).css("display","block");
    //   }
    //   if(!$(".pagination .active").length>0){
    //     alert("到头了！");
    //     for(var i=0;i<9;i++){
    //       $(".fix-heig").eq(i).css("display","block");
    //     }
    //     $(".page").eq(0).addClass("active")
    //   }
    // })
  }

})


var umService = angular.module('myApp', ['ngRoute']);
umService.config(
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/'
      }) 
      .when('/get/:id', {
        controller: ListController,
        templateUrl: "list.html"
      }) 
      .otherwise({
        redirectTo: '/'
      });
  }
)


umService.controller("mycat",function($scope,$http){
  $http.get('cat.json').success(function(data){
    $scope.leng=data.length;
  });

  $scope.username="";
  $scope.userplace="登录";
  $scope.userInfo="";
  $scope.passInfo="";

  $scope.loginIn=function(){
    $scope.userInfo="";
    $http.get('login.json').success(function(data){
      for(var i=0;i<data.length;i++){
        if($scope.username==data[i].user){
          if($scope.password==data[i].pass){
            $('#login').modal('close');
            $scope.userplace=$scope.username;
          }else if($scope.password=="" || !$scope.password){
              $scope.passInfo="请输入密码！";
          }else {
              $scope.passInfo="密码错误！";
          }
        }
      }
      var turnOff = false;
      for(var i=0;i<data.length;i++){
        if($scope.username==data[i].user){
          turnOff=true;
        }
      }
      if(turnOff==false){
        $scope.userInfo="用户名不存在！";
      }



    });
  }

  // $scope.startsel=function(e){
  //   var keycode=window.event?e.keyCode:e.which;
  //   if(keycode==13){
  //     $http.get('cat.json').success(function(data){
  //       for(var i=0;i<data.length;i++){
  //         if(data[i].name==$scope.searchval){
  //           var st =data[i].name;
  //           $("#cooltab").css("display","none");
  //           $(".fix-heig").css("display","none");
  //           $(".pagination").css("display","none");
  //           $(".aaa").css("display","none")
  //           $(".fix-heig:contains('"+st+"')").css("display","block")
  //         }
  //       }
  //     })
  //   }
  // }
})

function ListController($scope, $http, $routeParams) {
  var id = $routeParams.id-1;
  $http.get('test.json').success(function (data) {
    $scope.item = data[id];
  });
}



// num=0;
// function filter(sel,id){
//   if(!$("#"+id).is(":checked")){
//     num+=1;
//     $(".newdot").css("display","none");
//     $(".pagination").css("display","none");
//     for(var i=0;i<res.length;i++){
//       if(res[i].body==sel || res[i].fur==sel){
//         $("#contentList").append("<div class='col m4 s12 fix-heig aaa'><div class='card hoverable'><div class='card-image'><img src='"+res[i].img+"'></div><div class='card-content'><h4>"+res[i].name+"</h4><p>"+res[i].info+"</p><div class='card-action'><div class='row'><div class='col s6'>体型：<span class='bodychoose'>"+res[i].body+"</span></div><div class='col s6'>毛长：<span>"+res[i].fur+"</span></div></div><div class='row'><div class='col s6'>价格：<span>"+res[i].price+"</span></div><div class='col s6'>体重：<span>"+res[i].weight+"</span></div></div></div></div></div></div>")

//       }
//     }
//     checkres();
//   }else{
//     num-=1
//     $(".newdot").css("display","none");
//     $(".aaa:contains('"+sel+"')").remove();
//     $(".pagination").css("display","none");
//     checkres();
//   }
//   if(num>0){
//     $("#cooltab").css("display","none");
//   }
//   if(num==0){
//     $("#cooltab").css("display","block");
//   }
//   console.log(num)
// }

// var checkres=function(){ 
//   var isChecked = false; 
//   $(".check").each( 
//     function(){ 
//       if(($(".check:checked").length+1 == $(".check").length) || ($(".check:checked").length == 1)){
//         for(var i=0;i<9;i++){
//           $(".fix-heig").eq(i).css("display","block");
//         }
//         $(".pagination").css("display","block");
//         $(".aaa").css("display","none")
//       }else{
//         $(".aaa").css("display","block")
//       }
//     }) 
//     return isChecked; 
//   }

