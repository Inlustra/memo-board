import reducer, {
  LOAD_SUCCESS,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ERROR,
  LOAD_ERROR,
  UPDATE_ERROR,
  DELETE_ERROR,
  loadRequest,
  LOAD_REQUEST,
  loadSuccess,
  loadError,
  createRequest,
  createSuccess,
  createError,
  UPDATE_REQUEST,
  updateRequest,
  updateSuccess,
  updateError,
  deleteRequest,
  DELETE_REQUEST,
  deleteSuccess,
  deleteError,
} from './memos.module'

describe('memos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      loading: {
        load: false,
        create: false,
        update: false,
        delete: false,
      },
      memos: [],
    })
  })

  it('should handle LOAD_SUCCESS', () => {
    const action = { type: LOAD_SUCCESS, payload: [{ title: 'myTitle' }] }
    expect(reducer(undefined, action)).toEqual({
      error: null,
      loading: { create: false, delete: false, load: false, update: false },
      memos: [{ title: 'myTitle' }],
    })
  })

  it('should handle CREATE_REQUEST', () => {
    const action = { type: CREATE_REQUEST }
    expect(reducer(undefined, action)).toEqual({
      error: null,
      loading: { create: true, delete: false, load: false, update: false },
      memos: [],
    })
  })

  it('should handle CREATE_SUCCESS', () => {
    const action = { type: CREATE_SUCCESS, payload: { title: 'myTitle' } }
    expect(reducer(undefined, action)).toEqual({
      error: null,
      loading: { create: false, delete: false, load: false, update: false },
      memos: [{ title: 'myTitle' }],
    })
  })

  describe('handling UPDATE_SUCCESS', () => {
    it('should correctly update a memo', () => {
      const initState = {
        error: null,
        loading: {
          load: false,
          create: false,
          update: false,
          delete: false,
        },
        memos: [
          {
            id: '1',
            title: 'oldTitle',
          },
        ],
      }
      const action = {
        type: UPDATE_SUCCESS,
        payload: { id: '1', title: 'myTitle' },
      }
      expect(reducer(initState, action)).toEqual({
        error: null,
        loading: { create: false, delete: false, load: false, update: false },
        memos: [{ id: '1', title: 'myTitle' }],
      })
    })

    it('should return an error if the memo was not found', () => {
      const action = {
        type: UPDATE_SUCCESS,
        payload: { id: '1', title: 'myTitle' },
      }
      expect(reducer(undefined, action)).toEqual({
        error: { message: 'Attempted to update a memo that was not found' },
        loading: { create: false, delete: false, load: false, update: false },
        memos: [],
      })
    })
  })

  describe('handling DELETE_SUCCESS', () => {
    it('should do nothing if the memo is not found', () => {
      const action = {
        type: DELETE_SUCCESS,
        payload: '1',
      }
      expect(reducer(undefined, action)).toEqual({
        error: null,
        loading: {
          load: false,
          create: false,
          update: false,
          delete: false,
        },
        memos: [],
      })
    })

    it('should delete the memo from memos', () => {
      const initState = {
        error: null,
        loading: {
          load: false,
          create: false,
          update: false,
          delete: false,
        },
        memos: [
          {
            id: '1',
            title: 'oldTitle',
          },
        ],
      }
      const action = {
        type: DELETE_SUCCESS,
        payload: '1',
      }
      expect(reducer(initState, action)).toEqual({
        error: null,
        loading: { create: false, delete: false, load: false, update: false },
        memos: [],
      })
    })
  })

  it('should handle CLEAR_ERRORS', () => {
    const initState = {
      error: { message: 'An example error' },
      loading: {
        load: false,
        create: false,
        update: false,
        delete: false,
      },
      memos: [],
    }
    const action = { type: CLEAR_ERRORS }
    expect(reducer(initState, action)).toEqual({
      error: null,
      loading: { create: false, delete: false, load: false, update: false },
      memos: [],
    })
  })

  it('should handle CREATE_ERROR', () => {
    const action = { type: CREATE_ERROR, payload: { message: 'Create Error' } }
    expect(reducer(undefined, action)).toEqual({
      error: { message: 'Create Error' },
      loading: { create: false, delete: false, load: false, update: false },
      memos: [],
    })
  })

  it('should handle LOAD_ERROR', () => {
    const action = { type: LOAD_ERROR, payload: { message: 'Load Error' } }
    expect(reducer(undefined, action)).toEqual({
      error: { message: 'Load Error' },
      loading: { create: false, delete: false, load: false, update: false },
      memos: [],
    })
  })

  it('should handle UPDATE_ERROR', () => {
    const action = { type: UPDATE_ERROR, payload: { message: 'Update Error' } }
    expect(reducer(undefined, action)).toEqual({
      error: { message: 'Update Error' },
      loading: { create: false, delete: false, load: false, update: false },
      memos: [],
    })
  })

  it('should handle DELETE_ERROR', () => {
    const action = { type: DELETE_ERROR, payload: { message: 'Delete Error' } }
    expect(reducer(undefined, action)).toEqual({
      error: { message: 'Delete Error' },
      loading: { create: false, delete: false, load: false, update: false },
      memos: [],
    })
  })
})

