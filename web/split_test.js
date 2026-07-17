const fs = require('fs');
const postcss = require('postcss');

const css = fs.readFileSync('./src/index.css', 'utf-8');

postcss([]).process(css, { from: './src/index.css' }).then(result => {
    let categories = {
        ckeditor: 0,
        materialIcons: 0,
        angular: 0,
        swiper: 0,
        base: 0
    };
    result.root.walkRules(rule => {
        if (rule.selector.includes('.ck') || rule.selector.includes('ck-')) categories.ckeditor++;
        else if (rule.selector.includes('.zmdi')) categories.materialIcons++;
        else if (rule.selector.includes('_ng')) categories.angular++;
        else if (rule.selector.includes('swiper')) categories.swiper++;
        else categories.base++;
    });
    console.log(categories);
});
