module.exports =  (app)=>{
    app.get('/mock',(req,res)=>{
        res.json({code:1,data:'...'})
    })
}