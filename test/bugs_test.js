var chai = require('chai')
var chaiHttp = require('chai-http');

var app = require('../bin/app');

chai.use(chaiHttp);
chai.should();

var requester = chai.request(app).keepOpen();

describe('SetBug', () => {

    it('Setting a new bug', (done) => {

        var identifier = new Date().getTime();

        let bugInfo = {
            bug_title: 'test_bug' + identifier,
            description: 'this is the test bug decription',
            priority: 'High',
            severity: 'This is the severity of the bug',
            status: 'Open',
            area: 'frontend',
            tester_id: `${identifier}`,
            how_to_rep: 'This are the how to reproduce instructions',
            suggested_fix: 'This a suggestion ti fix this bug'
        }

        requester
            .post('/set-bug')
            .send(bugInfo)
            .end( ( err, res ) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');

                if( err )
                   throw err;

                done();
            })
    });

    it('getBugs',(done)=>{

        requester
            .get('/getBugs')
            .end( ( err, res )=>{
                res.should.have.status(200);
                res.body.should.be.a('array');

                done();
            });

    });

    it('getBugDetails',(done)=>{

        requester
            .get('/getBugDetails?id=bug-4JkbBSp-IUtVg4YVzQcTp')
            .end( ( err, res )=>{
                res.should.have.status(200);
                res.body.should.be.a('object');

                requester.close();
                done();
            });

    });


});