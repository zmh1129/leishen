<?php
    header("Content-type:text/html;charset=utf-8");
    //将数据取出，检查内容
    // var_dump($_POST); //从响应那看数据
    // 输出array(4) {
    //     ["username"]=>
    //     string(0) ""
    //     ["password"]=>
    //     string(0) ""
    //     ["repassword"]=>
    //     string(0) ""
    //     ["createTime"]=>
    //     string(13) "1599635791253"
    //   }

    //分析模拟官方的返回，生成对应的内容
   $responseData = array("code" => 0, "msg" => "");
//    数据取出
   $username = $_POST["username"];//取出键值
   $password = $_POST["password"];//取出键值
   $repassword = $_POST["repassword"];//取出键值
   $createtime = $_POST["createtime"];//取出键值
    
  //初步的判断
    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = "！用户名不能为空";
        echo json_encode($responseData);
        exit;
    }

    if(strlen($username) > 18 || strlen($username) < 3){
      $responseData['code'] = 7;
      $responseData['msg'] = "！用户名必须在3到16个字符范围内";
      echo json_encode($responseData);
      exit;
    }

    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = "！密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if( strlen($password) < 5){
      $responseData['code'] = 6;
      $responseData['msg'] = "！密码至少为5个字符";
      echo json_encode($responseData);
      exit;
    }

    if($repassword !== $password){
        $responseData['code'] = 3;
        $responseData['msg'] = '！两次输入的密码不一致';
        echo json_encode($responseData);
        exit;
    }

    //验证数据库是否有同名的用户
  //1、链接数据库
    $link = mysql_connect("127.0.0.1", "root", "123456");

  //2、判断数据库是否链接成功
    if(!$link){
        $responseData['code'] = 4;
        $responseData['msg'] = "！服务器忙";
        echo json_encode($responseData);
        exit;
    }

  //3、设置访问字符集
    mysql_set_charset('utf8');

  //4、选择数据库
    mysql_select_db('qd2004');

  //5、准备sql语句(拿到符合条件的数据)
    $sql = "SELECT * FROM leishen WHERE username = '{$username}'";
    // echo $sql; //输出一下，看一下sql拼接的对不对

  //6、发送sql语句
    $res = mysql_query($sql);

  //7、取出一行
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["code"] = 5;
        $responseData["msg"] = "！用户名已存在";
        echo json_encode($responseData);
        exit;
    }

    $password = md5(md5(md5($password)."qingdao")."zmh");

  //注册
    $sql2 = "INSERT INTO leishen(username,password,createtime) VALUES('{$username}','{$password}',{$createtime})";

    $res = mysql_query($sql2);

    if(!$res){
        $responseData['code'] = 6;
        $responseData['msg'] = "！注册失败";
        echo json_encode($responseData);
        exit;
    }

    $responseData["msg"] = "√注册成功";
    echo json_encode($responseData);

    //8、关闭数据库
    mysql_close($link);
      

?>