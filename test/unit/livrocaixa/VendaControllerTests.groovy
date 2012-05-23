package livrocaixa



import org.junit.*
import grails.test.mixin.*

@TestFor(VendaController)
@Mock(Venda)
class VendaControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/venda/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.vendaInstanceList.size() == 0
        assert model.vendaInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.vendaInstance != null
    }

    void testSave() {
        controller.save()

        assert model.vendaInstance != null
        assert view == '/venda/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/venda/show/1'
        assert controller.flash.message != null
        assert Venda.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/venda/list'


        populateValidParams(params)
        def venda = new Venda(params)

        assert venda.save() != null

        params.id = venda.id

        def model = controller.show()

        assert model.vendaInstance == venda
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/venda/list'


        populateValidParams(params)
        def venda = new Venda(params)

        assert venda.save() != null

        params.id = venda.id

        def model = controller.edit()

        assert model.vendaInstance == venda
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/venda/list'

        response.reset()


        populateValidParams(params)
        def venda = new Venda(params)

        assert venda.save() != null

        // test invalid parameters in update
        params.id = venda.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/venda/edit"
        assert model.vendaInstance != null

        venda.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/venda/show/$venda.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        venda.clearErrors()

        populateValidParams(params)
        params.id = venda.id
        params.version = -1
        controller.update()

        assert view == "/venda/edit"
        assert model.vendaInstance != null
        assert model.vendaInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/venda/list'

        response.reset()

        populateValidParams(params)
        def venda = new Venda(params)

        assert venda.save() != null
        assert Venda.count() == 1

        params.id = venda.id

        controller.delete()

        assert Venda.count() == 0
        assert Venda.get(venda.id) == null
        assert response.redirectedUrl == '/venda/list'
    }
}
