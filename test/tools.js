export let setNormalUser = (user) => {
  user = {
    _id: '1',
    email: 'test@gmail.com',
    firstName: 'Test',
    lastName: 'Smith',
    ...user
  }
  window.user = user
  global.user = user
}

export let setAdminUser = (user) => {
  user = {
    _id: '0',
    role: 'admin',
    email: 'test-admin@gmail.com',
    firstName: 'TestAdmin',
    lastName: 'SmithAdmin',
    ...user
  }
  window.user = user
  global.user = user
}

export let unsetUser = () => {
  window.user = undefined
  global.user = undefined
}

export let clickAll = (mountedComponent, subComponent) => {
  for (let i = 0; i < mountedComponent.find(subComponent).length; i++) {
    mountedComponent.find(subComponent).at(i).simulate('click')
  }
}
