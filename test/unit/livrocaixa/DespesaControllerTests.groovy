package livrocaixa



import org.junit.*
import grails.test.mixin.*

@TestFor(DespesaController)
@Mock(Despesa)
class DespesaControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/despesa/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.despesaInstanceList.size() == 0
        assert model.despesaInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.despesaInstance != null
    }

    void testSave() {
        controller.save()

        assert model.despesaInstance != null
        assert view == '/despesa/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/despesa/show/1'
        assert controller.flash.message != null
        assert Despesa.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/despesa/list'


        populateValidParams(params)
        def despesa = new Despesa(params)

        assert despesa.save() != null

        params.id = despesa.id

        def model = controller.show()

        assert model.despesaInstance == despesa
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/despesa/list'


        populateValidParams(params)
        def despesa = new Despesa(params)

        assert despesa.save() != null

        params.id = despesa.id

        def model = controller.edit()

        assert model.despesaInstance == despesa
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/despesa/list'

        response.reset()


        populateValidParams(params)
        def despesa = new Despesa(params)

        assert despesa.save() != null

        // test invalid parameters in update
        params.id = despesa.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/despesa/edit"
        assert model.despesaInstance != null

        despesa.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/despesa/show/$despesa.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        despesa.clearErrors()

        populateValidParams(params)
        params.id = despesa.id
        params.version = -1
        controller.update()

        assert view == "/despesa/edit"
        assert model.despesaInstance != null
        assert model.despesaInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/despesa/list'

        response.reset()

        populateValidParams(params)
        def despesa = new Despesa(params)

        assert despesa.save() != null
        assert Despesa.count() == 1

        params.id = despesa.id

        controller.delete()

        assert Despesa.count() == 0
        assert Despesa.get(despesa.id) == null
        assert response.redirectedUrl == '/despesa/list'
    }
}
