module.exports = {
  id: 'product',
  name: 'product',
  tag: 'div',
  text: 123,
  style: {
    width: '100%',
    'line-height': '1',
  },
  children: [
    {
      name: 'menu',
      tag: 'ul',
      style: {
        width: '100%',
        'line-height': '1.2',
      },
      children: [
        {
          name: 'item',
          tag: 'li',
          style: {
            width: '100px',
            'font-size': '14px',
          },
          text: 'menu1',
        },
        {
          name: 'item',
          tag: 'li',
          style: {
            width: '100px',
            'font-size': '14px',
          },
          text: 'menu2',
        },
      ],
    },
  ],
};
