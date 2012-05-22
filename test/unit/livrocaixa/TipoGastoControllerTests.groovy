package livrocaixa



import org.junit.*
import grails.test.mixin.*

@TestFor(TipoGastoController)
@Mock(TipoGasto)
class TipoGastoControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/tipoGasto/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.tipoGastoInstanceList.size() == 0
        assert model.tipoGastoInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.tipoGastoInstance != null
    }

    void testSave() {
        controller.save()

        assert model.tipoGastoInstance != null
        assert view == '/tipoGasto/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/tipoGasto/show/1'
        assert controller.flash.message != null
        assert TipoGasto.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/tipoGasto/list'


        populateValidParams(params)
        def tipoGasto = new TipoGasto(params)

        assert tipoGasto.save() != null

        params.id = tipoGasto.id

        def model = controller.show()

        assert model.tipoGastoInstance == tipoGasto
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/tipoGasto/list'


        populateValidParams(params)
        def tipoGasto = new TipoGasto(params)

        assert tipoGasto.save() != null

        params.id = tipoGasto.id

        def model = controller.edit()

        assert model.tipoGastoInstance == tipoGasto
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/tipoGasto/list'

        response.reset()


        populateValidParams(params)
        def tipoGasto = new TipoGasto(params)

        assert tipoGasto.save() != null

        // test invalid parameters in update
        params.id = tipoGasto.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/tipoGasto/edit"
        assert model.tipoGastoInstance != null

        tipoGasto.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/tipoGasto/show/$tipoGasto.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        tipoGasto.clearErrors()

        populateValidParams(params)
        params.id = tipoGasto.id
        params.version = -1
        controller.update()

        assert view == "/tipoGasto/edit"
        assert model.tipoGastoInstance != null
        assert model.tipoGastoInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/tipoGasto/list'

        response.reset()

        populateValidParams(params)
        def tipoGasto = new TipoGasto(params)

        assert tipoGasto.save() != null
        assert TipoGasto.count() == 1

        params.id = tipoGasto.id

        controller.delete()

        assert TipoGasto.count() == 0
        assert TipoGasto.get(tipoGasto.id) == null
        assert response.redirectedUrl == '/tipoGasto/list'
    }
}
