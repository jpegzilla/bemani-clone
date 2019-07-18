<?php

public function api_access_point($key)
{
  $export = array('message' => 'hello from the api!');

  return json_encode($export, JSON_PRETTY_PRINT);
}
