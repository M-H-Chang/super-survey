const paintCan = {
  title: `blah`,
  desc: `blah blah`,
  color: `#f00`,
}
const paintCan2 = {
  color: `#0f0`,
}
const action = {
  type: `paintCanReducer/editAction`,
  payload: {
    desc: `blah`,
    color: `#00f`,
  },
}

const updatedPaintCan = {
  ...paintCan,
  ...action.payload,
  ...paintCan2,
  title: `foo`,
}
