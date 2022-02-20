<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app" ></div>
    <script src="//api.map.baidu.com/getscript?v=3.0&ak=P6CGW7MPbc6ux1PF4TIvp1nG&services=&t=20151113040005&s=1"></script>
    <script src="//<%= htmlWebpackPlugin.options.evn %>static.ymm56.com/common-lib/babel-polyfill/6.20.0/polyfill.min.js"></script>
    <script src="//<%= htmlWebpackPlugin.options.evn %>static.ymm56.com/common-lib/area/default/area.normalized.min.js"></script>
    <script src="//<%= htmlWebpackPlugin.options.evn %>static.ymm56.com/common-lib/watermark/v1.0.1/watermark.js"></script>
    <script src="//<%= htmlWebpackPlugin.options.evn %>static.ymm56.com/lib-track/0.3.0/index.js"></script>
  </body>
</html>
