package livrocaixa



@TestFor(GastoController)
@Mock(Gasto)
class GastoControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/gasto/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.listagem()

        assert model.gastoInstanceList.size() == 0
        assert model.gastoInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.gastoInstance != null
    }

    void testSave() {
        controller.save()

        assert model.gastoInstance != null
        assert view == '/gasto/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/gasto/show/1'
        assert controller.flash.message != null
        assert Gasto.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/gasto/list'


        populateValidParams(params)
        def gasto = new Gasto(params)

        assert gasto.save() != null

        params.id = gasto.id

        def model = controller.show()

        assert model.gastoInstance == gasto
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/gasto/list'


        populateValidParams(params)
        def gasto = new Gasto(params)

        assert gasto.save() != null

        params.id = gasto.id

        def model = controller.edit()

        assert model.gastoInstance == gasto
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/gasto/list'

        response.reset()


        populateValidParams(params)
        def gasto = new Gasto(params)

        assert gasto.save() != null

        // test invalid parameters in update
        params.id = gasto.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/gasto/edit"
        assert model.gastoInstance != null

        gasto.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/gasto/show/$gasto.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        gasto.clearErrors()

        populateValidParams(params)
        params.id = gasto.id
        params.version = -1
        controller.update()

        assert view == "/gasto/edit"
        assert model.gastoInstance != null
        assert model.gastoInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/gasto/list'

        response.reset()

        populateValidParams(params)
        def gasto = new Gasto(params)

        assert gasto.save() != null
        assert Gasto.count() == 1

        params.id = gasto.id

        controller.delete()

        assert Gasto.count() == 0
        assert Gasto.get(gasto.id) == null
        assert response.redirectedUrl == '/gasto/list'
    }
}
