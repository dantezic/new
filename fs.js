var fs = require('fs');

// fs.ReadStream наследует от stream.Readable
var stream = new fs.ReadStream("index.html");

stream.on('readable', function() {
  var data = stream.read();
  console.log(data);
});

stream.on('end', function() {
  console.log("THE END");
});
