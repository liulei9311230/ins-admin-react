import menu from './routeMap';
import createAsyncComponent from './createAsyncComponent';

let routeConfig = [
  {
    path: '/',
    exact: true,
    component: createAsyncComponent(() => import(`@src/pages/home/index`))
  },
  {
    path: '#/fileTransfer/transferPage/',
    exact: true,
    component: createAsyncComponent(() =>
      import(`@src/components/layout/noPowerPage`)
    )
  }
];

function combine(attr) {
  attr.map(v => {
    if (v.child && v.child.length > 0) {
      combine(v.child);
    } else if (v.href) {
      let href = v.href.replace(/^#\//, '');
      routeConfig.push({
        path: `/${href}`,
        component: createAsyncComponent(() => import(`@src/pages/${href}`))
      });
    }
  });
}

combine(menu);

routeConfig.push({
  nomatch: true,
  component: createAsyncComponent(() => import('../components/layout/404'))
});

export default routeConfig;
