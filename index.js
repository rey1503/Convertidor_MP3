const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const fs = require('fs')
const { static } = require('express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static(__dirname+ '/views'));
app.use(express.static(__dirname+ '/dowload'));

app.get('/',(req,res)=>{
  res.render('index.ejs')
})
app.post('/convertir',(req,res)=>{
  const url = req.body.url;
  const formato = req.body.formato;
  if(formato==='mp4'){
    const video = youtubedl(url,
    ['--format=18'],
    { cwd: __dirname }
    )
    video.on('info', function(info) {
      video.pipe(fs.createWriteStream(info.title + '.mp4'))
      res.render('demo.ejs', {data:info.title + '.mp4', doc:info})
  })
} else if(formato==='m4a'){
  const video = youtubedl(url,
    ['-x', '--audio-format', 'm4a'],
    { cwd: __dirname }
    )
    video.on('info', function(info) {
      video.pipe(fs.createWriteStream(info.title + '.m4a'))
      res.render('demo.ejs', {data:info.title + '.m4a', doc:info})
  })
}
else if(formato==='3gp'){
  const video = youtubedl(url,
    ['--format=18'],
    { cwd: __dirname }
    )
    video.on('info', function(info) {
      video.pipe(fs.createWriteStream(info.title + '.3gp'))
      res.render('demo.ejs', {data:info.title + '.3gp', doc:info})
  })
}
else if(formato==='mp3'){
  const video = youtubedl(url,
    ['-x', '--audio-format', 'mp3'],
    { cwd: __dirname }
    )
    video.on('info', function(info) {
       video.pipe(fs.createWriteStream(info.title + '.mp3'))
      res.render('demo.ejs', {data:info.title + '.mp3', doc:info})
  })
}
})
app.post('/download', function (req, res){
  const nombre=req.body.dato;
 var file = fs.readFileSync(__dirname +'/'+ nombre); 
 res.download(__dirname +'/'+ nombre);

});
app.post('/delete', function (req, res){
  const nombre=req.body.dele;
 fs.unlinkSync(__dirname +'/'+ nombre);
 res.redirect('/')
});
app.listen(process.env.PORT ||4000, (req,res)=>{
    console.log('conectado')
})

