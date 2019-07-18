<?php
  include './api.php';

  if (!empty($_GET)) {
    // stuff to test api
    $result = api_access_point();
    echo $result;
    exit;
  }

  // nothing to see here yet!
