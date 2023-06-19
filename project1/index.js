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
          socket.emit('msg_rec',data);
       socket.broadCast.emit('msg_rec',data);
      
   })

})

server.listen(5000,()=>{
    console.log('serverRunning at port 5000');
})
 