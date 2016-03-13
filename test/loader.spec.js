var loader = require('../index');
var i18next = require('i18next');

var expect = require('chai').expect
var sinon = require('sinon');


describe('loader', function () {

  beforeEach(function () {
    this.stubT = sinon.stub(i18next, 't');
    this.stubT.returns("key");
  });

  afterEach(function () {
    this.stubT.restore();
  });

  it('simply', function () {
    var source = loader('__(\'asd\')');

    expect(source).to.be.eql('\'key\'');
  });

  it('double_quotes', function () {
    var source = loader('__("asd")');

    expect(source).to.be.eql('\'key\'');
  });

  it('custom_func_name', function () {
    var obj = {
      query: '?funcName=T'
    };

    var source = loader.call(obj, 'T("asd")');

    expect(source).to.be.eql('\'key\'');
  });

  it('custom_qoutes', function () {
    var obj = {
      query: '?quotes="'
    };

    var source = loader.call(obj, '__("asd")');

    expect(source).to.be.eql('"key"');
  });

  it('lazy_regex', function () {
    var source = loader('__("asd") rest of code()');

    expect(source).to.be.eql('\'key\' rest of code()');
  });

  it('multi_translations', function () {
    var source = loader('__("asd") and __("qwe")');

    expect(source).to.be.eql('\'key\' and \'key\'');
  });

  it('template_string', function () {
    var source = loader('__(`asd ${ 1 + 1 }`)');

    expect(source).to.be.eql('\'key\'');
    expect(this.stubT.args[0][0]).to.be.eql('asd ${ 1 + 1 }');
  });

  it('log_warning', function () {
    var stubLog = sinon.stub(console, 'log');
    i18next.observers.missingKey[0]('en', 'namespace', 'key');
    stubLog.restore();

    var log = stubLog.args[0][0];

    expect(log).to.match(/\[en\]/);
    expect(log).to.match(/namespace:key/);
  });

  it('enable_cacheable', function () {
    var obj = {
      cacheable: sinon.spy()
    };

    var source = loader.call(obj, '__("asd")');

    expect(obj.cacheable.called).to.be.equal(true);
  });

});
