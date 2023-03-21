const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

  it('worked as expected', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8000')
    .get('/employees/list/63fb4cbc80ecd7d359ae290f')
    .end(function(err, res) {
 
      done();                               // <= Call done to signal callback end
    });
  });
  
  it('succeeds silently!', function(done) {   // <= No done callback
    chai.request('http://localhost:8000')
    .post('/franchises/add_Franchise').send({FranchiseName:"franchise3"})
    .end(function(err, res) {
     
      done();   // <= Test completes before this runs
    });
  });
  it('did not worked as expected', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8000')
    .get('/customers/simple_login/ahmed.benaissa@esprit.tn/')
    .end(function(err, res) {
 
      done();                               // <= Call done to signal callback end
    });
  });
  it('worked as expected', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8000')
    .get('/customers/simple_login/ahmed.benaissa@esprit.tn/',{password:'1234567890Azerty'})
    .end(function(err, res) {
 
      done();                               // <= Call done to signal callback end
    });
  });
  let config = {
    hneaders: {
      'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1hciAxNiAyMDIzIDE4OjQzOjExIEdNVCswMTAwIChDZW50cmFsIEV1cm9wZWFuIFN0YW5kYXJkIFRpbWUpIiwiRW1haWwiOiJhaG1lZC5iZW5haXNzYUBlc3ByaXQudG4iLCJVc2VybmFtZSI6IjY0MDg4YTNlOTBiMzRkMmU0YTg3M2U4OSIsImlhdCI6MTY3ODk4ODU5MX0.9FtrDCMDnx2ciVQnCoWFXN9T8EsSGmfTs-fVZAQdGz8"
    }
  }
  it('worked as expected', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8000')
    .get('/customers/view_profile/64088e5490b34d2e4a87a566',config)
    .end(function(err, res) {
     
      done();                               // <= Call done to signal callback end
    });
  });
  it(' not worked as expected', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8000')
    .get('/customers/view_profile/64088e5490b34d2e4a87a566')
    .end(function(err, res) {
     if(err)
      done();                               // <= Call done to signal callback end
    });
  });