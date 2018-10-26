var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');

router.post('/one', function(req, res){
    res.send("Got a post request")
});
router.post('/two', function(req, res){
    let testData = "test data for endpoint two";

    TestModel
    .create({
        testdata: testData
    }).then(dataFromDatabase => {
        res.send("test two went through!")
    });

    router.post('/three', function (req, res) {
        var testData = req.body.testdata.item;
    
        TestModel
        .create({
            testdata: testData
        })
            res.send("test three went through!")
            console.log("test three worked")
        });
        router.post('/four', function (req, res) {
            var testData = req.body.testdata.item;
            TestModel
            .create({
                testdata: testData
            })
            .then(
                function message() {
                    res.send("Test 4 went through!")
                }
            );
            })
        
       router.post('/five', function (req, res) {
           var testData = req.body.testdata.item;
           TestModel
           .create({
               testdata: testData
           })
           .then(
               function message(data) {
                   res.send(data);
               }
           )
       })

    });
    
router.post('/six', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
      .create({
        testdata: testData
      })
      .then(
        function message(testdata) {
          res.json({ 
            testdata: testdata  
          });
        }
      );
  });

  
router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;
  
    TestModel
      .create({
        testdata: testData
      })
      .then(
        function createSuccess(testdata) {
          res.json({
            testdata: testdata
          });
  
        },
        function createError(err) { 
          res.send(500, err.message);
        }
      );
  });
  router.get('/helloclient', function (req, res) {
      res.send('this is a message from the server to the client')
  })

  router.get('/one', function(req, res) {

    TestModel
    .findAll({
        attributes: ['id', 'testdata']
    })
    .then(
        function findAllSuccess(data) {
            console.log("Controller data:", data);
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
  });

// router.get('/', function (req, res) {

//     res.send('Hey!! this is a test route!')
// });

// router.get('/about', function (req, res) {
//     res.send('This is an about route')
// });
// router.get('/contact', function (req, res) {
//     res.send({user: "mitch", email: "o.m@mitchvancleave.com"});
// });
// router.get('/projects', function (req, res) {
//     res.send(['Project1', 'Project2']);
// });
// router.get('/contact', function (req, res) {
//     res.send([
//         {user: "mitch", email: "o.m@mitchvancleave.com"},
//         {user: "mitch", email: "o.m@mitchvancleave.com"},
//         {user: "mitch", email: "o.m@mitchvancleave.com"},
//         {user: "mitch", email: "o.m@mitchvancleave.com"}
//     ]);
// });

module.exports = router;