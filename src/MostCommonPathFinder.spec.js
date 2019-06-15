/*globals expect spyOn fail fit*/
const MostCommonPathFinder = require('./MostCommonPathFinder');
const fsp = require('fs-promise');
const fakeLogData = `
1 /1
1 /2
1 /3
1 /4
2 /2
2 /3
2 /4
`;

describe('Most Common 3 page Sequence', function(){
  const validLogFilePath = './dragon.log';

  describe('MostCommonPathFinder', function(){
    describe('#findPath', function(){
      it('returns a promise', function(){
        expect(MostCommonPathFinder.findPath(validLogFilePath) instanceof Promise).toBe(true);
      })

      it ('throws an error if the file does not exist', function(done) {
        // Mock a response that the file does not exist
        const existsSpy = new spyOn(fsp, 'exists').and.returnValue(Promise.resolve(false));

        MostCommonPathFinder.findPath('logFilePathStub').then(() => {
          // Should not have resolved
          throw new Error('Promise should not have resolved');
        }, (reason) => {
          // Promise rejected, validate it threw the correct error
          expect(() => { throw reason }).toThrowError('File does not exist (logFilePathStub)');
          done();
        });
      });

      it('throws an error when file contents are empty', function(done) {
        // Mock an empty file
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(''));

        MostCommonPathFinder.findPath(validLogFilePath).then(() => {
          // Should not have resolved
          throw new Error('Promise should not have resolved');
        }, (reason) => {
          // Promise rejected, validate it threw the correct error
          expect(() => { throw reason }).toThrowError('[findPath] Empty file');
          done();
        });
      });

      it('throws an error when no valid file rows are found', function(done) {
        // Mock file contents that are not in valid new line, space separated format
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve('whocares'));

        MostCommonPathFinder.findPath(validLogFilePath).then(() => {
          // Should not have resolved
          throw new Error('Promise should not have resolved');
        }, (reason) => {
          // Promise rejected, validate it threw the correct error
          expect(() => { throw reason }).toThrowError('[findPath] No valid rows found');
          done();
        });
      });

      it('searches onDisk for filepath param', function(done){
        // Mock valid file contents
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath(validLogFilePath).then(() => {
          expect(readSpy).toHaveBeenCalledWith(validLogFilePath, 'utf8')
          done();
        }).catch(fail)
      });

      it('returns expected value with default length of 3 and default simple method', function(done){
        const expectedResponse = ['/2', '/3', '/4'];
        // Mock valid file contents
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath(validLogFilePath).then((response) => {
          // console.log('resp', response);
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      });

      it('returns expected value with length of 4 and default simple method', function(done){
        const expectedResponse = ['/2', '/3', '/4', '/1'];
        // Mock valid file contents
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath(validLogFilePath, 4).then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      });

      it('returns expected value with default length of 3 and reduce method', function(done){
        const expectedResponse = ['/2', '/3', '/4'];
        // Mock valid file contents
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath(validLogFilePath, 3, 'reduce').then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      });

      it('returns expected value with default length of 3 and map method', function(done){
        const expectedResponse = ['/2', '/3', '/4'];
        // Mock valid file contents
        const readSpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath(validLogFilePath, 3, 'map').then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      });
    })
  });
})
