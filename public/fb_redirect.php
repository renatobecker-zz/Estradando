$requestid=$_GET[request_ids];
if(!empty($requestid)) {
    echo "<script> window.top.location.href='APP URL'; </script>";
}
