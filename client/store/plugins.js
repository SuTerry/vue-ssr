export default store => store.subscribe((mutation) => {
  if (mutation.type === 'SET_LOGININ') setCookie(null, 'kongDashboard')
  if (mutation.type === 'SET_LOGINOUT') clearCookie('kongDashboard')
  // setLocal(state, 'kongDashboard')
})