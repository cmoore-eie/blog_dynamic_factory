package acc.dynamic_factory.example

class ExampleWorker5_Ext extends AbstractWorker_Ext {

  var _message : String

  construct(inMessage : String){
    _message = inMessage
  }

  override function showMessage() : String {
    return _message
  }


}