const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const dbClient = require('./dbClient');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get('/detailOfPlatform', async (req, res) => {
    try {
      const result = await dbClient.query('SELECT * FROM platformDetail');
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).send('No data found');
      }
    } catch (err) {
      console.error('Error fetching platform details:', err.message);
      res.status(500).send('Error fetching platform details'); 
    }
  });

app.post('/Values', async(req,res) =>{
    const {trainName, platformNumber} = req.body;
    try{
        const result = await dbClient.query('INSERT INTO platformDetail (trainName, platformNumber) VALUES ($1,$2)'[trainName,platformNumber]);
        res.send("Value is sccessfully added");
    }
    catch(err){
        console.log(err)
        res.send('ERROR');
    }
});

app.put('/Values/:id',async(req,res) => {
    
    const {trainName, platformNumber} = req.body;
    try{
        const result = await dbClient.query('UPDATE platformDetail SET platformNumber = $1 WHERE trainName=$2' , [platformNumber,trainName]);
        if(!result.row.length){
            res.send('No data available');
        }
        else{
            res.send("value is successfully updated");
        }
        
    }
    catch{
         res.send('error');
    }

});

app.delete('/Values:id' , async (req,res) => {
    const {id} = req.params;
    try{
        const result = await dbClient.query('DELETE FROM platformDetail WHERE trainName=$1 ',[id]);
        res.send("sccessfully deleted");
    }
    catch(Err){
        res.send(Err);
    }
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// railway dashboard
// passanger user persona: view list of record (train name, platform number)
// station man: crud (train name , platform)