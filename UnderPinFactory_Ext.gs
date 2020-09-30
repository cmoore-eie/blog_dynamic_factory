package acc.dynamic_factory

uses acc.dynamic_factory.example.IExampleWorker_Ext
uses gw.pl.logging.LoggerCategory

class UnderPinFactory_Ext {

  var _logger = LoggerCategory.TEST
  var worker = \ workerNumber : int -> "acc.dynamic_factory.example.ExampleWorker${workerNumber}_Ext"

  private construct(){

  }

  private static class Loader{
    private static final var INSTANCE : UnderPinFactory_Ext = new UnderPinFactory_Ext()
  }

  public static property get Instance() :  UnderPinFactory_Ext {
    return Loader.INSTANCE
  }


  /**
   * Example 1 accepts the fully qualified class path and creates the instance
   * @param inClassPath
   * @return
   */
  public function dynamicFactoryExample1(inClassPath : String) : IExampleWorker_Ext{
    var instance : IExampleWorker_Ext
    try {
      var processClass = Class.forName(inClassPath)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 0)
      constructor.Accessible = true
      instance = constructor.newInstance(new Object[0]) as IExampleWorker_Ext
    } catch(e){
      _logger.error(e.Message)
    }
    return instance
  }

  /**
   * Example 2 uses generics to parameterize the method, the fully qualified class is extracted from the class passed
   * @param <T>
   * @return class instance
   */
  public reified function dynamicFactoryExample2<T extends IExampleWorker_Ext>() : IExampleWorker_Ext{
    var instance : IExampleWorker_Ext
    try {
      var processClass = Class.forName(T.Name)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 0)
      constructor.Accessible = true
      instance = constructor.newInstance(new Object[0]) as IExampleWorker_Ext
    } catch(e){
      _logger.error(e.Message)
    }
    return instance
  }

  /**
   * Exmple 3 acceepts the name of the class and detives the rest of trhe fully qualified class
   * @param inCode
   * @return class instance
   */
  public function dynamicFactoryExample3(inCode : String) : IExampleWorker_Ext{
    var instance : IExampleWorker_Ext
    var classPath = "acc.dynamic_factory.example.${inCode}"
    try {
      var processClass = Class.forName(classPath)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 0)
      constructor.Accessible = true
      instance = constructor.newInstance(new Object[0]) as IExampleWorker_Ext
    } catch(e){
      _logger.error(e.Message)
    }
    return instance
  }

  /**
   * Example 4 accepts a part of the class name and derives thee rest of the fully qualified class
   * @param inCode
   * @return class instance
   */
  public function dynamicFactoryExample4(inNumber : int) : IExampleWorker_Ext{
    var instance : IExampleWorker_Ext
    var classPath = worker(inNumber)
    try {
      var processClass = Class.forName(classPath)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 0)
      constructor.Accessible = true
      instance = constructor.newInstance(new Object[0]) as IExampleWorker_Ext
    } catch(e){
      _logger.error(e.Message)
    }
    return instance
  }

  /**
   * Example 5 accepts a part of the class name and a single value to the cconstructor
   * @param inCode
   * @return class instance
   */
  public function dynamicFactoryExample5(inNumber : int, inMessage : String) : IExampleWorker_Ext{
    var instance : IExampleWorker_Ext
    var classPath = worker(inNumber)
    try {
      var processClass = Class.forName(classPath)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 1)
      constructor.Accessible = true
      instance = constructor.newInstance({inMessage}) as IExampleWorker_Ext
    } catch(e){
      _logger.error(e.Message)
    }
    return instance
  }

  /**
   * Example 6 accepts a part of the class name and a map of objects to be passed into the constructor alowinfg for
   * variable number of parmeters to be passed to the class
   * @param inCode
   * @return class instance
   */
  public function dynamicFactoryExample6(inNumber : int, kvargs : Map<String, Object>) : IExampleWorker_Ext{
    var instance : IExampleWorker_Ext
    var classPath = worker(inNumber)
    try {
      var processClass = Class.forName(classPath)
      var constructor = processClass.DeclaredConstructors.firstWhere(\elt -> elt.ParameterCount == 1)
      constructor.Accessible = true
      instance = constructor.newInstance({kvargs}) as IExampleWorker_Ext
    } catch(e){
      _logger.error(e.Message)
    }
    return instance
  }

}