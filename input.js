let connection; // 10. stores the active TCP connection object. Most global scope so it can be accessed by all functions in this module.
const net = require('net');
const { stdin } = require('process');

const hiKey = "Hello"
const nameKey = "What is your name?"

const setupInput = function(conn) {
  // 11. Update setupInput function within input module to accept a conn parameter and set it as the value for the connection variable.
  connection = conn;
  
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
  
}

const handleUserInput = function(key) {
  if (key === '\u0003') { 
    process.exit(); 
  }
// 12. update input module to send movement commands to the server using the connection object:
  if (key === 'w') {
    connection.write("Move: up");
  }
    // 12
  if (key === 's') {
    connection.write("Move: down");
  }
    // 12
  if (key === 'd') {
    connection.write("Move: right");
  }
    // 12
  if (key === 'a') {
    connection.write("Move: left");
  }

  // 13. Send messages 
  if (key === 'h') {
    connection.write("Say: " + hiKey);
  }

  if (key === 'n') {
    connection.write("Say: " + nameKey);
  }
    
}

stdin.on('data', (key) => {
  handleUserInput(key);
}); 

setupInput();

module.exports = { setupInput }