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
        comment: '',
        hashTag: [],
    },
    isFetched: null,
};
const foodKey = {
    과일: 0,
    채소: 1,
    '콩/두부': 2,
    통곡물: 3,
    버섯: 4,
    해조류: 5,
    견과: 6,
    '고기/생선/달걀': 7,
    유제품: 8,
    '가공 식품': 9,
    영양제: 10,
    주의: 11,
};
const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        updateGroup(state, action) {
            if (action.payload?.sortNeed) {
                let copy = [...action.payload.sorted];
                console.log('dispatch sorted', action.payload.sorted);
                let arr = [...copy.sort((item1, item2) => item1.id - item2.id)];
                console.log('arr', arr);
                state.group = {
                    data: [...arr],
                    comment: action.payload.comment,
                };
            } else {
                state.group = {
                    data: [...action.payload.data],
                    comment: action.payload.comment,
                    hashTag: [
                        ...action.payload.hashTag.map((item) =>
                            item === '' ? '' : `#${item}`
                        ),
                    ],
                };

                for (let index in state.group.data) {
                    state.group.data[index].id =
                        foodKey[state.group.data[index].type];
                }
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
        removeContent(state, action) {
            state.group.data
                .filter((item) => item.id === action.payload.id)[0]
                .list.splice(action.payload.index, 1);
        },
        fetched(state, action) {
            state.isFetched = action.payload;
        },
        notFetched(state) {
            state.isFetched = null;
        },
        removeAll(state) {
            state.group.comment = '';
            state.group.data = [
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
            ];
            state.isFetched = false;
            state.group.hashTag = [];
        },
        updateComment(state, action) {
            state.group.comment = action.payload;
        },
    },
});

export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
