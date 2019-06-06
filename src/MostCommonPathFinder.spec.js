/*globals expect spyOn fail fit*/
var MostCommonPathFinder = require('./MostCommonPathFinder');
var fsp = require('fs-promise');
var fakeLogData = `
1 /1
1 /2
1 /3
1 /4
2 /2
2 /3
2 /4
`;

describe('Most Common 3 page Sequence', function(){
  var validLogFilePath = './dragon.log';


  describe('MostCommonPathFinder', function(){
    describe('#findPath', function(){
      it('returns a promise', function(){
        expect(MostCommonPathFinder.findPath(validLogFilePath) instanceof Promise).toBe(true);
      })

      // TODO: Add test for file exists check / error throw

      it('searches onDisk for filepath param', function(done){
        var mySpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve('whocares'));
        MostCommonPathFinder.findPath('logFilePathStub').then(() => {
          expect(mySpy).toHaveBeenCalledWith('logFilePathStub', 'utf8')
          done();
        }).catch(fail)
      });

      // TODO: Add test for 0 length file

      it('returns expected value', function(done){
        var expectedResponse = ['/2', '/3', '/4'];
        var mySpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath('banana').then((response) => {
          console.log('resp', response);
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      })

      // TODO: Add test to check for length
    })
  });
})
