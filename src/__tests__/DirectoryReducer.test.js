import DirectoryReducer from '../reducers/DirectoryReducer';

describe('DirectoryReducer', () => {
  const initialState = {
    type: 'Directory',
    name: 'root',
    data: [],
  };

  it('should return the initial state when action type is unknown', () => {
    const newState = DirectoryReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  it('should add a file to the directory', () => {
    const action = {
      type: 'ADD_FILE',
      payload: {
        path: '',
        fileName: 'newFile.txt',
      },
    };
    const newState = DirectoryReducer(initialState, action);
    expect(newState.data).toHaveLength(1);
    expect(newState.data[0]).toEqual({ type: 'File', name: 'newFile.txt' });
  });

  it('should add a directory to the directory', () => {
    const action = {
      type: 'ADD_DIRECTORY',
      payload: {
        path: '',
        directoryName: 'newDirectory',
      },
    };
    const newState = DirectoryReducer(initialState, action);
    expect(newState.data).toHaveLength(1);
    expect(newState.data[0]).toEqual({
      type: 'Directory',
      name: 'newDirectory',
      data: [],
    });
  });

  it('should not add a file if the path is invalid', () => {
    const action = {
      type: 'ADD_FILE',
      payload: {
        path: 'invalid/path',
        fileName: 'newFile.txt',
      },
    };
    const newState = DirectoryReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should not add a directory if the path is invalid', () => {
    const action = {
      type: 'ADD_DIRECTORY',
      payload: {
        path: 'invalid/path',
        directoryName: 'newDirectory',
      },
    };
    const newState = DirectoryReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});