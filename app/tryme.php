<?php
/* at the top of 'tryme.php' */
if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
  /*
     Up to you which header to send, some prefer 404 even if
     the files does exist for security
  */
  header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );

  /* choose the appropriate page to redirect users */
  die( header( 'location: /' ) );

}


// the message
$name = ($_POST['name']);
$email = ($_POST['email']);
$mobile = ($_POST['phoneNumber']);
$projectDescription = ($_POST['projectDescription']);
$budgetRange = ($_POST['budgetRange']);

$to = "interact@rillusion.com";

$subject = "[rillusion.com] Enquire by ". $name." for the price of $budgetRange";

$msg = "<html><body style='font-family:Lato,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Enquire for rillusion.com</h2>\r\n";
$msg .= "<table width='600' border='0' align='left' cellpadding='0' cellspacing='0' bgcolor='#FFF' style='font-weight: 700;font-size: 12px;color: #666;font-family:Arial, Helvetica, sans-serif; background-color:#FFFFFF;'>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-bottom:none; border-right:none; padding:10px;'>Name</td><td width='250' style='border: 1px solid #CCC; border-bottom:none; padding:10px;'> " . $name . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-bottom:none; border-right:none; padding:10px;'>Email</td><td width='250' style='border: 1px solid #CCC; border-bottom:none; padding:10px;'> " . $email . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>Phone Number</td><td width='250' style='border: 1px solid #CCC; padding:10px;'><a href='tel:'".$mobile."'>" . $mobile . "</a></td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>Project Detail</td><td width='250' style='border: 1px solid #CCC; padding:10px;'>" . $projectDescription . "</td></tr>";
$msg .= " <tr><td width='250' style='border: 1px solid #CCC; border-right:none; padding:10px;'>How did you hear about us</td><td width='250' style='border: 1px solid #CCC; padding:10px;'>" . $budgetRange . "</td></tr>";
$msg .= "</table>";
$msg .= "</body></html>";


$header = "From:webmaster@rambal.in\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html\r\n";

$retval = mail ($to,$subject,$msg,$header);

if( $retval == true ) {
  print "<p class='success'>Thankyou we will get back you soon.</p>";
}else {
  print "<p class='error'>Problem in Sending Mail</p>";
}

?>
