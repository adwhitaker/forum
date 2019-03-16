import Forum, { FieldRegister } from '../src/index'
import { Validator } from '../src/validators';

describe('Forum', () => {

    let model: { [index: string]: any }

    beforeEach(() => {
        model = {
            pineapple: 3,
            orange: 4,
            apple: 5
        }
    })

    const factory = (fields: FieldRegister[] = []) => {
        return new Forum(fields)
    }

    test('builds an instance of Forum', () => {
        const forum = factory()

        expect(forum.constructor.name).toEqual('Forum')
    })

    test('getFieldState returns field', () => {
        const forum: Forum = factory([
            {
                name: 'pineapple',
                model: () => model.pineapple,
                validators: [],
                onChange: []
            }
        ])

        expect(forum.getFieldState('pineapple')).toEqual(expect.objectContaining({
            name: 'pineapple',
            touched: false,
            dirty: false,
            valid: true,
            errors: []
        }))
    })

    test('initial state is returned without modifications', () => {
        const forum: Forum = factory([
            {
                name: 'pineapple',
                model: () => model.pineapple,
                validators: [],
                onChange: []
            }
        ])

        expect(forum.getFieldState('pineapple')).toEqual(expect.objectContaining({
            touched: false,
            dirty: false,
            valid: true,
            errors: []
        }))
    })

    test('field is invalid when validator returns false', () => {
        const error = 'field is invalid'

        const validator: Validator = {
            getError: () => error,
            validate: (value) => false
        }

        const forum: Forum = factory([
            {
                name: 'pineapple',
                model: () => model.pineapple,
                validators: [validator],
                onChange: []
            }
        ])

        forum.validateField('pineapple')

        expect(forum.getFieldState('pineapple')).toEqual(expect.objectContaining({
            valid: false
        }))
    })

    test('field is valid when validator returns true', () => {
        const error = 'field is invalid'

        const validator: Validator = {
            getError: () => error,
            validate: (value) => true
        }

        const forum: Forum = factory([
            {
                name: 'pineapple',
                model: () => model.pineapple,
                validators: [validator],
                onChange: []
            }
        ])

        forum.validateField('pineapple')

        expect(forum.getFieldState('pineapple')).toEqual(expect.objectContaining({
            valid: true
        }))
    })

    test('field is registered with registerField', () => {
        const forum: Forum = factory()

        forum.registerField({
            name: 'pineapple',
            model: () => model.pineapple,
            validators: [],
            onChange: []
        })

        expect(forum.getFieldState('pineapple')).toEqual(expect.objectContaining({
            name: 'pineapple',
            touched: false,
            dirty: false,
            valid: true,
            errors: []
        }))
    })

})