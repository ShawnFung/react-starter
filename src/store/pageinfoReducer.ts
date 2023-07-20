import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const defaultPageInfo: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: defaultPageInfo,
  reducers: {
    resetPageInfo(state, action: PayloadAction<PageInfoType>) {
      return action.payload
    },
    changeTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
  },
})

export const { resetPageInfo, changeTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
