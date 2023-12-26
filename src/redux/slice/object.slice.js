import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { objectController } from "../controller/objects.controller"

const initialState = {
    status: 'idle'
}

export const getAllObject = createAsyncThunk('getAllObject', async () => {
    try {
        const getAll = await objectController.getAllObject()
        return getAll;
    } catch (error) {
        return error
    }
})

export const getObject = createAsyncThunk('getObject', async (data) => {
    try {
        const { id } = data;
        const getAll = await objectController.getObject(id)
        return getAll;
    } catch (error) {
        return error
    }
})

export const getAllChildren = createAsyncThunk('getAllChildren', async (data) => {
    try {
        const { parent } = data
        const getAll = await objectController.getAllChildren(parent)
        return getAll;
    } catch (error) {
        return error
    }
})

export const getDataObject = createAsyncThunk('getDataObject', async (data) => {
    try {
        const { parentId } = data;
        const getAll = await objectController.getDataObject(parentId)
        return getAll;
    } catch (error) {
        return error
    }
})

export const addObject = createAsyncThunk('addObject', async (data) => {
    try {
        const { name, email, url, pointText, ratioText, point, ratio, parent, dataFile } = data
        const getAll = await objectController.addObject(name, email, url, pointText, ratioText, point, ratio, parent, dataFile)
        return getAll;
    } catch (error) {
        return error
    }
})

export const editObject = createAsyncThunk('editObject', async (data) => {
    try {
        const { id, name, pointText, ratioText, point, ratio } = data
        const getAll = await objectController.editObject(id, name, pointText, ratioText, point, ratio)
        return getAll;
    } catch (error) {
        return error
    }
})

export const removeObject = createAsyncThunk('removeObject', async (data) => {
    try {
        const { id } = data;
        const getAll = await objectController.removeObject(id)
        return getAll;
    } catch (error) {
        return error
    }
})

export const addDataObject = createAsyncThunk('addDataObject', async (data) => {
    try {
        const { parentId, name, type, dataFile } = data
        const getAll = await objectController.addDataObject(parentId, name, type, dataFile)
        return getAll;
    } catch (error) {
        return error
    }
})

export const removeDataObject = createAsyncThunk('removeDataObject', async (data) => {
    try {
        const { parentId, dataFile } = data
        const getAll = await objectController.removeDataObject(parentId, dataFile)
        return getAll;
    } catch (error) {
        return error
    }
})

export const objectSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllObject
        builder.addCase(getAllObject.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllObject.fulfilled, (state, action) => {
            state.status = 'success'
            state.allObject = action.payload
        })
        builder.addCase(getAllObject.rejected, (state) => {
            state.status = 'failed'
        })

        // getObject
        builder.addCase(getObject.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getObject.fulfilled, (state, action) => {
            state.status = 'success'
            state.object = action.payload
        })
        builder.addCase(getObject.rejected, (state) => {
            state.status = 'failed'
        })

        // getAllChildren
        builder.addCase(getAllChildren.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllChildren.fulfilled, (state, action) => {
            state.status = 'success'
            state.children = action.payload
        })
        builder.addCase(getAllChildren.rejected, (state) => {
            state.status = 'failed'
        })

        // getDataObject
        builder.addCase(getDataObject.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getDataObject.fulfilled, (state, action) => {
            state.status = 'success'
            state.dataObject = action.payload
        })
        builder.addCase(getDataObject.rejected, (state) => {
            state.status = 'failed'
        })

        // addObject
        builder.addCase(addObject.pending, (state) => {
            state.statusAdd = 'loading'
        })
        builder.addCase(addObject.fulfilled, (state, action) => {
            state.statusAdd = 'success'
        })
        builder.addCase(addObject.rejected, (state) => {
            state.statusAdd = 'failed'
        })

        // editObject
        builder.addCase(editObject.pending, (state) => {
            state.statusEdit = 'loading'
        })
        builder.addCase(editObject.fulfilled, (state, action) => {
            state.statusEdit = 'success'
        })
        builder.addCase(editObject.rejected, (state) => {
            state.statusEdit = 'failed'
        })

        // removeObject
        builder.addCase(removeObject.pending, (state) => {
            state.statusRemoveObject = 'loading'
        })
        builder.addCase(removeObject.fulfilled, (state, action) => {
            state.statusRemoveObject = 'success'
        })
        builder.addCase(removeObject.rejected, (state) => {
            state.statusRemoveObject = 'failed'
        })

        // addDataObject
        builder.addCase(addDataObject.pending, (state) => {
            state.statusData = 'loading'
        })
        builder.addCase(addDataObject.fulfilled, (state, action) => {
            state.statusData = 'success'
        })
        builder.addCase(addDataObject.rejected, (state) => {
            state.statusData = 'failed'
        })

        // removeDataObject
        builder.addCase(removeDataObject.pending, (state) => {
            state.statusRemoveData = 'loading'
        })
        builder.addCase(removeDataObject.fulfilled, (state, action) => {
            state.statusRemoveData = 'success'
        })
        builder.addCase(removeDataObject.rejected, (state) => {
            state.statusRemoveData = 'failed'
        })
    }
})

export default objectSlice.reducer;