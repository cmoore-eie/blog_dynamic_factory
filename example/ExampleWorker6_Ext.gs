package acc.dynamic_factory.example

class ExampleWorker6_Ext extends AbstractWorker_Ext {

  var _kvargs : Map<String, Object>

  construct(inkvargs : Map<String, Object>){
    _kvargs = inkvargs
  }

  override function showMessage() : String {
    return _kvargs.get("message1") as String
  }


}