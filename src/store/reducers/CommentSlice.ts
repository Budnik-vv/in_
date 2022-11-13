import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment} from "../../models/IComment";

interface Comments {
    openedComments: number[],
    commentsData: {
        [key: number]: IComment
    }
}

const initialState: Comments = {
    openedComments: [],
    commentsData: {}
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        toggle(state, action: PayloadAction<number>) {
            const newState = [...state.openedComments];
            const old = newState.indexOf(action.payload);
            if (old >= 0) {
                newState.splice(old, 1);
            } else {
                newState.push(action.payload)
            }
            state.openedComments = newState;
        },
        clear(state) {
            state.openedComments = [];
            state.commentsData = {};
        },
        saveComments(state, action: PayloadAction<IComment[]>) {
            const newState = {...state.commentsData};
            action.payload.forEach(el => {
                newState[el.id] = el;
            })
            state.commentsData = newState;
        }
    }
})

export default commentSlice.reducer;
