import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    group: {
        data: [
            {
                type: '과일',
                main: '',
                list: [],
                order: 0,
                id: 0,
            },
            {
                type: '채소',
                main: '',
                list: [],
                order: 1,
                id: 1,
            },
            {
                type: '콩/두부',
                main: '',
                list: [],
                order: 2,
                id: 2,
            },
            {
                type: '통곡물',
                main: '',
                list: [],
                order: 3,
                id: 3,
            },
            {
                type: '버섯',
                main: '',
                list: [],
                order: 4,
                id: 4,
            },
            {
                type: '해조류',
                main: '',
                list: [],
                order: 5,
                id: 5,
            },
            {
                type: '견과',
                main: '',
                list: [],
                order: 6,
                id: 6,
            },
            {
                type: '고기/생선/달걀',
                main: '',
                list: [],
                order: 7,
                id: 7,
            },
            {
                type: '유제품',
                main: '',
                list: [],
                order: 8,
                id: 8,
            },
            {
                type: '가공식품',
                main: '',
                list: [],
                order: 9,
                id: 9,
            },
            {
                type: '영양제',
                main: '',
                list: [],
                order: 10,
                id: 10,
            },
            {
                type: '주의',
                main: '',
                list: [],
                order: 11,
                id: 11,
            },
        ],
    },
};
const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        updateGroup(state, action) {
            state.group = { data: [...action.payload] };
        },
        updateOrder(state, action) {
            let idx = 0;
            for (let i of action.payload.newOrder) {
                state.group.data[i].order = idx;
                idx += 1;
            }
        },
        updateContent(state, action) {
            state.group.data[action.payload.index].list.push(
                action.payload.newElement
            );
        },
        updateMain(state, action) {
            state.group.data[action.payload.index].main =
                action.payload.newElement;
        },
    },
});

export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
