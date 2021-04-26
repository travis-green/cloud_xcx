class Hooks {
  constructor() {
    this.list = [];
  }
  add(fn) {
    this.list.push(fn);
  }
}

const hookAll = {
  app: new Hooks(),
  page: new Hooks(),
  component: new Hooks(),
}

function forHook(options, hooks) {
  console.log(444, hooks)
  return hooks.reduce((opt, hook) => hook(opt), options);
}

console.log(new Hooks())

export function initHooks() {
  const originApp = App
  App = (options) => {
    originApp(forHook(options, hookAll.app.list))
  }
  const originPage = Page
  Page = (options) => {
    originPage(forHook(options, hookAll.page.list))
  }
  const originComponent = Component
  Component = (options) => {
    originComponent(forHook(options, hookAll.component.list))
  }
}