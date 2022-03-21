<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app" ></div>
    <script>
      window.addEventListener('message', function() {
      const event = window.event || event
      if (event.origin !== "http://web.ll.com") {
        throw '您的地址存在跨域问题'
        return
      }
    }, false)
    </script>
  </body>
</html>