describe('memos action creators', () => {
  it('should create LOAD_REQUEST', () => {
    expect(loadRequest()).toEqual({ type: LOAD_REQUEST })
  })

  it('should create LOAD_SUCCESS', () => {
    expect(loadSuccess([{ title: 'memo' }])).toEqual({
      type: LOAD_SUCCESS,
      payload: [{ title: 'memo' }],
    })
  })

  it('should create LOAD_ERROR', () => {
    expect(loadError({ message: 'error' })).toEqual({
      type: LOAD_ERROR,
      payload: { message: 'error' },
    })
  })

  it('should create CREATE_REQUEST', () => {
    expect(createRequest()).toEqual({ type: CREATE_REQUEST })
  })

  it('should create CREATE_SUCCESS', () => {
    expect(createSuccess({ title: 'memo' })).toEqual({
      type: CREATE_SUCCESS,
      payload: { title: 'memo' },
    })
  })

  it('should create CREATE_ERROR', () => {
    expect(createError({ message: 'error' })).toEqual({
      type: CREATE_ERROR,
      payload: { message: 'error' },
    })
  })

  it('should create UPDATE_REQUEST', () => {
    expect(updateRequest({ title: 'memo' })).toEqual({
      type: UPDATE_REQUEST,
      payload: { title: 'memo' },
    })
  })

  it('should create UPDATE_SUCCESS', () => {
    expect(updateSuccess({ title: 'memo' })).toEqual({
      type: UPDATE_SUCCESS,
      payload: { title: 'memo' },
    })
  })

  it('should create UPDATE_ERROR', () => {
    expect(updateError({ message: 'error' })).toEqual({
      type: UPDATE_ERROR,
      payload: { message: 'error' },
    })
  })

  it('should create DELETE_REQUEST', () => {
    expect(deleteRequest('1')).toEqual({ type: DELETE_REQUEST, payload: '1' })
  })

  it('should create DELETE_SUCCESS', () => {
    expect(deleteSuccess('1')).toEqual({ type: DELETE_SUCCESS, payload: '1' })
  })

  it('should create DELETE_ERROR', () => {
    expect(deleteError({ message: 'error' })).toEqual({
      type: DELETE_ERROR,
      payload: { message: 'error' },
    })
  })
})

describe('memos epics', () => {
  describe('loadRequest$', () => {
    it('should fire a LOAD_SUCCESS on success')
    it('should fire a LOAD_ERROR on error')
  })
  describe('createRequest$', () => {
    it('should fire a CREATE_SUCCESS on success')
    it('should fire a CREATE_ERROR on error')
  })
  describe('updateRequest$', () => {
    it('should fire an UPDATE_SUCCESS on success')
    it('should fire an UPDATE_ERROR on error')
  })
  describe('deleteRequest$', () => {
    it('should fire a DELETE_SUCCESS on success')
    it('should fire a DELETE_ERROR on error')
  })
})
