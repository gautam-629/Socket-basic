## 1.What is web socket?
WebSockets is a communication protocol that provides full-duplex communication channels over a single TCP connection. It allows for real-time, bidirectional communication between a client (typically a web browser) and a server. Unlike traditional HTTP requests, where the client initiates a request and the server responds, WebSockets enable ongoing communication between the client and the server, allowing both parties to send and receive data at any time.
>**Here are some key features and characteristics of WebSockets:**
1. Full-duplex communication: WebSockets allow simultaneous and bidirectional communication between the client and the server. Both parties can send and receive data independently without having to wait for requests or responses.

2. Persistent connection: Once established, a WebSocket connection remains open as long as both the client and server desire, allowing for continuous communication without the need for repeated handshakes.

>**example#1 (in server side)**
```javascript
const express=require('express');
const http=require('http')
const app=express();
const Socketio=require('socket.io');
const server=http.createServer(app);

const io=Socketio(server)

app.use('/',express.static(__dirname+'/public'));

io.on('connection',(socket)=>{
   console.log('User Connected',socket.id);

   socket.on('from_client',()=>{
      console.log("the event comming from client ");
   })

   setTimeout(()=>{
      socket.emit('From_server');
   },500);

})

server.listen(5000,()=>{
    console.log('serverRunning at port 5000');
})
```
>***client side***
```javascript
var socket=io();

let btn=document.getElementById('btn');
btn.onclick=function exec(){
    socket.emit('from_client');
}
socket.on('From_server',()=>{
   const div= document.createElement('div');
   div.innerText='New event from server';
   document.body.appendChild(div);

   //script
     <script src="/socket.io/socket.io.js"></script>
})
```
>***Example#2 (client Side)***

```html
body>
    <h1>Chat app using socket</h1>

    <input type="text" id="newmsg">
    <button id="btn">send</button>

     <ul id="msgList">
     
     </ul>
     
    <script>
var socket=io();

let btn=document.getElementById('btn');
let inputMsg=document.getElementById('newmsg');
let msgList= document.getElementById('msgList');

btn.onclick=function exec(){
    socket.emit('msg-send',{
        msg:inputMsg.value
    });
}
socket.on('From_server',()=>{
   const div= document.createElement('div');
   div.innerText='New event from server';
   document.body.appendChild(div);
})

socket.on('msg_rec',(data)=>{
    let Limsg=document.createElement('li');
    Limsg.innerHTML=data.msg;
    msgList.append(Limsg);
})
    </script>

    <script src="/socket.io/socket.io.js"></script>
   
</body>
</html>
```
>**server side**
```javascript
const express=require('express');
const http=require('http')
const app=express();
const Socketio=require('socket.io');
const server=http.createServer(app);

const io=Socketio(server)

app.use('/',express.static(__dirname+'/public'));

io.on('connection',(socket)=>{
   console.log('User Connected',socket.id);

   socket.on('msg-send',(data)=>{
    //   io.emit('msg_rec',data);
         //  socket.emit('msg_rec',data);
         socket.broadCast.emit('msg_rec',data);
      
   })

})

server.listen(5000,()=>{
    console.log('serverRunning at port 5000');
})
 
```
>***important points**
1. ***socket.broadcast.emit()**
 emitting an event to all connected clients except the sender. It allows you to send data or messages from the server to all connected clients except the client that initiated the event.

 2. **socket.emit()**
  emitting an event to a specific client. It allows you to send data or messages from the server to a specific connected client in real-time.

  3. **io.emit()**
  for emitting an event to all connected clients. It allows you to send data or messages from the server to all connected clients in real-time.
