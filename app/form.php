<?php
// the message
$service = ($_POST['service']);
$name = ($_POST['name']);
$email = ($_POST['email']);
$mobile = ($_POST['phoneNumber']);
$projectDetails = ($_POST['projectDetails']);
$hearAboutus = ($_POST['hearAboutus']);

$to = "business@rillusion.com";

$subject = "[rillusion.com form] Enquire by ". $name." for $service[0]";

$msg = "<html><body style='font-family:Lato,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Enquire for rillusion.com</h2>\r\n";
$msg .= "<table width='600' border='0' align='left' cellpadding='0' cellspacing='0' bgcolor='#FFF' style='font-weight: 700;font-size: 12px;color: #666;font-family:Arial, Helvetica, sans-serif; background-color:#FFFFFF;'>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-bottom:none; border-right:none; padding:10px;'>Name</td><td width='250' style='border: 1px solid #CCC; border-bottom:none; padding:10px;'> " . $name . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-bottom:none; border-right:none; padding:10px;'>Email</td><td width='250' style='border: 1px solid #CCC; border-bottom:none; padding:10px;'> " . $email . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>Phone Number</td><td width='250' style='border: 1px solid #CCC; padding:10px;'>" . $mobile . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>Service</td><td width='250' style='border: 1px solid #CCC; padding:10px;'>" . $service[0] . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>Project Detail</td><td width='250' style='border: 1px solid #CCC; padding:10px;'>" . $projectDetails . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>How did you hear about us</td><td width='250' style='border: 1px solid #CCC; padding:10px;'>" . $hearAboutus . "</td></tr>";
$msg .= "</table>";
$msg .= "</body></html>";


$header = "From:webmaster@bluehost.web-hosting.com\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html\r\n";

$retval = mail ($to,$subject,$msg,$header);

if( $retval == true ) {
  print "<p class='success'>Thankyou we will get back you soon.</p>";
}else {
  print "<p class='error'>Problem in Sending Mail</p>";
}

?>
